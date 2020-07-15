// function testModule() {
//   // 私有数据
//   var msg = 'my module'
//   // 操作数据的函数
//   function toUpper() {
//     console.log('toUpper: ', msg.toUpperCase())
//   }
//   function toLower() {
//     console.log('toLower: ', msg.toLowerCase())
//   }

//   // 向外暴露对象
//   return {
//     toUpper: toUpper,
//     toLower: toLower
//   }
// }

// 传入window, 代码压缩时内部的window可以变成w之类的代替
(function(window) {
  // 私有数据
  var msg = 'my module'
  // 操作数据的函数
  function toUpper() {
    console.log('toUpper: ', msg.toUpperCase())
  }
  function toLower() {
    console.log('toLower: ', msg.toLowerCase())
  }

  window.module = {
    toUpper: toUpper,
    toLower: toLower
  }
})(window)