/**
 * 并发请求
 * @param {string[]} urls 待请求的 url 数组
 * @param {number} maxNum 最大并发数
 */

function concurRequest(urls, maxNum) {
    if (urls.length === 0) return Promise.resolve([])

    return new Promise((resolve) => {
        // 指向下一次请求的 URL 对应的下标
        let index = 0
        // 存储所有的请求结果
        const results = []
        // 保存已经完成的请求的数量
        let count = 0

        async function _request() {
            const i = index
            const url = urls[index]
            index++

            try {
                const res = await fetch(url)
                results[i] = res
            } catch(error) {
                results[i] = err
            } finally {
                count++
                console.log('i, index', i, index)
                if (count === urls.length) {
                    resolve(results)
                }
                if (index < urls.length) {
                    _request()
                }
            }
            console.log('results', results)
        }

        _request()
        _request()
        _request()
    })
}