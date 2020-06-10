const mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost:27017/gzhipin_test')

const conn = mongoose.connection

conn.on('connected', () => {
    console.log('mongodb connect success..')
})

// 定义Schema
const userSchema = mongoose.Schema({
    // 用户名
    username: {type: String, required: true},
    // 密码
    password: {type: String, required: true},
    // 用户类型：laoban/dashen
    type: {type: String, required: true},
    // 用户头像
    header: {type: String},
    // 职位
    post: {type: String},
    // 信息介绍
    info: {type: String},
    // 公司
    company: {type: String},
    // 资薪
    salary: {type: String}
})

const chatSchema = mongoose.Schema({
    // 发送用户的id
    from: {type: String, required: true},
    // 接收用户的id
    to: {type: String, required: true},
    // from和to组成的字符串
    chat_id: {type: String, required: true},
    // 内容
    content: {type: String, required: true},
    // 标识消息是否已读
    read: {type: Boolean, default: false},
    // 信息创建时间
    create_time: {type: Number}
})

// 定义Model
const UserModel = mongoose.model('user', userSchema)
const ChatModel = mongoose.model('chat', chatSchema)

// 向外暴露Model。分别暴露
exports.UserModel = UserModel
exports.ChatModel = ChatModel

// 统一暴露
// module.exports = xxx