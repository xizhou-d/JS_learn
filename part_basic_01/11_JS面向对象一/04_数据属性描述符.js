// name, age 初始赋值的属性：
// 属性描述符：默认值
// configurable: true
// enumerable: true
// writable: true

var obj = {
    name: 'why',
    age: 18
}

Object.defineProperty(obj, 'address', {
    value: 'beijing', // 默认值 undefined
    // 该属性不可以删除/也不可以重新定义属性描述符
    configurable: false, // 默认值 false
    // 该属性是配置对应的属性是否可以枚举（for...in/Object.keys()）
    enumerable: true, // 默认值 false
    // 该属性是配置某个属性是否可以被重新赋值（修改值/写入值）
    writable: false // 默认值 false
})

// delete obj.name
// console.log('obj', obj, obj.name)
// delete obj.address
// console.log('obj.address', obj.address)
// obj.address = 'shanghai'
// console.log('obj.address', obj.address)

// configurable先被设置为 false，就不可配置了，重新设置 configurable 就会报错
// Object.defineProperty(obj, 'address', {
//     value: 'beijing',
//     // 该属性不可以删除
//     configurable: true,
// })

// enumerable: true
// console.log(obj)
// for (var key in obj) {
//     console.log('key', key)
// }

// console.log('Object.keys(obj)', Object.keys(obj))

// writable: false
obj.address = 'shanghai'
console.log('obj.address', obj.address)

