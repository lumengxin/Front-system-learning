module.exports = function(server) {
  // 得到io对象
  const io = require('socket.io')(server)
  // 监视连接(当有一个客户连接上时回调)
  io.on('connection', function(socket) {
    console.log('socket coonected')
    // 绑定sendMsg监听，接受客户端发送的信息
    socket.on('sendMsg', function(data) {
      console.log('服务器接受到了浏览器的消息', data)
      // 处理数据
      data.name = data.name.toUpperCase()
      // 向客户端发送消息(名称，数据)
      // 发送给当前socket对应的客户端；io.emit(): 发送给所有连接服务器的客户端
      io.emit('receiveMsg', data.name + '-' + data.date)
      console.log('服务器向浏览器发送消息', data)
    })
  })
}