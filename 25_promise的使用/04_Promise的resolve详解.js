// 传入 Promise 的特殊情况
// const promise = new Promise((resolve, reject) => {
//     reject(111111)
// })

// 以上代码完全等效于以下代码
// new Promise((resolve, reject) => {
//     resolve(promise)
//     reject('Rejecte message.')
// }).then(res => {
//     console.log('res', res)
// }, error => {
//     console.log('error', error)
// })

// 2. 传入一个对象，这个对象有 then 方法
new Promise((resolve, reject) => {
    const obj = {
        then: function(resolve, reject) {
            reject('lalskfjslkfjslkjflskdflsk')
        }
    }
    resolve(obj)
}).then(res => {
    console.log('res', res)
}, error => {
    console.log('error', error)
})