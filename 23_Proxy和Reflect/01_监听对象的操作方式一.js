const obj = {
    name: 'why',
    age: 18
}

// Object.defineProperty(obj, 'name', {
//     get: function() {
//         console.log('监听到 obj 对象的 name 属性被访问了。')
//     },
//     set: function() {
//         console.log('监听到 obj 对象的 name 属性被修改了。')
//     }
// })

Object.keys(obj).forEach(key => {
    let value = obj[key]

    Object.defineProperty(obj, key, {
        get: function() {
            console.log(`监听到 obj 对象的 ${key} 属性被访问了。`)

            return obj[key]
        },
        set: function(newValue) {
            console.log(`监听到 obj 对象的 ${key} 属性被修改了。`)
            obj[key] = newValue
        }
    })
})

obj.name = 'xizhou'
obj.age = 28

console.log(obj.name)
console.log(obj.age)