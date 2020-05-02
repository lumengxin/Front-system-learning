// namespace模式：简单对象封装

let obj = {
  msg: 'namespace中的msg',
  foo() {
    console.log('foo(): ', this.msg);
  }
}
