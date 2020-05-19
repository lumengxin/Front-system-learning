"use strict";

var _jquery = _interopRequireDefault(require("jquery"));

var _module = require("./module");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let text = (0, _module.foo)();
document.write(text);
(0, _jquery.default)('body').css('color', 'red');