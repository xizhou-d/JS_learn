var obj = {
    _age: 18,
    _eating: function() {}
}

Object.defineProperties(obj, {
    name: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: 'why'
    },
    age: {
        configurable: false,
        enumerable: false ,
        get: function() {
            return this._age
        },
        set: function(value) {
            this._age = value
        }
    }
})

// 获取某一个特定属性的描述符
console.log(Object.getOwnPropertyDescriptor(obj, 'name'))
console.log(Object.getOwnPropertyDescriptor(obj, 'age'))

// 获取对象的所有属性描述符
console.log('获取对象的所有属性描述符', Object.getOwnPropertyDescriptors(obj))