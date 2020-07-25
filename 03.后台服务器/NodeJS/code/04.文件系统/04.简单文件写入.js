var fs = require('fs')

// 默认'w'，覆盖之前内容。
// 绝对路径：\\转义字符，或者 /
fs.writeFile('D:\\home\\前端体系学习\\03.后台服务器\\NodeJS\\docs\\hello.txt', '简单文件写入', {flag: 'a'}, function(err) {
  if (!err) {
    console.log('写入成功')
  }
})




