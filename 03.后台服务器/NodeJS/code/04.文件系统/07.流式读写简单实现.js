var fs = require('fs')
var path2 = 'C:\\Users\\xin\\Music\\海的幽灵-米津玄师.mp4'
var rs = fs.createReadStream(path2)
var ws = fs.createWriteStream('ws.mp4')

rs.once('open', function() {
  console.log('可读流打开了..')
})

rs.once('close', function() {
  console.log('可读流关闭了..')
})

ws.once('open', function() {
  console.log('可写流打开了..')
})

ws.once('close', function() {
  console.log('可写流关闭了..')
})

// pipe()可以将可读流中的内容，直接输出到可写流中
rs.pipe(ws)
