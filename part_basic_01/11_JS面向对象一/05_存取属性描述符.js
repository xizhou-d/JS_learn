var obj = {
    name: 'why',
    age: 18,
    _address: 'beijing'
}

// 存取属性描述符
// 1. 隐藏一个私有属性描述符不希望直接被外界使用和赋值
// 2. 如果我们希望截获某一个属性访问和设置值的过程时，也会使用存取属性描述符
Object.defineProperty(obj, 'address', {
    configurable: true,
    enumerable: true,
    get: function() {
        foo()
        return this._address
    },
    set: function(value) {
        bar()
        this._address = value
    }
})

console.log('obj00', obj.address)

obj.address = 'shanghai'
console.log('obj11', obj)

// 获取的时候截获
function foo() {
    console.log('获取了一次 address 的值')
}
// 设置的时候截获
function bar() {
    console.log('设置了一次 address 的值')
}
