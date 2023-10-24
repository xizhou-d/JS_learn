// 此代码疑问汇总：https://zhuanlan.zhihu.com/p/480562535

const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFILLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected'

class YPromise {
    constructor(exector) {
        // 1. 默认状态
        this.status = PROMISE_STATUS_PENDING
        // 2. 维护内部成功和失败的值
        this.value = undefined
        this.reason = undefined
        // 3. 存放成功的回调
        this.onFullfilledCallbacks = []
        // 4. 存放失败的回调
        this.onRejectedCallbacks = []

        const resolve = (value) => {
            queueMicrotask(() => {
                if (this.status === PROMISE_STATUS_PENDING) {
                    this.status = PROMISE_STATUS_FULFILLED
                    this.value = value

                    this.onFullfilledCallbacks.forEach(fn => {
                        fn(value)
                    })
                }
            })
        }

        const reject = (reason) => {
            queueMicrotask(() => { 
                if (this.status = PROMISE_STATUS_PENDING) {
                    this.status = PROMISE_STATUS_REJECTED
                    this.reason = reason

                    this.onFullfilledCallbacks.forEach(fn => {
                        fn(reason)
                    })
                }
            })
        }

        try {
            exector(resolve, reject)
        } catch(error) {
            reject(error)
        }
    } 

    then(onfulfilled, onrejected) {
        // 边缘检测: 
        // 1. onfulfilled, onrejected 必须是函数; 
        // 2. 如果 onfulfilled, onrejected 不是函数需要做处理 => onfulfilled 转换成函数， onrejected 直接跑出了 error
        onfulfilled
            = typeof onfulfilled === 'function'
                ? onfulfilled
                : value => value

        onrejected
            = typeof onrejected === 'function'
                ? onrejected
                : error => { throw error }

        if (this.status === PROMISE_STATUS_FULFILLED) {
            onfulfilled(this.value)
        }

        if (this.status === PROMISE_STATUS_REJECTED) {
            onrejected(this.reason)
        }

        if (this.status === PROMISE_STATUS_PENDING) {
            this.onFullfilledCallbacks.push(onfulfilled)
            this.onRejectedCallbacks.push(onrejected)
        }

        const promise2 = new YPromise((resolve, reject) => {
            if (this.status === PROMISE_STATUS_FULFILLED) {
                try {
                    let x = onfulfilled(this.value)
                    this.resolvePromise(promise2, x, resolve, reject)
                } catch(error) {
                    reject(error)
                }
            }
    
            if (this.status === PROMISE_STATUS_REJECTED) {
                try {
                    let x = onrejected(this.reason)
                    this.resolvePromise(promise2, x, resolve, reject)
                } catch(error) {
                    reject(error)
                }
            }
    
            if (this.status === PROMISE_STATUS_PENDING) {
                this.onFullfilledCallbacks.push(() => {
                    try {
                        let x = onfulfilled(this.value)
                        this.resolvePromise(promise2, x, resolve, reject)
                    } catch(error) {
                        reject(error)
                    }
                })
                this.onRejectedCallbacks.push(() => {
                    try {
                        let x = onrejected(this.reason)
                        this.resolvePromise(promise2, x, resolve, reject)
                    } catch(error) {
                        reject(error)
                    }
                })
            }
        })

        return promise2
    }

    resolvePromise(promise2, x, resolve, reject) {
        if (promise2 === x) {
            throw error(new TypeError('Chaining cycle detected for promise'))
        }

        let called = false
        if (x instanceof YPromise) {
            x.then(y => {
                this.resolvePromise(promise2, y, resolve, reject)
            }, error => {
                reject(error)
            })
        } else if (x !== null && typeof (x === 'object' || typeof x === 'function')) {
            try {
                let then = x.then
                if (typeof then === 'function') {
                    then.call(x, y => {
                        if (called) return
                        called = true
                        this.resolvePromise(promise2, y, resolve, reject)
                    }, error => {
                        reject(error)
                    })
                } else {
                    if (called) return
                    called = true
                    resolve(x)
                }
            } catch (error) {
                if (called) return
                called = true
                reject(error)
            }
        } else {
            resolve(x)
        }
    }
}