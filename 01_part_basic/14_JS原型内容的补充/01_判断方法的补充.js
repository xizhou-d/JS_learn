var obj = {
    name: 'why',
    age: 18
}

var info = Object.create(obj, {
    address: {
        value: 'beijign',
        enumerable: true
    }
})

// console.log('info', info)
// console.log('info.__proto__', info.__proto__)

// obj.hasOwnProperty(key) 如果某个属性在自身而不是在原型上，返回 true
// console.log(info.hasOwnProperty('address')) // true
// console.log(info.hasOwnProperty('name')) // false
// console.log(info.hasOwnProperty('age')) // false

// in/for in 操作符：不管在当前对象还是在原型中返回的都是 true
// console.log('address' in info)
// console.log('name' in info)

for (var key in info) {
    console.log('key', key)
}

console.log('Object.keys', Object.keys(info))
