require("./connction/conn")

// var student = require("./models/student").model
var student = require("./models/student")

student.find({}, function(err, doc) {
    if (!err) {
        console.log(doc)
    }
})