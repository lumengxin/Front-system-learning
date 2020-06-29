/* 中间件函数 验证服务器有效性 */
const sha1 = require('sha1')
const config = require('../config')
const {
  getUserDataAsync,
  parseXMLAsync,
  formatMessage
} = require('../utils/tool')
const template = require('./template')
const reply = require('./reply')

module.exports = () => {
  return async (req, res, next) => {
    // 微信服务器发送来的消息
    console.log(req.query)
    // 验证消息是否来自微信服务器：计算得出signature和微信返回的signature对比
    // timestamp,nonce,Token按照字典排序并组合成一个数组
    const {
      signature,
      echostr,
      timestamp,
      nonce
    } = req.query
    const {
      token
    } = config
    /* const arr = [timestamp, nonce, token]
    const arrSort = arr.sort()
    // 将数组中所有参数拼接成一个字符串，进行sha1加密
    const str = arr.join('')
    const sha1Str = sha1(str) */
    const sha1Str = sha1([timestamp, nonce, token].sort().join(''))
    // 加密生成的signature和微信中的比较
    /* if (sha1Str === signature) {
      res.send(echostr)
    } else {
      res.send('error')
    } */

    /* 微信服务器会发送两种类型的消息给开发者服务器
    1.get请求
      - 验证服务器的有效性
    2.post请求
      - 将用户数据以post方式发送给开发者服务器
    */
    if (req.method === 'GET') {
      if (sha1Str === signature) {
        res.send(echostr)
      } else {
        res.end('error')
      }
    } else if (req.method === 'POST') {
      if (sha1Str !== signature) {
        res.end('error')
      }
      // console.log(req.query)
      // 接收请求体数据，流式数据
      const xmlData = await getUserDataAsync(req)
      {/* <xml>
        <ToUserName><![CDATA[gh_1fe2a6d47384]]></ToUserName>  // 开发者id
        <FromUserName><![CDATA[oW6SCwYDITdnEAvAfdtwr0n-9lrc]]></FromUserName> // 用户openid
        <CreateTime>1592117279</CreateTime> // 时间戳
        <MsgType><![CDATA[text]]></MsgType> // 消息类型
        <Content><![CDATA[48192]]></Content>  // 内容
        <MsgId>22793639772726041</MsgId>  // 消息id(微信服务器默认保存消息3天)
      </xml> */}
              
      // 将xml数据解析为js对象
      const jsData = await parseXMLAsync(xmlData)
      console.log(jsData)

      // 数据格式化
      const message = formatMessage(jsData)
      console.log("message ->", message)

      /* 简单自动回复，回复文本内容
      1.一旦遇到以下情况，微信都会在公众号会话中，向用户下发系统提示“该公众号暂时无法提供服务，请稍后再试”：
        - 开发者在5秒内未回复任何内容 
        - 开发者回复了异常数据，比如JSON数据、字符串、xml中有多余空格(尖括号内)等
      */
      /* let options = {
        toUserName: message.FromUserName,
        fromUserName: message.ToUserName,
        createTime: Date.now(),
        msgType: 'text'
      }
      let content = '抱歉，我没听懂您说的话~'
      if (message.MsgType === 'text') {
        if (message.Content === '1') {
          content = '111'
        } else if (message.Content === '2') {
          content = '222'
        } else if (message.Content.match('爱')) {
          content = '爱你在心口难开..'
        }
      }
      options.content = content */
      // index.js中加了async后变成了promise, 需要通过await拿到里面数据
      // const options = reply(message)
      const options = await reply(message)

      /* let replyMessage = `
        <xml>
          <ToUserName><![CDATA[${message.FromUserName}]]></ToUserName>
          <FromUserName><![CDATA[${message.ToUserName}]]></FromUserName>
          <CreateTime>${Date.now()}</CreateTime>
          <MsgType><![CDATA[text]]></MsgType>
          <Content><![CDATA[${content}]]></Content>
        </xml>
      ` */
      const replyMessage = template(options)
      console.log("replyMessage ->", replyMessage)
      res.send(replyMessage)


      // 如果开发者服务器没有返回响应给微信，微信会发送三次请求过来（end结束，避免多次请求）
      // res.end('')
    } else {
      console.log('error')
    }

  }
}