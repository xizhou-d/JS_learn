// console.log(Object.getOwnPropertyDescriptors(Promise.prototype))
// console.log(Object.keys(Promise))

const promise = new Promise((resolve, reject) => {
    resolve(34567)
})

// promise.then(res1 => {
//     console.log('res1: ', res1)
// })

// promise.then(res2 => {
//     console.log('res2: ', res2)
// })

// promise.then(res3 => {
//     console.log('res3: ', res3)
// })

// promise.then(res => {
    
// }).then(res => {
//     console.log('res: ', res)
//     return 22222
// }).then(res1 => {
//     console.log('res1', res1)
// })

// promise.then(res => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve(111111)
//         }, 3000)
//     })
// }).then(res1 => {
//     console.log('res1', res1)
// })

promise.then(res => {
    return {
        then: function(resolve, reject) {
            resolve(2222222)
        }
    }
}).then(res1 => {
    console.log('res1: ', res1)
})
