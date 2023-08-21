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
        onrejected = onrejected || (error => { throw error})

        return new HYPromse((resolve, reject) => {
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
        this.then(undefined, onrejected)
    }
}

const promise = new HYPromse((resolve, reject) => {
    // resolve(1111111)
    reject('reject message')
    // throw new Error('resolve throw error')
})

promise.then(res1 => {
    console.log('res1', res1)
}).catch(error1 => {
    console.log('error1', error1)
}).then(res2 => {
    console.log('res2', res2)
})

