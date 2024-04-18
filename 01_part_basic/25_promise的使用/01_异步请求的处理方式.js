function requestUrl(url, successCallback, failureCallback) {
    // 模拟网络请求
    setTimeout(() => {
        // 拿到请求结果
        // url 传入的是 coderwhy，请求成功
        if (url === 'coderwhy') {
            let names = ['abc', 'cba', 'nba']
            successCallback(names)
        } else { // 否则，请求失败
            let errorMessage = '请求失败，URL 错误'
            failureCallback(console.errorMessage)
        }
    }, 3000)
}

requestUrl('kobe', (res) => {
    console.log('res', res)
}, (error) => {
    console.log('error', error)
})