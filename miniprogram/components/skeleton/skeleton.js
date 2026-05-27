// components/skeleton/skeleton.js
Component({
    properties: {
      // 宽度，如 '100%' 或 '300rpx'
      width: {
        type: String,
        value: '100%'
      },
      // 高度
      height: {
        type: String,
        value: '30rpx'
      },
      // 圆角
      radius: {
        type: String,
        value: '8rpx'
      },
      // 是否展示扫光动画
      animated: {
        type: Boolean,
        value: true
      }
    }
  })