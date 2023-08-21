let activeReactiveFn = null;

// 封装一个响应式函数

/**
 * depend 优化：
 * 1> depend 方法
 * 2> 使用 Set 来保存依赖函数，而不是数组
 */
class Depend {
    constructor() {
        this.reactiveFns = new Set()
    }

    addDepend(reactiveFn) {
        this.reactiveFns.add(reactiveFn)
    }

    depend() {
        if (activeReactiveFn) {
            this.reactiveFns.add(activeReactiveFn)
        }
    }

    notify() {
        this.reactiveFns.forEach(fn => fn())
    }
}

// 封装一个响应式函数
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

function reactive(obj) {
    // return new Proxy(obj, {
    //     get: function(target, key, receiver) {
    //         let depend = getDepend(target, key)
    //         depend.depend()
    //         return Reflect.get(target, key, receiver)
    //     },
    //     set: function(target, key, newValue, receiver) {
    //         Reflect.set(target, key, newValue, receiver)
    //         let depend = getDepend(target, key)
    //         depend.notify()
    //     }
    // })

    Object.keys(obj).forEach(key => {
        let value = obj[key]
        Object.defineProperty(obj, key, {
            get: function() {
                let depend = getDepend(obj, key)
                depend.depend()
                return value
            },
            set: function(newValue) {
                value = newValue
                let depend = getDepend(obj, key)
                depend.notify()
            }
        })
    })

    return obj
}

// 监听对象的属性变化：Proxy(vue3)/Object.defineProperty(vue2)

const objProxy = reactive({
    // 每一个属性都对应一个 dep 实例
    name: 'ehy', // dep 对象
    age: 18 // dep 对象
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

watchFn(function() {
    console.log(objProxy.name, '+++++++++++++++++++')
    console.log(objProxy.name, '-------------------')
})

const infoProxy = reactive({
    address: 'guangzhou',
    height: 188
}
)

watchFn(function() {
    console.log(infoProxy.address, 'info.address')
    console.log('******', infoProxy)
})

infoProxy.address = 'beijing'