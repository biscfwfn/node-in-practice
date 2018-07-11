const CountStream = require('./countstream')
const https = require('https')
/**
 * 创建可写流实例,统计book的次数
 */
const countStream = new CountStream('book');
https.get('https://www.manning.com/',res => {
    res.pipe(countStream)
});
countStream.on('total', count => {
    console.log('Total matches:',count)
})