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

    static all(promises) {
        return new HYPromise((resolve, reject) => {
            const values = []
            promises.forEach(promise => {
                promise.then(res => {
                    values.push(res)

                    if (values.length === promises.length) {
                        resolve(values)
                    }
                }, error => {
                    reject(error)
                })
            })
        })
    }

    static allSettled(promises) {
        return new HYPromise((resolve, reject) => {
            const results = []
            promises.forEach(promise => {
                promise.then(res => {
                    console.log('1111')
                    results.push({status: PROMISE_STATUS_FULFELLED, value: res})

                    if (results.length === promises.length) {
                        resolve(results)
                    }
                }, error => {
                    console.log('0000')
                    results.push({status: PROMISE_STATUS_REJECTED, value: error})

                    if (results.length === promises.length) {
                        resolve(results)
                    }
                })
            })
        })
    }

    static race(promises) {
        return new HYPromise((resolve, reject) => {
            promises.forEach(promise => {
                // promise.then(res => {
                //     resolve(res)
                // }, error => {
                //     reject(error)
                // })

                // 优化
                promise.then(resolve, reject)
            })
        })
    }

    static any(promises) {
        return new HYPromise((resolve, reject) => {
            const reasons = []
            promises.forEach(promise => {
                promise.then(resolve, error => {
                    reasons.push(error)
                    if (reasons.length === promises.length) {
                        reject(new AggregateError(reasons))
                    }
                })
            })
        })
    }
}

const p1 = new HYPromise((resolve, reject) => {
    setTimeout(() => reject(11111), 1000)
})

const p2 = new HYPromise((resolve, reject) => {
    setTimeout(() => reject(22222), 2000)
})

const p3 = new HYPromise((resolve, reject) => {
    setTimeout(() => reject(33333), 3000)
})

HYPromise.any([p1, p2, p3]).then(res => { 
    console.log('res', res)
}).catch(error => {
    console.log('error', error)
})

