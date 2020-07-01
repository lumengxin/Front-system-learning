// pages/movieDetail/movieDetail.js
let appDatas = getApp()

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
    movie: {}
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(opt) {
      const {index} = opt
      this.setData({
        movie: appDatas.data.movies[index]
      })
      console.log(this.data.movie)
    }
  }
})
