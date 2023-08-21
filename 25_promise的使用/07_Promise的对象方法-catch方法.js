const promise = new Promise((resolve, reject) => {
    // resolve()
    reject('reject status')
    // throw new Error('Rejected status.')
}) 

// promise.then(res => {
//     console.log('res', res)
// }, (error) => {
//     console.log('error: ', error)
// })

// promise.then(res => {
//     throw new Error('then rejected error')
// }).catch(error => console.log('error', error))

promise.then(res => {
    
})

promise.catch(err => {

})