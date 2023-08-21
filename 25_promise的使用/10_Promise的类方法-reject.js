const promise = Promise.reject('reject message')
// 相当于
// const promise = new Promise((resolve, reject) => {
//     reject('reject message')
// })

promise.then(res => {
    console.log('res', res)
}).catch(error => {
    console.log('error', error)
})


