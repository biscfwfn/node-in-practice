const { Writable } = require('stream');
const util = require('util');

//util.inherits(构造函数,父类构造函数)实现对象间继承的函数
util.inherits(CountStream,Writable) // 继承可写流
//创建构造函数
function CountStream(matchText,options) { 
    Writable.call(this,options);
    this.count =0;
    this.matcher = new RegExp(matchText,'ig'); // 创建一个全局忽略大小写的正则对象
} 
// 重写方法
// 将数据发送到底层资源
// 此函数不得直接由应用程序代码调用。 它应该由子类实现，并由内部的Writable类方法调用
CountStream.prototype._write = function(chunk,encoding,callback) {
    let matches = chunk.toString().match(this.matcher); // 把输入的数据转换为字符串进行匹配
    if(matches){
        this.count +=matches.length;
    }
    callback();
}
CountStream.prototype.end = function() { // 当输入结束时 触发total事件
    this.emit('total',this.count)
}
module.exports=CountStream;