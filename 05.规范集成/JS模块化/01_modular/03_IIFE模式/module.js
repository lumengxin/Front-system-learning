// IIFE模式：匿名函数自调用（闭包）

// 声明window(此处可省)
(function(window) {
  let msg = 'IIFE模式中的msg'
  function foo() {
    console.log('foo(): ', msg)
  }

  // 暴露window.
  window.module3 = {foo}
  // window.module3 = {
  //   foo: foo
  // }

  // 传入window(此处可省)
})(window)
