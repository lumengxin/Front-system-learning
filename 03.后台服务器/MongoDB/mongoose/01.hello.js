// 下载，安装   npm i mongoose --save
// 引入
var monggose = require("mongoose")
// 连接MongoDb数据库(端口号是默认的27017，可以省略)
monggose.connect('mongodb://127.0.0.1/practice')
// 监听数据库连接状态（非必须）
monggose.connection.once("open", function() {
    console.log("数据库连接成功..")
})
// 断开连接（一般不需要）,连接成功不会自动断掉
monggose.connection.once("close", function() {
    console.log("数据库已经断开..")
})
// monggose.disconnect();