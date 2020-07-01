// pages/detail.js
let datas = require('../../datas/list-data.js')
let appDatas = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
    index: null,
    isCollected: false,
    isMusicPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    let index = options.index
    this.setData({
      detail: datas.list_data[index],
      index
    })

    // 同步获取本地缓存数据
    let detailStorage = wx.getStorageSync('isCollectedKey')

    // 边界处理。 初次storage为空时,getStorage出错
    if (!detailStorage) {
      // 初始一个空对象
      wx.setStorageSync('isCollectedKey', {})
    }

    // 判断用户是否收藏
    if (detailStorage[index]) {
      // 收藏过 （未收藏：false undefined）
      this.setData({
        isCollected: true
      })
    }

    // 监听音乐播放状态
    wx.onBackgroundAudioPlay(() => {
      this.setData({
        isMusicPlay: true
      })
      // 同步app中保存音乐状态数据
      appDatas.data.isPlay = true
      appDatas.data.pageIndex = index
    })
    wx.onBackgroundAudioPause(() => {
      this.setData({
        isMusicPlay: false
      })
      appDatas.data.isPlay = false
    })

    // 判断当前页面音乐是否在后台中播放
    if (appDatas.data.isPlay && appDatas.data.pageIndex === index) {
      this.setData({
        isMusicPlay: true
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  // 收藏文章
  handleCollection() {
    let isCollected = !this.data.isCollected
    // 更新状态
    this.setData({
      isCollected
    })
    // 收藏提示框
    let title = isCollected ? '收藏成功' : '取消收藏'
    wx.showToast({
      title,
      icon: 'success',
      duration: 2000
    })
    // 缓存数据到本地
    let {index} = this.data
    // 后面收藏的数据会覆盖掉之前的
    // let obj = {}
    wx.getStorage({
      key: 'isCollectedKey',
      success: (res) => {
        let obj = res.data
        obj[index] = isCollected
        wx.setStorage({
          key: "isCollectedKey",
          data: obj,
          success: () => {
            console.log('缓存成功')
          }
        })
      }
    })
    // obj[index] = isCollected
    // wx.setStorage({
    //   key: "isCollectedKey",
    //   data: obj,
    //   success: () => {
    //     console.log('缓存成功')
    //   }
    // })
  },

  // 播放音乐
  handleMusicStatus() {
    let isMusicPlay = !this.data.isMusicPlay
    // 更新状态
    this.setData({
      isMusicPlay
    })

    if (isMusicPlay) {
      let {dataUrl, title} = this.data.detail.music
      wx.playBackgroundAudio({
        dataUrl,
        title
      })
    } else {
      wx.pauseBackgroundAudio()
    }
  },

  // 分享文章
  handleShare() {
    wx.showActionSheet({
      itemList: ['分享到qq', '分享到微博', '分享到微信'],
    })
  }
})