// 同步文件读取
// 异步文件读取

// 简单文件读取
var path = 'D:/home/前端体系学习/03.后台服务器/MongoDB/docs/images/mongodb环境变量配置.png'
var fs = require('fs')
fs.readFile(path, function(err, data) {
  if (!err) {
    // console.log(data.toString())
    fs.writeFile('w.png', data, function(err) {
      if (!err) {
        console.log('复制图片成功..')
      }
    })
  }
})

// 流式文件读取
var path2 = 'C:\\Users\\xin\\Music\\海的幽灵-米津玄师.mp4'
var rs = fs.createReadStream(path2)
var ws = fs.createWriteStream('ws.mp4')

rs.once('open', function() {
  console.log('可读流打开了..')
})

rs.once('close', function() {
  console.log('可读流关闭了..')
  // 数据读取完毕，关闭可写流
  ws.end()
})

ws.once('open', function() {
  console.log('可写流打开了..')
})

ws.once('close', function() {
  console.log('可写流关闭了..')
})


// 读取可读流中的数据，必要为其绑定一个data事件（on: 可持续的）
// 数据小时，直接一次读完
rs.on('data', function(data) {
  // console.log(data)
  // console.log(data.length)
  ws.write(data)
})

