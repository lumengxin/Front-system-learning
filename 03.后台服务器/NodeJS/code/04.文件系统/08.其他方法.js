var fs = require('fs')

// 是否存在
var isExists = fs.existsSync('hello.txt')
console.log(isExists)

// 状态
fs.stat('hello.txt', function(err, stat) {
  console.log(stat)
})

// 删除
// fs.unlinkSync('hello2.txt')

// 读取目录的目录结构
fs.readdir('.', function(err, files) {
  if (!err) {
    console.log(files)
  }
})

// 截断文件，将文件修改为指定大小
fs.truncateSync('hello3.txt', 5)

// 创建一个目录
// fs.mkdir(path[,mode[,callback]])

// 对文件重命名
// fs.rename(oldpath, newpath, callback)