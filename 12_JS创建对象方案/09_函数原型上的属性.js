function foo() {
}
// console.log(foo.prototype)

// console.log(Object.getOwnPropertyDescriptors(foo.prototype))

// Object.defineProperty(foo.prototype, 'constructor', {
//     configurable: true,
//     enumerable: true,
//     writable: true,
// })
// console.log(foo.prototype)

// console.log(foo.prototype.constructor === foo)
// console.log(foo.prototype.constructor.name)

// console.log(foo.prototype.constructor.prototype.constructor.prototype.constructor)

foo.prototype = {
    // constructor: foo, // 真实开发中我们可以通过 Object.defineProperty() 方法添加 constructor，方便设置可枚举属性
    name: 'why',
    age: 18,
    height: 188,
    address: 'beijing',
}

var p2 = new foo()
console.log(p2)

Object.defineProperty(foo.prototype, 'constructor', {
    configurable: true,
    enumerable: false,
    writable: true,
    value: foo
})