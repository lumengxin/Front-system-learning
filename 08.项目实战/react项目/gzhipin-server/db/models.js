const mongoose = require('mongoose')

// 连接数据库
mongoose.connect('mongodb://localhost:27017/gzhipin_test')

const conn = mongoose.connection

conn.on('connected', () => {
    console.log('mongodb connect success..')
})

// 定义Schema
const userSchema = mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    type: {type: String, required: true},
    header: {type: String},
    post: {type: String},
    info: {type: String},
    company: {type: String},
    salary: {type: String}
})

// 定义Model
const UserModel = mongoose.model('user', userSchema)

// 向外暴露Model。分别暴露
exports.UserModel = UserModel
// 统一暴露
// module.exports = xxx