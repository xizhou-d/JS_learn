// function foo() {
//     const obj = { name: 'why' }

//     return new Promise((resolve, reject) => {
//         resolve(obj)
//     })
// }

// foo().then(res => {
//     console.log('res', res)
// })


const promise = Promise.resolve(
    new Promise((resolve, reject) => {
        resolve(1111111)
    })
)
// 相当于
// const promise1 = new Promise((resolve, reject) => {
//     resolve({name: 'why'})
// })

promise.then(res => {
    console.log('res', res)
})