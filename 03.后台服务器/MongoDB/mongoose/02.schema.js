var mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1/mongoose_test", {useMongoClient: true})
mongoose.connection.once("open", function() {
    console.log("数据库连接成功..")
})

// 创建Schema对象
var Schema = mongoose.Schema
var stuSchema = new Schema({
    name: String,
    age: Number,
    gender: {
        type: String,
        default: "female"
    },
    address: String,
})

// 通过Schema来创建Model,自动将集合名变成复数
var StuModel = mongoose.model("student", stuSchema)

// 向数据库中插入文档
StuModel.create({
    name: "孙悟空",
    age: 2000,
    gender: "male",
    address: "花果山"
}, function(err) {
    if (!err) {
        console.log("插入数据成功..")
    }
})
