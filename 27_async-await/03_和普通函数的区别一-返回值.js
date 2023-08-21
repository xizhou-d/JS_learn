async function foo() {
    // return {
    //     then: function(resolve, reject) {
    //         resolve('hahahaah')
    //     }
    // }

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('return a promise')
        }, 2000)
    })
}

// 异步函数的返回值一定是一个 promise
const promise = foo()
promise.then(res => {
    console.log('res', res)
})