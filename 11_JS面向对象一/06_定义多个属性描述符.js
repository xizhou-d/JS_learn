var obj = {
    _age: 18,
    // 如果 configurable: true, enumerable: true ，可以采用直接写的方式
    set age(value) {
        this._age = value
    },
    get age() {
        return this._age
    }
}

Object.defineProperties(obj, {
    name: {
        configurable: true,
        enumerable: true,
        writable: true,
        value: 'why'
    },
    // age: {
    //     configurable: false,
    //     enumerable: false ,
    //     get: function() {
    //         return this._age
    //     },
    //     set: function(value) {
    //         this._age = value
    //     }
    // }
})

console.log('obj', obj)
console.log('obj.age', obj.age)
obj.age = 19
console.log('obj.age', obj.age)