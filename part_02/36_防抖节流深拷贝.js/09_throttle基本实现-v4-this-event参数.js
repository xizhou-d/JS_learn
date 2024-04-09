function throttle(fn, interval, options = { leading: true, trailing: false}) {
    const { leading, trailing } = options

    let lastTime = 0
    let timer = null

    const _throttle = function(...args) {
        const nowTime = new Date().getTime()

        if (lastTime === 0 & !leading) lastTime = nowTime
        const remainTime = interval - (nowTime - lastTime)
        if (remainTime <= 0) {
            if (timer) {
                clearTimeout(timer)
                timer = null
            }
            fn.apply(this, args)
            lastTime = nowTime
            return
        }

        if (trailing && !timer) {
            timer = setTimeout(() => {
                timer = null
                lastTime = !leading ? 0 : new Date().getTime()
                fn.apply(this, args)
            }, remainTime)
        }
    }

    _throttle.cancel = function() {
        console.log('CANCEL')
        if (timer) clearTimeout(timer)
        timer = null
        lastTime = 0
    }
 
    return _throttle
}