function requestUrl(url,) {
    return new Promise((resolve, reject) => {
        // 模拟网络请求
        setTimeout(() => {
            // 拿到请求结果
            // url 传入的是 coderwhy，请求成功
            if (url === 'coderwhy') {
                let names = ['abc', 'cba', 'nba']
                resolve(names)
            } else { // 否则，请求失败
                let errorMessage = '请求失败，URL 错误'
                reject(errorMessage)
            }
        }, 3000)
    })
}

const promise = requestUrl('coderwhy')

promise.then((res) => {
    console.log('请求成功：', res)
}, (error) => {
    console.log('请求失败：', error)
})


