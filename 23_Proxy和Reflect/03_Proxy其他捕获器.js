const obj = {
    name: 'why',
    age: 18
}

const objProxy = new Proxy(obj, {
    // 获取值时的捕获器
    get: function(target, key, ) {
        console.log(`监听到 ${target} 对象的 ${key} 属性被访问了。`, target)
        return target[key]
    },

    // 设置值时的捕获器
    set: function(target, key, value,) {
        console.log(`监听到 ${target} 对象的 ${key} 属性被修改 了。`, target)
        target[key] = value
    },

    // 监听 in 捕获器
    has(target, key) {
        console.log(`监听到对象的 ${key} 属性 in 操作。`, target)
        return target.hasOwnProperty(key)
    },

    // 监听 delete 捕获器
    deleteProperty(target, key) {
        console.log(`监听到对象的 ${key} 属性 delete 操作。`, target)
        delete target[key]
    }
})

// in 操作符
// console.log('name' in objProxy)

// delete 操作
// delete objProxy.name
// console.log(obj, objProxy)

