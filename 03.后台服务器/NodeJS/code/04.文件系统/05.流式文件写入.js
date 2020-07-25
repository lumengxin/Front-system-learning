// 同步，异步，简单文件的写入都不适合大文件的写入，性能差，容易导致内存溢出
var fs = require('fs')

// 流式文件写入
// 创建一个可写流
var ws = fs.createWriteStream('hello4.txt')

// 通过open和close事件来监听流的打开和闭关状态
ws.once('open', function() {
  console.log('流打开了')
})
ws.once('close', function() {
  console.log('流关闭了')
})

// 流打开可以持续写入
ws.write('流打开了')
ws.write('通过可写流写入内容')
ws.write('流关闭了')

// ws.close()
ws.end()