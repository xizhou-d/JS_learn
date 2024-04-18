function requestData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(111122222233333)
        }, 2000)
    })
}

// async function foo() {
//     const res1 = await requestData()
//     console.log('后面的代码1', res1)
//     console.log('后面的代码2')
//     console.log('后面的代码3')

//     const res2 = await requestData()
//     console.log('res2后面的代码', res2)
// }

// 2. 跟上其他的值
// async function foo() {
//     // const res1 = await 124

//     // const res1 = await {
//     //     then: function(resolve, reject) {
//     //         resolve(33333333)
//     //     }
//     // }

//     const res1 = await new Promise((resolve, reject) => {
//         resolve(999999999)
//     })
//     console.log('res1', res1)
// }

// 3. reject值
async function foo() {
    const res1 = await requestData()

    console.log('res1', res1)
}
foo().catch(error => {
    console.log('error', error)
})