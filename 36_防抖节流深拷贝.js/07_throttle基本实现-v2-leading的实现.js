function throttle(fn, interval, options = { leading: true, trailing: false}) {
    const { leading, trailing } = options

    let lastTime = 0
    const _throttle = function() {
        const nowTime = new Date().getTime()

        if (lastTime === 0 & !leading) lastTime = nowTime
        const remainTime = interval - (nowTime - lastTime)
        if (remainTime <= 0) {
            fn()
            lastTime = nowTime
        }
    }
 
    return _throttle
}