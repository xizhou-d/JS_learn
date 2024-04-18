function foo() {
    return new Promise((resolve, reject) => {
        resolve('success message')
        // reject('failure message')
    })
}

const fooPromise = foo()

// 1> then 方法传入的回调函数，会在 Promise 执行 resolve 函数时被回调
// 2> catch 方法传入的回调函数，会在 Promise 执行 reject 函数时被回调
fooPromise.then((res) => {
    console.log('res', res)
}, (error) => {
    console.log('error', error)
})

// 传入的函数被称为 exector
// const promise = new Promise((resolve, reject) => {
//     console.log('传入的函数被执行了。')
//     // resolve()
//     reject()
// })

// promise.then(() => {

// })

// promise.catch(() => {

// })