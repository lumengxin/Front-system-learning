
const fs = require('fs')

// 打开文件 fs.openSync(path, flags[,mode]) args[路径, 操作类型, 权限]
var fd = fs.openSync('hello.txt', 'w')  // 文件不存在，会创建
// 返回值：一个文件的描述符，可通过其对文件进行各种操作
console.log(fd)

// 写入内容 fs.writeSync(fd, string[, position[, encoding]])
fs.writeSync(fd, '今天是个好日子', 4)

// 关闭文件
fs.closeSync(fd)

