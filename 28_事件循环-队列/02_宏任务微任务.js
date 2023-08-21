setTimeout(() => {
    console.log('setTimeout')
}, 1000)

queueMicrotask(() => {
    console.log('queueMicrotask')
})

Promise.resolve().then(() => {
    console.log('Promise')
})

function foo() {
    console.log('foo')
    bar()
}

function bar() {
    console.log('bar')
}

foo()

console.log('其他代码执行')