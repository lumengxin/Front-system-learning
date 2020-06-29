const express = require('express')
const router = require('./router')
const db = require('./db')

// 创建app应用对象
const app = express()

// 配置模板资源目录
app.set('views', './src/views')
// 配置模板引擎
app.set('view engine', 'ejs')

;(async () => {
  // 等待连接数据库
  await db
  // 应用路由
  app.use(router)
})()

// 监听端口号
app.listen(3000, () => console.log('服务器启动成功..'))