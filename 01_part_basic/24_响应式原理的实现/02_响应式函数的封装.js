// 封装一个响应式函数
let reactiveFns = []
function watchFn(fn) {
    reactiveFns.push(fn)
}

const obj = {
    name: 'ehy',
    age: 18 
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

reactiveFns.forEach(fn => fn())