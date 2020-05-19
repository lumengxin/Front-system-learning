"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.foo = void 0;

let foo = () => {
  console.log('foo() -> module');
};

exports.foo = foo;