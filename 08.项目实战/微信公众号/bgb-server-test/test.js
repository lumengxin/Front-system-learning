// 引入express模块
const express = require('express')
const sha1 = require('sha1')

// 创建app应用对象
const app = express()

// 验证服务器有效性
const config = {
  token: 'bbbdyTEST1234',
  appID: 'wx92721392890c1c33',
  appsecret: '27f2d8b7255660150acae09dff54a5b7'
}
app.use((req, res, next) => {
  // 微信服务器发送来的消息
  console.log(req.query)
  /* 
  { signature: '43f85d60070103e3bed6bc54b63e2102dc3afa14',  // 加密签名
  echostr: '5832880668361997046', // 随机字符串
  timestamp: '1592033862',  // 发送请求时间戳
  nonce: '539667352' }  // 随机数字
  */

  // 验证消息是否来自微信服务器：计算得出signature和微信返回的signature对比
  // timestamp,nonce,Token按照字典排序并组合成一个数组
  const {signature, echostr, timestamp, nonce} = req.query
  const {token} = config
  const arr = [timestamp, nonce, token]
  const arrSort = arr.sort()
  // 将数组中所有参数拼接成一个字符串，进行sha1加密
  const str = arr.join('')
  const sha1Str = sha1(str)
  // 加密生成的signature和微信中的比较
  if (sha1Str === signature) {
    res.send(echostr)
  } else {
    res.send('error')
  }
})

// 监听端口号
app.listen(3000, () => console.log('服务器启动成功..'))