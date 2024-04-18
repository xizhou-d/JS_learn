// 封装一个响应式函数
class Depend {
    constructor() {
        this.reactiveFns = []
    }

    addDepend(reactiveFn) {
        this.reactiveFns.push(reactiveFn)
    }

    notify() {
        this.reactiveFns.forEach(fn => fn())
    }
}

// 封装一个响应式函数
let activeReactiveFn = null;
function watchFn(fn) {
    activeReactiveFn = fn
    fn()
    activeReactiveFn = null
}

// 封装一个获取 depend 的函数
const targetWeakmap = new WeakMap()
function getDepend(target, key) {
    let map = targetWeakmap.get(target)

    if (!map) {
        map = new Map()
        targetWeakmap.set(target, map)
    }

    let depend = map.get(key)
    if (!depend) {
        depend = new Depend()
        map.set(key, depend)
    }

    return depend
}

// 对象的响应式
const obj = {
    // 每一个属性都对应一个 dep 实例
    name: 'ehy', // dep 对象
    age: 18 // dep 对象
}

// 监听对象的属性变化：Proxy(vue3)/Object.defineProperty(vue2)

const objProxy = new Proxy(obj, {
    get: function (target, key, receiver) {
        // 根据 target 、key 获取对应的 depend
        const depend = getDepend(target, key)
        depend.addDepend(activeReactiveFn)
        return Reflect.get(target, key, receiver)
    },
    set: function (target, key, newValue, receiver) {
        Reflect.set(target, key, newValue, receiver) 
        const depend = targetWeakmap.get(target).get(key)
        depend.notify()
    }
})

watchFn(function() {
    console.log('name 发生变化需要执行1', objProxy.name)
})

watchFn(function() {
    console.log('name 发生变化需要执行2', objProxy.name)
})

watchFn(function() {
    console.log('age 发生变化需要执行1', objProxy.age)
})

watchFn(function() {
    console.log('age 发生变化需要执行2', objProxy.age)
})


objProxy.age = 12