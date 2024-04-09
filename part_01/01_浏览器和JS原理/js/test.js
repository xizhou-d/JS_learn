console.log('defer script start')

debugger

// 总结二： 在 defer 代码中，DOM Tree 已经构建完成
var boxEl = document.querySelector('.box')

console.log('boxEl', boxEl)

console.log('defer script end')

var message = 'Hello World.'