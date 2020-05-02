// js文件后缀可以直接省略
import {foo, bar} from './math';
import data from '../data/test.json';

// 原生json引入自动转换为js对象
console.log(typeof data)

document.write('entry is working.<br/>');
document.write('根目录使用webpack命令打包，用的是全局安装的webpack.<br/>');

document.write(foo(3) + '<br/>');
document.write(bar(3) + '<br/>');
document.write(data + '<br/>');
document.write(JSON.stringify(data) + 'br/');
