// node中，每个js文件中js代码都是独立运行在一个函数中，而不是全局作用域
// require()引入模块后，该函数返回一个对象，代表引入的模块（.js后缀可省）
var md = require('./01.hello')
var fs = require('fs')

console.log(md, md.x, md.y)

console.log(md.add(4, 9))

// console.log(fs)


var z = 'zzz'
zz = 'zzzz'

// node中全局对象global,作用类似网页中window
console.log(global.z, global.zz)

// arguments: 伪数组对象、类数组，封装函数中的实参。只有函数中有，不可能出现在全局
// arguments.callee: 这个属性保存的是当前执行的函数对象
console.log(arguments)
console.log(arguments.callee + "")
/*
function (exports, require, module, __filename, __dirname) {...}
- exports: 该对象用来将变量或者函数暴露到外部
- require: 函数，用来引入外部模块
- module: 当前模块本身，exports就是他的属性
- __filename: 当前模块的完整路径
- __dirname:  当前模块所在文件夹的完整路径
*/
console.log(module.exports === exports)

// 不能使用exports。expprts修改的是变量
module.exports = {
  name: 'xin',
  age: 21,
  sayHello: function() {
    console.log('hihihi')
  }
}

/*var obj = new Object() // 栈内存开辟空间，存地址值；obj变量名存在堆内存中
obj.name = 'sun'
var obj2 = obj
ojb2.name = 'zhu'  // 改变对象

console.log(obj.name, obj2.name)

obj2 = null       // 改变量
console.log(obj.name, obj2.name)*/
