const STORAGE_KEY = 'ootd_profile'

// 定义天气图标映射表 (Key 对应后端可能返回的关键词)
const WEATHER_ICONS = {
  '晴': '☀️',
  '多云': '⛅',
  '阴': '☁️',
  '阵雨': '🌦️',
  '雷阵雨': '⛈️',
  '小雨': '🌧️',
  '中雨': '🌧️',
  '大雨': '🌧️',
  '雨': '🌧️',
  '雪': '❄️',
  '雾': '🌫️',
  '默认': '🌤️'
};

Page({
  data: {
    loading: true,        // 控制首页天气的骨架屏
    isPopupShow: false,   // 控制 OOTD 结果弹窗
    statusBarHeight: 20,
    city: '上海',
    gender: 'male',
    selectedStyle: '运动休闲风',
    styleList: [],
    weatherIcons: WEATHER_ICONS, // 将映射表存入 data 供 wxml 使用
    
    // 天气相关数据
    weatherNow: null,     // 今日实况数据对象
    forecast: [],         // 7日天气预报数组
    
    // AI 生成结果
    aiResult: {
      data_list: [],      // 后端返回的穿搭图片链接列表 
      output: ""          // 后端返回的穿搭建议文案 
    }
  },

  onLoad() {
    // 微信小程序获取状态栏高度的推荐方式
    const sys = wx.getAppBaseInfo ? wx.getAppBaseInfo() : wx.getSystemInfoSync();
    this.setData({ statusBarHeight: sys.statusBarHeight || 20 });
    
    // 首次加载：直接从缓存取城市并请求，不依赖 onLoad 时的 data.city
    const p = wx.getStorageSync(STORAGE_KEY);
    const initialCity = p ? p.city : '上海';
    this.fetchWeatherData(initialCity);
  },

  onShow() {
    this.initUserContext(); // 每次显示页面时，检测城市是否变动
  },

  // 初始化用户资料与风格列表
  initUserContext() {
    const p = wx.getStorageSync(STORAGE_KEY);
    const newCity = p ? p.city : '上海';
    const newGender = p ? p.gender : 'male';

    // 1. 检查城市是否真的变了（对比当前页面显示的 city）
    const isCityChanged = newCity !== this.data.city;

    // 2. 定义风格配置
    const styleConfig = {
      male: ['运动休闲风', '商务精英风', '日系潮流风', '韩系简约风', '学院风', '街头嘻哈风', '户外机能风', '复古文艺风', '极简主义风', '工装风'],
      female: ['甜酷风', '温柔风', '学院风', '韩系简约风', '设计师品牌风', '复古文艺风', '小香风', '森女系', '运动休闲风', 'Y2K风']
    };
    const currentStyles = styleConfig[newGender] || styleConfig.male;

    // 3. 更新页面基础文字状态
    this.setData({
      gender: newGender,
      city: newCity,
      styleList: currentStyles
    });

    // 4. 重点：如果城市变了，显式传入 newCity 发起请求，不使用 this.data.city
    if (isCityChanged) {
      console.log('【前端日志】检测到城市变更，准备抓取新天气:', newCity);
      this.fetchWeatherData(newCity);
    }

    if (!currentStyles.includes(this.data.selectedStyle)) {
      this.setData({ selectedStyle: currentStyles[0] });
    }
  },

  /**
   * 请求后端：获取天气 API
   * @param {string} targetCity 传入需要查询的城市名
   */
  fetchWeatherData(targetCity) {
    this.setData({ loading: true });
    
    // 优先使用传入的参数，如果没有传则兜底使用 data 中的值
    const queryCity = targetCity || this.data.city;
  
    wx.request({
      url: 'http://localhost:3000/api/weather',
      method: 'POST',
      data: { city: queryCity }, // 发送给后端的参数
      success: (res) => {
        if (res.data.success && res.data.data && res.data.data.length > 0) {
          const list = res.data.data;
          this.setData({
            weatherNow: list[0],
            forecast: list,
            loading: false,
            city: queryCity // 再次确认页面显示的城市名与请求结果一致
          });
          console.log('【前端日志】天气数据渲染成功:', queryCity);
        } else {
          this.setData({ loading: false });
          wx.showToast({ 
            title: res.data.msg || '天气数据异常', 
            icon: 'none' 
          });
        }
      },
      fail: (err) => {
        this.setData({ loading: false });
        console.error('天气请求失败:', err);
        wx.showToast({ title: '网络连接失败', icon: 'none' });
      }
    });
  },

  // 风格切换
  onSelectStyle(e) {
    const style = e.currentTarget.dataset.style;
    this.setData({ selectedStyle: style });
  },

  // 请求后端：生成今日 OOTD 接口 
  handleGenerate() {
    if (!this.data.weatherNow) {
      wx.showToast({ title: '请等待天气加载', icon: 'none' });
      return;
    }

    const p = wx.getStorageSync(STORAGE_KEY);
    wx.showLoading({ title: 'AI 穿搭助手生成中...' });

    wx.request({
      url: 'http://localhost:3000/api/ootd',
      method: 'POST',
      timeout: 120000,
      data: {
        city: this.data.city,
        gender: p.gender === 'male' ? '男' : '女',
        description: p.description || '无具体描述',
        selectedStyle: this.data.selectedStyle,
        weather: this.data.weatherNow 
      },
      success: (res) => {
        wx.hideLoading();
        if (res.data.success) {
          const result = JSON.parse(res.data.data); 
          this.setData({
            aiResult: {
              data_list: result.data_list,
              output: result.output 
            },
            isPopupShow: true
          });
        } else {
          wx.showToast({ title: '生成建议失败', icon: 'none' });
        }
      },
      fail: (err) => {
        wx.hideLoading();
        if (err.errMsg.indexOf('timeout') !== -1) {
          wx.showToast({ title: 'AI 思考时间较长，请稍后重试', icon: 'none' });
        } else {
          wx.showToast({ title: '网络连接超时', icon: 'none' });
        }
      }
    });
  },

  hideOotdPopup() {
    this.setData({ isPopupShow: false });
  }
});