const name = 'xizhou'
const age = 18

function sum(num1, num2) {
    return num1 + num2
}

exports.name = name
exports.age = age
exports.sum = sum


/**
 * node 源码中 exports  和  module.exports 的关系
 * 
 * module.exports = {}
 * 
 * exports = module.exports
 * 
 * 将 module.exports 的地址赋值给 exports，因此 exports 和 module.exports 引用的同一个对象
 * 通过 exports.xxx 给 exports 添加属性的时候其实是给 module.exports 添加属性
 * 
 * 不管通过 exports 和 module.exports 导出，本质上导出的还是 module.exports
 * 
 * ❗️ exports 只能通过 exports.xxxx 给 exports 添加属性，不能通过 exports = {}
 *      因为，exports 和 module.exports 本来指向同一个对象，如果通过 exports = {xxx: xxx, yyy: yyy} 这种方式，相当于 exports 指向了一个新的对象
 *      不能再影响 module.exports，所以，用这种错误的方式导出，最后 module.exports 是一个空对象
 */
console.log(module.paths)