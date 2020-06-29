/* 回复消息内容content */
const Theaters = require('../model/Theaters')
const {url} = require('../config')
const rp = require('request-promise-native')

module.exports = async message => {
  let options = {
    toUserName: message.FromUserName,
    fromUserName: message.ToUserName,
    createTime: Date.now(),
    msgType: 'text'
  }

  // let content = '抱歉，我没听懂您说的话~'
  let content = ''

  /* 1.接收普通消息 */
  if (message.MsgType === 'text') {
    if (message.Content === '热门') {

      // 回复热门消息具体内容
      /* 问题定位：通过注释排查此行代码出了问题，说明数据库方面出了问题；排查测试查询语句逻辑没有错。app.js中需要开启连接数据库 */
      let data = await Theaters.find({}, {title: 1, summary: 1, image: 1, doubanId: 1, _id: 0})

      content = []
      options.msgType = 'news'
      for (let i = 0; i < data.length; i++) {
        let item = data[i]
        content.push({
          title: item.title,
          description: item.summary,
          picUrl: `http://qc2bckyqa.bkt.clouddn.com/${item.posterKey}`,
          url: `${url}/detail/${item.doubanId}`
        })
      }
      // content.push({
      //   title: 'aaa',
      //   description: 'bbb',
      //   picUrl: 'ccc',
      //   url: 'http://www.baidu.com/'
      // })
      
      console.log("content", content)

    } else if (message.Content === '首页') {
      options.msgType = 'news'
      content = [{
        title: '8部半电影首页',
        description: '最新的电影预告片~更多功能等你探索',
        picUrl: `http://qc2bckyqa.bkt.clouddn.com/LR8cLlSO8h.jpg`,
        url: `${url}/movie`
      }]
    } /* else if (message.Content.match('爱')) {
      content = '爱你在心口难开..'
    } */ else {
      /* 搜索：https://movie.douban.com/j/search_subjects?tag=钢铁侠&page_start=0&page_limit=10
      详情：https://movie.douban.com/j/subject_abstract?subject_id=3066739 */
      // 搜索用户输入的指定电影信息
      // const url = `https://movie.douban.com/j/search_subjects?tag=${message.Content}&page_limit=8`
      const url = `https://movie.douban.com/j/search_subjects`
      // 直接放请求中，中文会转换成字符，需要放到qs中
      const data = await rp({
        method: 'GET',
        url,
        json: true,
        qs: {tag: message.Content, page_limit: 8}
      })
      const subjects = data.subjects
      console.log("data-------", data)
      if (subjects && subjects.length) {
        content = []
        options.msgType = 'news'
        for (let i = 0; i < subjects.length; i++) {
          let item = subjects[i]
          content.push({
            title: item.title,
            description: `评分：${item.rate}`,
            picUrl: item.cover,
            url: item.url
          })
        }

      } else {
        content = '暂时没有相关的电影信息'
      }
    }
  } else if (message.MsgType === 'image') {
    options.msgType = 'image'
    options.mediaId = message.MediaId
    console.log(message.PicUrl)
  } else if (message.MsgType === 'voice') {
    options.msgType = 'voice'
    options.mediaId = message.MediaId
    // 语音转成文字在同上搜索
    console.log(message.Recognition)
  } else if (message.MsgType === 'location') {
    content = `纬度：${message.Location_Y}， 经度：${message.Location_X}，位置：${message.Label}`
  } else if (message.MsgType === 'event') {
    /* 2.接收事件推送 */
    if (message.Event === 'subscribe') {
      content = `欢迎关注8部半电影公众号~\n回复 首页 查看电影预告片\n回复 热门 查看最新热门电影\n回复 文本 搜索电影信息`
      if (message.EventKey) {
        content = '用户扫描了带参数的二维码关注事件'
      }
    } else if (message.Event === 'unsubscribe') {
      console.log('无情取关~')
    } else if (message.Event === 'SCAN') {
      console.log('用户已经关注过，再扫描了带参数的二维码关注事件')
    } /* else if (message.Event === 'LOCATION') {
      content = `纬度：${message.Latitude}， 经度：${message.Longitude}，位置：${message.Precision}`
    } */ else if (message.Event === 'CLICK') {
      content = `您点击了按钮：${message.EventKey}`
    }
  }

  options.content = content

  return options

}