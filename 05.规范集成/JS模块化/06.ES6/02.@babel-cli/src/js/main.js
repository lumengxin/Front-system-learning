import $ from 'jquery'

import {foo} from './module'

let text = foo()

document.write(text)

$('body').css('color', 'red')
