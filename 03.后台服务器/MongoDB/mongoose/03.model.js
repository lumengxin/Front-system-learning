var mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1/mongoose_test")
mongoose.connection.once("open", function() {
    console.log("数据库连接成功..")
})

var Schema = mongoose.Schema
var StuSchema = new Schema({
    name: String,
    age: Number,
    gender: {
        type: String,
        default: "female"
    },
    address: String,
})

var stuModel = mongoose.model("students", StuSchema)

// 有了Model后，就能对数据库进行增删改查操作
/* stuModel.create([
    {
        name: "沙和尚",
        age: 900,
        gender: "male",
        address: "流沙河"
    }
], function(err) {
    if (!err) {
        console.log("插入数据成功..")
        console.log(arguments)
    }
}) */

// 查询
// Model.find(conditions 条件, [projection] 投影, [options] 选项, [callback] 回调)
stuModel.find({name:"猪八戒"}, function(err, docs) {
    if (!err) {
        console.log(docs)
    }
})
stuModel.find({}, 'name age -_id',{skip:1, limit:3}, function(err, docs) {
    if (!err) {
        console.log(docs)
        console.log(docs[0].name)
    }
})
stuModel.findById("5dd7f0fe2438276d8f3b119a", function(err,doc) {
    if (!err) {
        // find()查询的结果就是Doucument，文档对象，是Model实例
        console.log(doc)
    }
}) 

// 修改
// Model.updata(confitions, doc, [options], [callback])
stuModel.updateOne({name:"孙悟空"}, {$set: {age: 20}}, function(err) {
    if (!err) {
        console.log("修改成功..")
    }
})

// 删除
// Model.remove(conditions, [callback]);
stuModel.remove({name: "孙悟空"}, function(err) {
    if (!err) {
        console.log("删除成功..")
    }
})