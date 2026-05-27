Component({
  properties: {
    show: { type: Boolean, value: false },
    selectedStyle: { type: String, value: '' },
    city: { type: String, value: '' },
    // 接收后端返回的 AI 数据对象
    aiResult: {
      type: Object,
      value: {
        data_list: [], // 图片数组
        output: ""     // 推荐文本
      }
    },
    // 接收当前天气对象
    weather: {
      type: Object,
      value: null
    }
  },
  methods: {
    onClose() { this.triggerEvent('close'); }
  },
  noop() {} // 阻止冒泡
})