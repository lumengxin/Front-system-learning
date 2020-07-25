
var str = 'hello, buffer'

// buffer: node中扩充的核心对象，不需要引入模块，直接使用即可
// 存储的是二进制数据，但是以16进制的形式显示。
// 范围: 00-ff 0-255 00000000-11111111。计算机一个0/1，称为1位(bit),8bit = 1byte(字节),字节是计算机传输最小单位
// buffer中的一个元素，占用内存的一个字节
var buf = Buffer.from(str)
console.log(buf, buf.length)  // 占用内存大小
console.log(str.length)       // 字符串的长度

// 一个中文占3个字节
console.log(Buffer.from('hh哈哈').length)


// 创建一个指定大小的buffer
// var buf2 = new Buffer(1024)  // 构造函数废弃

// 类方法。一旦创建，大小确定不能改变（连续内存空间）
var buf2 = Buffer.alloc(10)
buf2[0] = 88
buf2[1] = 255
buf2[2] = 0xaa
buf2[3] = 256
// 556: 1000101100 -> 00101100
buf2[4] = 556
buf2[10] = 5
console.log(buf2)

// 数字在控制台或页面中一定是十进制
console.log(buf2[4], buf2[4].toString(16))


// 可能含有敏感数据(之前用过的内存空间，可能已经含有数据)
var buf3 = Buffer.allocUnsafe(10)
console.log(buf3)

// node接收的请求都是二进制，存在buffer中
var buf4 = Buffer.from('一段文本数据')
console.log(buf4.toString())  // 将缓冲区中数据转换成字符串


