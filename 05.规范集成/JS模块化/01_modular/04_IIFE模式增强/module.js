// IIFE模式增强：引入依赖，现代模块实现的基石

// 形参
(function(window, $) {
  let msg = 'IIFE模式增强中的msg'
  function foo() {
    console.log('foo(): ', msg)
  }

  window.module4 = foo

  // 引入jquery. 1.直接使用，$直接绑定到了全局
  // $()

  // 2.依赖注入，不是全局时
  $('body').css('background', 'pink')

  // 实参
})(window, jQuery)
