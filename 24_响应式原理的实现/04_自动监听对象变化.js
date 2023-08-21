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
const depend = new Depend()
function watchFn(fn) {
    depend.addDepend(fn)
}

// 封装一个获取 depend 的函数
const targetWeakmap = new WeakMap()
function getDepend(target, key) {
    const map = targetWeakmap.get(target)

    if (!map) {
        map = new Map()
        targetWeakmap.set(target, map)
    }

    const depend = map.get(key)
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
        return Reflect.get(target, key, receiver)
    },
    set: function (target, key, newValue, receiver) {
        Reflect.set(target, key, newValue, receiver)
        const depend = targetWeakmap.get(target).get(key)
        depend.notify()
    }
})

watchFn(function() {
    const newName = obj.name
    console.log('name 发生变化需要执行', obj.name)
})

watchFn(function() {
    console.log('name 发生变化需要执行 demo')
})

watchFn(function() {
    console.log('age 发生变化需要执行')
})

watchFn(function() {
    console.log('age 发生变化需要执行')
})

function bar() {
    console.log('普通的其他函数')
    console.log('该函数不需要有任何响应式')
}

objProxy.name = 'xizhou1'

const info = {
    address: 'guangzhou'
}

watchFn(function() {
    console.log(info.address, '监听 address 变化+++++++++++-1')
})

watchFn(function() {
    console.log(info.address, '监听 address 变化+++++++++++-2')
})


// obj 对象
// name: depend
// age: depend
// const objMap = new Map()
// objMap.set('name', 'nameDepend')
// objMap.set('age', 'ageDepend')

// info 对象
// address: depend
// const infoMap = new Map()
// infoMap.sest('address', 'addressDepend')

// const targetMap = new WeakMap()
// targetMap.set(obj, objMap)
// targetMap.set(info, infoMap)

// obj.name
// const dependObjName = targetMap.get(obj).get('name')

