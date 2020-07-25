var fs = require('fs')

// fd = fs.openSync() 同步方法才可以有返回值，异步通过回调函数的参数返回
fs.open('hello2.txt', 'w', function(err, fd) {
  // 回调函数参数，错误优先
  console.log(arguments)
  if (!err) {
    // console.log(fd)
    fs.write(fd, '在回调内部，异步写入一段内容', function(err) {
      if (!err) {
        console.log('异步写入文件成功..')
      }

      fs.close(fd, function(err) {
        if (!err) {
          console.log('文件关闭..')
        }
      })
    })
  } else {
    console.log(err)
  }
})

console.log('异步任务后面的代码')
