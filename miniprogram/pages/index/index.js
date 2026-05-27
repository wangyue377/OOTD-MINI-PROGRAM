// 首次使用引导 · prototype/pages/onboarding.html
console.log('===== index.js 已加载 ====='); //
const STORAGE_KEY = 'ootd_profile'

Page({
  data: {
    step: 'welcome',
    statusBarHeight: 20,
    city: '',
    gender: 'male',
    description: '',
  },

  onLoad() {   
    const sys = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync()
    this.setData({ statusBarHeight: sys.statusBarHeight || 20 })  
    //this.restoreProfile()
  },

  // pages/index/index.js
  onShow() {
    // 增加 100ms 延迟，防止页面刚加载就重定向导致的系统超时
    setTimeout(() => {
      this.checkRedirect();
    }, 100);
  },

  checkRedirect() {
    const p = wx.getStorageSync(STORAGE_KEY);
    if (p && p.onboarded) {
      console.log('检测到已完成引导，直接进入主页');
      wx.reLaunch({
        url: '/pages/ootd/ootd' // 引导过直接去首页
      });
    }
  },

  restoreProfile() {
    try {
      const p = wx.getStorageSync(STORAGE_KEY)
      if (p && p.onboarded) {
        console.log('检测到已完成引导，step设为done'); // 加这行
        this.setData({
          step: 'done',
          city: p.city || '',
          gender: p.gender || 'male',
          description: p.description || '',
        })
        return
      }
    } catch (e) {
      console.warn(e)
    }
    console.log('无有效存储，step设为welcome'); // 加这行
    this.setData({ step: 'welcome' })
  },

  onGetStarted() {
    this.setData({ step: 'guide' })
  },

  onCityInput(e) {
    this.setData({ city: e.detail.value })
  },

  onDescInput(e) {
    this.setData({ description: e.detail.value })
  },

  onPickGender(e) {
    this.setData({ gender: e.currentTarget.dataset.g })
  },

  onSave() {
    const city = (this.data.city || '').trim()
    if (!city) {
      wx.showToast({ title: '请填写城市', icon: 'none' })
      return
    }
    const { gender, description } = this.data
    wx.setStorageSync(STORAGE_KEY, {
      city,
      gender,
      description: (description || '').trim(),
      onboarded: true,
    })
    this.setData({ step: 'done' })
    wx.showToast({ title: '保存成功', icon: 'success' });

    // 1.5秒后自动跳转到主页，避免在 done 状态停留产生异常
    setTimeout(() => {
      wx.reLaunch({
        url: '/pages/ootd/ootd'
      });
    }, 1500);
  },

  // 新增跳转函数
  goToProfile() {
    console.log('正在跳转至 profile 页面');
    wx.navigateTo({
      url: '/pages/profile/profile',
      fail(err) {
        console.error('跳转失败，请检查 app.json 中是否注册了 pages/profile/profile', err);
        wx.showToast({
          title: '跳转失败',
          icon: 'none'
        });
      }
    })
  },

  onReset() {
    wx.removeStorageSync(STORAGE_KEY)
    this.setData({
      step: 'welcome',
      city: '',
      gender: 'male',
      description: '',
    })
  },

  noop() {},
})
