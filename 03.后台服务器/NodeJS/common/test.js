// CommonJS模块化
// 在Node中，一个js文件就是一个模块
// Node中，每一个js文件中js代码都独立于一个函数中，不是全局作用域，其他模块无法访问

console.log("一个test.js模块，用于module.js")

var x = 12
var y = 20

// 向外部暴露属性或方法
exports.x = x
