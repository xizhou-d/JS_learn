const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFELLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected '

// 工具函数
function execFuncWithCatchError(execFn, value, resolve, reject) {
    try {
        const result = execFn(value)
        resolve(result)
    } catch (error) {
        reject(error)
    }
}

class HYPromise {
    constructor(exector) {
        this.status = PROMISE_STATUS_PENDING
        this.value = undefined
        this.reason = undefined
        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []

        const resolve = (value) => {
            queueMicrotask(() => {
                if (this.status === PROMISE_STATUS_PENDING) {
                    this.status = PROMISE_STATUS_FULFELLED
                    this.value = value

                    // 执行传入 then 的第一个函数
                    this.onFulfilledCallbacks.forEach(fn => {
                        fn(this.value)
                    })
                }
            })
        }

        const reject = (reason) => {
            queueMicrotask(() => {
                if (this.status === PROMISE_STATUS_PENDING) {
                    this.status = PROMISE_STATUS_REJECTED
                    this.reason = reason

                    // 执行传入 then 的第二个函数
                    this.onRejectedCallbacks.forEach(fn => {
                        fn(this.reason)
                    })
                }
            })
        }

        try {
            exector(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    then(onfulfilled, onrejected) {
        onrejected = onrejected || (error => { throw error})
        onfulfilled = onfulfilled || (value => {
            console.log('VALUE', value)
            return value
        })

        return new HYPromise((resolve, reject) => {
            // 将成功回调和失败回调放到数组中
            if (this.status === PROMISE_STATUS_FULFELLED && onfulfilled) {
                execFuncWithCatchError(onfulfilled, this.value, resolve, reject)
            }
            if (this.status === PROMISE_STATUS_REJECTED && onrejected) {
                execFuncWithCatchError(onrejected, this.reason, resolve, reject)
            }
            if (this.status === PROMISE_STATUS_PENDING) {
                if (onfulfilled) this.onFulfilledCallbacks.push(() => {
                    execFuncWithCatchError(onfulfilled, this.value, resolve, reject)
                })
                if (onrejected) this.onRejectedCallbacks.push(() => {
                    execFuncWithCatchError(onrejected, this.reason, resolve, reject)
                })
            }
        })
    }

    catch(onrejected) {
        return this.then(undefined, onrejected)
    }

    finally(onFinally) {
        this.then(() => {
            onFinally()
        }, () => {
            onFinally()
        })
    }

    static resolve(res) {
        return new HYPromise((resolve, reject) => {
            resolve(res)
        })
    }

    static reject(error) {
        return new HYPromise((resolve, reject) => {
            reject(error)
        })
    }
}

HYPromise.resolve('hello world').then(res => {
    console.log('res', res)
})

HYPromise.reject('reject message').catch(error => {
    console.log('error', error)
})

