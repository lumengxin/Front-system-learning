define(function(require) {
  let module1 = require('./module1');
  console.log(module1.foo());

  let module4 = require('./module4');
  
  module4.fun2();
})