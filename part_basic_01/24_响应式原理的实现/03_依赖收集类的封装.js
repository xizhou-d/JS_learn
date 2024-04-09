// 封装一个响应式函数
class Depend {
    constructor() {
        this.reactiveFns = []
    }

    addDepend(reactiveFn) {
        this.reactiveFns.push(reactiveFn )
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

// 对象的响应式
const obj = {
    // 每一个属性都对应一个 dep 实例
    name: 'ehy', // dep 对象
    age: 18 // dep 对象
}

watchFn(function foo() {
    const newName = obj.name
    console.log('name', obj.name)
})

watchFn(function demo() {
    console.log('demo')
})

function bar() {
    console.log('普通的其他函数')
    console.log('该函数不需要有任何响应式')
}

obj.name = 'xizhou'

depend.notify()