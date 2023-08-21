const promise = new Promise((resolve, reject) => {
    // resolve('resolve message')
    reject('rejected message.')
})

promise.then(res => {
    console.log('res', res)
}).catch(error => {
    console.log('error', error)
}).finally(() => {
    console.log('finally execute')
})