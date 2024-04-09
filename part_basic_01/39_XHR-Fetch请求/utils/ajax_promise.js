function ajax({
    method = 'get',
    url,
    data = {},
    timeout = 10000,
    headers = {},
} = {}) {
    return new Promise((resolve, reject) => {
        // 1. 创建 xhr 对象
        const xhr = new XMLHttpRequest()

        // 2. 设置监听
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response)
            } else {
                reject({ status: xhr.status, statusText: xhr.statusText })
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
    })
}