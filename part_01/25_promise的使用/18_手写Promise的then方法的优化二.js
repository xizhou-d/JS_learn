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

class HYPromse {
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
        return new HYPromse((resolve, reject) => {
            // 将成功回调和失败回调放到数组中
            if (this.status === PROMISE_STATUS_FULFELLED && onfulfilled) {
                // try {
                //     const value = onfulfilled(this.value)
                //     resolve(value)
                // } catch(error) {
                //     reject(error)
                // }
                execFuncWithCatchError(onfulfilled, this.value, resolve, reject)
            }
            if (this.status === PROMISE_STATUS_REJECTED && onrejected) {
                // try {
                //     const reason = onrejected(this.reason)
                //     resolve(reason)
                // } catch(error) {
                //     reject(error)
                // }
                execFuncWithCatchError(onrejected, this.reason, resolve, reject)
            }
            if (this.status === PROMISE_STATUS_PENDING) {
                this.onFulfilledCallbacks.push(() => {
                    // try {
                    //     const value = onfulfilled(this.value)
                    //     resolve(value)
                    // } catch(error) {
                    //     reject(error)
                    // }
                    execFuncWithCatchError(onfulfilled, this.value, resolve, reject)
                })
                this.onRejectedCallbacks.push(() => {
                    // try {
                    //     const reason = onrejected(this.reason)
                    //     resolve(reason)
                    // } catch(error) {
                    //     reject(error)
                    // }
                    execFuncWithCatchError(onrejected, this.reason, resolve, reject)
                })
            }
        })
    }
}

const promise = new HYPromse((resolve, reject) => {
    // resolve(1111111)
    reject('reject message')
    // throw new Error('resolve throw error')
})

promise.then(res1 => {
    console.log('res1', res1)
    // throw new Error('89989898989')
    return 'uuuuuu'
}, error1 => {
    console.log('error1', error1)
    return 'iiiiii'
}).then(res2 => {
    console.log('res2', res2)
}, error2 => {
    console.log('error2', error2)
})

