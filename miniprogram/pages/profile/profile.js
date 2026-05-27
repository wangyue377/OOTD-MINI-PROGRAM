// pages/profile/profile.js
const STORAGE_KEY = 'ootd_profile'

Page({
  data: {
    statusBarHeight: 20,
    city: '',
    gender: '',
    description: ''
  },

  onLoad() {
    // 获取状态栏高度
    const sys = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync()
    this.setData({ statusBarHeight: sys.statusBarHeight || 20 })
  },

  onShow() {
    // 页面每次显示时都会执行，确保从 index 返回后数据是最新的
    this.refreshData();
  },

  refreshData() {
    const p = wx.getStorageSync(STORAGE_KEY);
    if (p) {
      this.setData({
        city: p.city || '',
        gender: p.gender || 'male',
        description: p.description || ''
      });
    }
  },

  // 新增：城市输入处理
  onCityInput(e) {
    this.setData({
      city: e.detail.value
    });
  },

  // 新增：个人描述输入处理
  onDescInput(e) {
    this.setData({
      description: e.detail.value
    });
  },

  // 响应性别切换点击
  onPickGender(e) {
    const gender = e.currentTarget.dataset.g;
    this.setData({ gender });
  },

  // 保存修改后的资料
  onSave() {
    const newData = {
      city: this.data.city,
      gender: this.data.gender,
      description: this.data.description,
      onboarded: true
    };
    wx.setStorageSync(STORAGE_KEY, newData);
    wx.showToast({ title: '同步成功', icon: 'success', duration : 1000 });

    // 延迟一会返回，让用户看到提示
    setTimeout(() => {
      wx.reLaunch({
        url: '/pages/ootd/ootd'
      });
    }, 1000);
  }
})