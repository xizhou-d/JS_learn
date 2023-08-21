function requestUrl(url,) {
    return new Promise((resolve, reject) => {
        // 模拟网络请求
        setTimeout(() => {
            resolve(url)
        }, 2000)
    })
}


// 需求：
// 1> url:ahy-->res: why
// 2> url: res + "aaa" -> res: whyaaa
// 3> res + "bbb" => res: whyaaabbb

// 1. 第一种方案，多次回调
// requestUrl('coderwhy').then(res => {
//     requestUrl(res + 'aaa').then(res => {
//         requestUrl(res + 'bbb').then(res => {
//             console.log(res)
//         })
//     })
// })

// 2. 第二种方案，promise 中 then 的返回值来解决
// requestUrl('coderwhy').then(res => {
//     return requestUrl(res + 'aaa')
// }).then(res => {
//     return requestUrl(res + 'bbb')
// }).then(res => {
//     console.log('res', res)
// })

// 3. promise + generator
function* getData() {
    const res1 = yield requestUrl('why')
    const res2 = yield requestUrl(res1 + 'bbb')
    const res3 = yield requestUrl(res2 + 'ccc')
    console.log('res3', res3)
}

// 手动执行生成器函数
// const generator = getData()
// generator.next().value.then(res => {
//     generator.next(res).value.then(res => {
//         generator.next(res).value.then(res => {
//             generator.next(res)
//         })
//     })
// })


// 自动生成
// function execGenerator(genFn) {
//     const generator = genFn()

//     function exec(res) {
//         const result = generator.next(res)

//         if (result.done) {
//             console.log('result', result)
//             return 111111111
//         }

//         result.value.then(res => {
//             exec(res)
//         })
//     }

//     exec()
// }

// execGenerator(getData)

// const co = require('co')

// co(getData)