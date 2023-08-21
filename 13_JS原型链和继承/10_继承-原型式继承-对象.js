var obj = {
    name: 'why',
    age: 18
}

// 原型式继承函数
function createObject1(o) {
    var newObj = {}
    
    Object.setPrototypeOf(newObj, o)
    return newObj
}

// 道格拉斯: 写这个函数的时候 Object.setPrototypeOf 还没有出现
function createObject2(o) {
    function Fn() {}

    Fn.prototype = o
    var newObj = new Fn()
    return newObj
}

// 最新的方法
// var info = Object.create(obj)

var info = createObject1(obj)
console.log('info', info)
console.log('info.__proto__', info.__proto__)
