const sha1 = require('sha1')
const express = require('express')
// 引入bodyParser,处理post请求(express中)
const bodyParser = require('body-parser')
// 引入auth模块
const auth = require('../reply')

const Wechat = require('../wechat/wechat')
const {url} = require('../config')
const Theaters = require('../model/Theaters')
const Trailers = require('../model/Trailers')
const Danmus = require('../model/Danmus')


const Router = express.Router

const router = new Router()

const wechatApi = new Wechat()

// 搜索页面路由（需要放在app.use()上面）
router.get('/search', async (req, res) => {
  /* 生成js-sdk使用的签名 */
  // 生成随机字符串
  const noncestr = Math.random().toString().split('.')[1]
  // 获取时间戳
  const timestamp = Date.now()
  // 获取票据
  const {ticket} = await wechatApi.fetchTicket()
  const arr = [
    `jsapi_ticket=${ticket}`,
    `noncestr=${noncestr}`,
    `timestamp=${timestamp}`,
    `url=${url}/search`
  ]
  const str = arr.sort().join('&')
  const signature = sha1(str)

  res.render('search', {
    signature,
    noncestr,
    timestamp
  })
})

// 详情页路由
router.get('/detail/:id', async (req, res) => {
  const {id} = req.params
  if (id) {
    const data = await Theaters.findOne({doubanId: id}, {_id: 0, __v:0})
    res.render('detail', {data})
  } else {
    res.end('error')
  }
})

// 电影介绍页（预告片）路由
router.get('/movie', async (req, res) => {
  const data = await Trailers.find({}, {_id: 0, __v:0})
  console.log("data", data)
  res.render('movie', {data, url})
})

// 加载弹幕路由
router.get('/v3', async (req, res) => {
  const {id} = req.query
  const data = await Danmus.find({doubanId: id})
  let danmus = []
  data.forEach(item => {
    danmus.push([item.time, item.type, item.color, item.author, item.text])
  })
  res.send({code: 0, data: danmus})
})

// 发送弹幕路由
router.post('/v3', async (req, res) => {
  // const body = req.body
  // console.log("body", body)
  // 弹幕信息是以流式数据发送过来的
  const {id, author, text, time,  color, type} = await new Promise(resolve => {
    let body = ''
    req.on('data', (data) => {
      // console.log("data->", data)
      // buffer数据，转换成字符串
      body += data.toString()
    })
      .on('end', () => {
        resolve(JSON.parse(body))
        console.log("body->",body)
      })
  })
  await Danmus.create({
    doubanId: id,
    author,
    text,
    time,
    color,
    type
  })
  // 返回响应
  res.send({code: 0, data: {}})
  
})

// 接收处理所有消息
router.use(auth())

module.exports = router