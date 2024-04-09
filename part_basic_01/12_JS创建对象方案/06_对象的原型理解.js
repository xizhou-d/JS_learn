var obj = { name: 'why' } // [[prototype]
var info = {} // [[prototype]


// 1. 解释原型的概念/看一下原型

// 早起的 ECMA 没有规范如何去查看 [[prototype]
// 【浏览器】给对象中提供了一个属性，可以方便我们查看一下这个原型对象
// __proto__

// console.log('obj.__propto__', obj.__proto__) // {}
// console.log('info.__proto__', info.__proto__) // {}

// // ES5 之后提供的 Object.getPrototypeOf(obj)
// console.log('Object.getPrototypeOf', Object.getPrototypeOf(obj))

// 2. 原型的作用？
obj.__proto__.age = 18
console.log(obj.age)