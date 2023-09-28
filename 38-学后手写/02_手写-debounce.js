function debounce(fn, delay, immediate = false) {
    let timer = null
    let invoke = false

    function _debounce(...args) {
        if (timer) clearTimeout(timer)

        if (immediate && !invoke) {
            fn.apply(this, args)
            invoke = true
        } else {
            timer = setTimeout(() => {
                fn.apply(this, args)
                timer = null
                invoke = false
            }, delay)
        } 
    }

    return _debounce
}