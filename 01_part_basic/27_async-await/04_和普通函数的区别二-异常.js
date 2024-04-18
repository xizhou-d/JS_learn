// function foo() {
//     console.log('foo start start.')
//     console.log('中间代码')
//     throw new Error('throw new error')
//     console.log('foo start end.')
// }

async function foo() {
    console.log('foo start start.')
    console.log('中间代码')
    // 异步函数抛出的异常，会作为我们返回的 promise 的 reject 的值
    throw new Error('throw new error')
    console.log('foo start end.')
}

foo().catch(error => {
    console.log('error', error)
})

console.log('后续还有代码')