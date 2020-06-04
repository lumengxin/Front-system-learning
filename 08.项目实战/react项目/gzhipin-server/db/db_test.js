/* 测试使用mongoose操作mongodb数据库
1. 连接数据库
  1.1. 引入mongoose
  1.2. 连接指定数据库(URL只有数据库是变化的)
  1.3. 获取连接对象
  1.4. 绑定连接完成的监听(用来提示连接成功)
2. 得到对应特定集合的Model
  2.1. 字义Schema(描述文档结构)
  2.2. 定义Model(与集合对应, 可以操作集合)
3. 通过Model或其实例对集合数据进行CRUD操作
  3.1. 通过Model实例的save()添加数据
  3.2. 通过Model的find()/findOne()查询多个或一个数据
  3.3. 通过Model的findByIdAndUpdate()更新某个数据
  3.4. 通过Model的remove()删除匹配的数据
* */
const md5 = require('blueimp-md5')

/* 1.连接数据库 */
// 1.1. 引入mongoose
const mongoose = require('mongoose')
// 1.2. 连接指定数据库(URL只有数据库是变化的)
mongoose.connect('mongodb://localhost:27017/gzhipin_test')
// 1.3. 获取连接对象
const conn = mongoose.connection
// 1.4. 绑定连接完成的监听(用来提示连接成功)
conn.on('connected', function() {
    // 连接成功后回调
    console.log('数据库连接成功...')
})

/*
集合（数组) -> 表 ； 文档（对象） -> 记录
属性名 -> 字段
 */

/* 2. 得到对应特定集合的Model */
// 2.1. 字义Schema(描述文档结构) Schema: 架构图，图示，纲要（约束）。
const userSchema = mongoose.Schema({
    // 指定文档结构。属性名/属性值类型，是否必须，默认值
    username: {type: String, required: true},
    password: {type: String, required: true},
    type: {type: String, required: true}
})
// 2.2. 定义Model(与集合对应, 可以操作集合)
// 集合名(确定): users <- user  构造函数
const UserModel = mongoose.model('user', userSchema)

/* 3. 通过Model或其实例对集合数据进行CRUD操作 */
// 3.1. 通过Model实例的save()添加数据
function testSave() {
    // 创建UserModel的实例
    const userModel = new UserModel({
        username: 'tom',
        password: md5('2dfas4'),
        type: 'laoban'
    })
    // 调用save()保存
    userModel.save(function(err, user) {
        console.log('save..', err, user)
    })
}
// testSave()
// 3.2. 通过Model的find()/findOne()查询多个或一个数据
function testFind() {
    // 查询多个：得到包含所有匹配文档对象的数据，没有匹配的是[]
    UserModel.find({username: 'test'}, function(err, user) {
        console.log('find..', err, user)
    })
    // 查询一个：得到的是匹配的文档对象，没有匹配的是null
    UserModel.findOne({_id: '5ed7c167d63e000b58f39ce5'}, function(err, user) {
        console.log('findOne..', err, user)
    })
}
// testFind()
// 3.3. 通过Model的findByIdAndUpdate()更新某个数据
function testUpdate() {
   UserModel.findByIdAndUpdate({_id: '5ed7c167d63e000b58f39ce5'}, {username: 'jack'}, function(err, oldUser) {
       console.log('find....', err, oldUser)
   })
}
// testUpdate()
// 3.4. 通过Model的remove()删除匹配的数据
function testRemove() {
    UserModel.remove({_id: '5ed7c1840bf0af20acc50c3f'}, function(err, doc) {
        console.log('remove...', err, doc)
    })
}
testRemove()