const {ChatModel} = require('../db/models')

module.exports = function(server) {

  const io = require('socket.io')(server)

  io.on('connection', function(socket) {
    console.log('socket coonected')

    socket.on('sendMsg', function({from, to, content}) {
      console.log('服务器接受到了浏览器的消息', {from, to, content})
      // 处理数据（保存消息）
      const chat_id = [from, to].sort().join('_')
      const create_time = Date.now()
      new ChatModel({from, to, content, chat_id, create_time}).save(function(err, chatMsg) {
        // 向客户端发消息（A,B..)
        // io: 所有连接的客户端（暂时简单实现）
        io.emit('receiveMsg', chatMsg)
        console.log('chagMsg', chatMsg)
      })
    })
  })
}