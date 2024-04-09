const targetWeakmap = new WeakMap()

let reactiveFnGlobal = null

class Depend {
    constructor() {
        this.reactiveFns = new Set()
    }

    addDepend() {
        if (reactiveFnGlobal) {
            this.reactiveFns.add(reactiveFnGlobal)
        }
    }

    notify() {
        this.reactiveFns.forEach(fn => fn())
    }
}

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
    return new Proxy(obj, {
        get: function(target, key, receiver) {
            // 自动收集依赖
            const depend = getDepend(target, key)
            depend.addDepend()
    
            return Reflect.get(target, key, receiver)
        },
        set: function(target, key, newValue, receiver) {
            Reflect.set(target, key, newValue, receiver)
            let depend = getDepend(target, key)
            depend.notify()
        }
    })
}

const objProxy = reactive({
    name: 'why',
    age: 18
})

function watchFn(fn) {
    reactiveFnGlobal = fn
    fn()
    reactiveFnGlobal = null
}

watchFn(() => {
    console.log(objProxy.name, 'obj => name 依赖1 被执行')
})

watchFn(() => {
    console.log(objProxy.name, 'obj => name 依赖2 被执行')
})

watchFn(() => {
    console.log(objProxy.age, 'obj => age 依赖1 被执行')
})

watchFn(() => {
    console.log(objProxy.age, 'obj => age 依赖2 被执行')
})

objProxy.name = 'xizhou'

const infoProxy = reactive({
    address: 'beijing',
    height: 188
})

watchFn(() => {
    console.log(infoProxy.address, 'info => address 依赖1 被执行')
})

watchFn(() => {
    console.log(infoProxy.address, 'info => address 依赖2 被执行')
})

infoProxy.address = 'shanghai'
