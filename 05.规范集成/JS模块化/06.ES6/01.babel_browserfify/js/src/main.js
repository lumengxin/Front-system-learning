// 引入其他模块
// import module1 from './module1'
// import module2 from './module2'

// console.log(module1, module2) // undefined undefined

// 引入第三方库
import $ from 'jquery'

import {foo, bar} from './module1'
import {fun, fun2} from './module2'
import module3 from './module3'

$('body').css('background', 'pink')

foo()
bar()
fun()
fun2()
// module3()
module3.foo()