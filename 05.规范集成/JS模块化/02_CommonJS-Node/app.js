// 第三方库需要放到自定义库上面
let uniq = require('uniq')

let module1 = require('./modules/module1');
let module2 = require('./modules/module2');
let module3 = require('./modules/module3');

module1.foo();
module2();
module3.foo();
module3.bar();

let arrResult = uniq(module3.arr);
console.log(arrResult);
