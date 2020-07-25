console.log('hello, node')

var x = 10

// 通过exports向外暴露变量或者函数
exports.y = 20

module.exports.add = function(a, b) {
  return a + b
}