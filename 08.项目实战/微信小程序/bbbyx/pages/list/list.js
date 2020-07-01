// 只能是相对路径
let datas = require('../../datas/list-data.js')
// console.log(datas)

// pages/list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    listArr: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad: function() {
      this.setData({
        listArr: datas.list_data
      })
    },
    goDetail(event) {
      // console.log(event)
      const index = event.currentTarget.dataset.index
      wx.navigateTo({
        url: `/pages/detail/detail?index=${index}`,
      })
    },
    // 事件委托(target指真正触发的元素，子元素上)
    curouselGoDetail(event) {
      const index = event.target.dataset.index
      wx.navigateTo({
        url: `/pages/detail/detail?index=${index}`,
      })
    }
  }
})
