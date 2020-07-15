// 不能用函数声明写法
var onmessage = function(ev) {
  // 通过ev.data接收数据
  console.log('分线程接收主线程数据：', ev)
  var num = ev.data
  var result = fibonacci(num)
  postMessage(result)
  // console是浏览器实现
  console.log('分线程向主线程返回的数据：', result)

  // alert是window的方法，在分线程中不能使用
  // 分线程中的全局对象不再是window，所有不能更新界面
  // alert(result)
}

console.log('work.js -> this: ', this)

function fibonacci(n) {
  return n <= 2 ? 1 : fibonacci(n - 1) + fibonacci(n - 2)
}