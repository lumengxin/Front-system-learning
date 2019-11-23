const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1/mongoose_test", { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.connection.once("open", function() {
    console.log("数据库连接成功..")
})

const schema = mongoose.Schema
const stuSchema = new schema({
    name: String,
    age: Number,
    gender: {
        type: String,
        default: "female"
    },
    address: String,
})

const stuModel = mongoose.model("students", stuSchema)

// Document 和 集合中的文档一一对应
// 创建一个Document
/* var stu = new stuModel({
    name: "宋江",
    age: 40,
    gender: "male",
    address: "梁山"
})

stu.save(function(err) {
    if (!err) {
        console.log("保存成功..")
    }
}) */
stuModel.findOne({}, function(err, doc) {
    if (!err) {
        // doc.updateOne({$set: {age: 220}}, function(err) {
        //     if (!err) {
        //         console.log("修改成功..")
        //     }
        // })
        doc.age = 20
        doc.save()

        /*
        get(name):获取文档中指定属性值
        set(name, value):设置文档属性值
        id:获取文档_id属性值
        */
       console.log(doc.get("age"))
       console.log(doc.age)

       doc.set("name", "天蓬元帅")
       // doc.name = "天蓬元帅"
       console.log(doc)

       console.log(doc.id)
       console.log(doc._id)

       doc = doc.toObject()
       delete doc.address
       console.log(doc)
    }
})
