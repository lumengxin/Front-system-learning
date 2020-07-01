// pages/index/index.js
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
    msg: 'xiaoxin',
    userInfo: {},
    isShow: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     *  生命周期函数
     */
    // 监听页面加载,页面创建时执行
    onLoad() {
      // 做一些初始化工作，发送请求、开启定时器
      console.log('onLoad..')

      this.getUserInfo()
    },
    getUserInfo() {
      // 判断用户是否授权过
      wx.getSetting({
        success: (res) => {
          if (res.authSetting['scope.userInfo']) {
            this.setData({
              isShow: false
            })
          }
        }
      })

      // console.log(this)
      // let _this =  this  解决this指向；或者箭头函数
      // 获取用户信息
      wx.getUserInfo({
        success: (res)  => {
          this.setData({
            userInfo: res.userInfo
          })
        },
        fail: () => {
          console.log('获取用户信息失败')
        }
      })
    },
    // 判断用户是否确认授权
    handleGetUserInfo(data) {
      console.log('data =>', data)
      if (data.detail.rawData) {
        // this.onLoad()
        this.getUserInfo()
      }
    },

    // 监听页面显示,页面出现在前台时执行
    onShow() {
      console.log('onShow..')
    },
    // 页面首次渲染完毕时执行
    onReady() {
      console.log('onReady..')
    },
    // 监听页面隐藏,页面从前台变为后台时执行
    onHide() {
      console.log('onHide..')
    },
    // 监听页面卸载,页面销毁时执行
    onUnload() {
      console.log('onUnload..')
    },

    handleParent() {
      // navigateTo不能跳到 tabbar 页面
      wx.switchTab({
        url: '/pages/list/list'
      })
    },
    handleChild() {
      console.log('child')
    }
  }
})