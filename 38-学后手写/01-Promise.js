const PROMISE_STAUTS_PENDDING = 'pending'
const PROMISE_STAUTS_FULFILLED = 'fulfilled'
const PROMISE_STAUTS_REJECTED = 'rejected'

function execfunc(execFn, value, resolve, reject) {
    try {
        const result = execFn(value)
        resolve(result)
    } catch (error) {
        reject(error)
    }
}

class SPromise {
    constructor(exector) {
        this.status = PROMISE_STAUTS_PENDDING
        this.value = undefined
        this.reason = undefined
        this.onFulfilledCallbacks = []
        this.onRejectedCallbacks = []

        const resolve = (value) => {
            if (this.status === PROMISE_STAUTS_PENDDING) {
                queueMicrotask(() => {
                    if (this.status !== PROMISE_STAUTS_PENDDING) return
                    this.status = PROMISE_STAUTS_FULFILLED
                    this.value = value    
                    this.onFulfilledCallbacks.forEach(fn => {
                        fn(value)
                    })
                })
            }
        }

        const reject = (reason) => {
            if (this.status === PROMISE_STAUTS_PENDDING) {
                queueMicrotask(() => {
                    if (this.status !== PROMISE_STAUTS_PENDDING) return
                    this.status = PROMISE_STAUTS_REJECTED
                    this.reason = reason    
                    this.onRejectedCallbacks.forEach(fn => {
                        fn(reason)
                    })
                })
            }
        }

        try {
            exector(resolve, reject)
        } catch (error) {
            reject(error)
        }
    }

    then(onfulfilled, onrejected) {
        // 处理 catch 传递问题
        onrejected = onrejected || (error => {throw error})
        // 处理在上一个 then 的值不能通过 catch 继续传递
        onfulfilled = onfulfilled || (value => { 
            return value
        })

        return new SPromise((resolve, reject) => {
            /**
             * 为了实现链式调用，then 方法返回一个新的 SPromise 但是新的 SPromise resolve 和 reject 函数的参数应该来自上一个 then 中函数参数执行后的返回值
             * 因此，将 then 方法的收集，直接放到 new SPromise 的 excutor 中
             */
            if (this.status === PROMISE_STAUTS_FULFILLED && onfulfilled) {
                execfunc(onfulfilled, this.value, resolve, reject)
            }
            if (this.status === PROMISE_STAUTS_REJECTED && onrejected) {
                execfunc(onrejected, this.reason, resolve, reject)
            }
            if (this.status === PROMISE_STAUTS_PENDDING) {
                if (onfulfilled) this.onFulfilledCallbacks.push(() => {
                    execfunc(onfulfilled, this.value, resolve, reject)
                })
                if (onrejected) this.onRejectedCallbacks.push(() => {
                    execfunc(onrejected, this.reason, resolve, reject)
                })
            }
        })
    }

    catch(onrejected) {
        return this.then(undefined, onrejected)
    }

    finally(onfinally) {
        this.then((val) => {
            onfinally(val)
        }, () => {
            onfinally()
        })
    }

    static resolve(res) {
        return new SPromise((resolve, reject) => {
            resolve(res)
        })
    }

    static reject(error) {
        return new SPromise((resolve, reject) => {
            reject(error)
        })
    }

    static all(promises) {
        new SPromise((resolve, reject) => {
            const values = []
            promises.forEach(promise => {
                promise.then(res => {
                    values.push(res)
                    if (values.length === promises.length) {
                        resolve(values)
                    }
                }, (error) => {
                    reject(error)
                })
            })
        })
    }

    static allSettled(promises) {
        return new SPromise((resolve, reject) => {
            const results = []
            promise.forEach(promise => {
                promise.then(res => {
                    result.push({ status: 'fulfilled', value: res })

                    if (values.length  === promises.length) {
                        resolve(results)
                    }
                }, error => {
                    result.push({ status: 'rejected', value: error })

                    if (values.length  === promises.length) {
                        resolve(results)
                    }
                })
            })
        })
    }

    static race(promises) {
        return new SPromise((resolve, reject) => {
            promises.forEach((resolve, reject) => {
                // promise.then((res) => {
                //     resolve(res)
                // }, (error) => {
                //     reject(error)
                // })
                promise.then(resolve, reject)
            })
        })
    }

    static any(promises) {
        const reasons = []
        return new SPromise((resolve, reject) => {
            promises.forEach(promise => {
                promise.then(resolve, (err) => {
                    reasons.push(err)
                    if (reasons.length === promises.length) {
                        reject(new AggregateError(reasons))
                    }
                })
            })
        })
    }
}

const p1 = new SPromise((resolve, reject) => {
    // reject(2222)
    resolve(111)
})
  
p1.then((res) => {
    console.log('res', res)
    return 'aaa'
}, (error) => {
    console.log('error', error)
    throw new Error('skdflskjlk')
}).catch((errorC) => {
    console.log('errorC', errorC)
    return '88888888'
}).finally((final) => {
    console.log('finally', final)
})