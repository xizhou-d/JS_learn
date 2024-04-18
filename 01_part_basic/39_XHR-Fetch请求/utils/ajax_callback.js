function ajax({
    method = 'get',
    url,
    data = {},
    timeout = 10000,
    headers = {},
    success,
    failure
} = {}) {
    // 1. 创建 xhr 对象
    const xhr = new XMLHttpRequest()

    // 2. 设置监听
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            success && success(xhr.response)
        } else {
            failure({ status: xhr.status, statusText: xhr.statusText })
        }
    }

    // 3. 设置数据类型
    xhr.responseType = 'json'

    // 3.1 设置超时时间
    xhr.timeout = timeout
    /** 
     * 如果本来是 get 请求，但是用户 直接传递了一个 data 对象，此时需要处理：将 data 组装成 query 拼接到 url 后面
     */
    if (method.toUpperCase() === 'GET') {
        const queryArr = []
        for (const key in data) {
            queryArr.push(`${key}=${data[key]}`)
        }
        url = url + '?' + queryArr.join('&')

        xhr.open(method, url)
        xhr.send()
    } else {
        xhr.open(method, url)
        // xhr.setRequestHeader 一定要放在 open 之后，send 之前
        xhr.setRequestHeader('Content-Type', 'application/json')

        // 5. 发送请求
        xhr.send(JSON.stringify(data))
    }

    // 返回 xhr, 如果在外部想要取消，可以直接调用 xhr.abort() 方法取消请求
    return xhr
}