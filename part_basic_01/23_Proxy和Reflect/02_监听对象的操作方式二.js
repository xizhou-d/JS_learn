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
    }
})
console.log('objProxy', objProxy)

console.log(objProxy.name)
console.log(objProxy.age)

objProxy.name = 'kobe'
objProxy.age = 20

console.log('obj.name', obj.name)
console.log('obj.age', obj.age)
console.log('objProxy', objProxy)
