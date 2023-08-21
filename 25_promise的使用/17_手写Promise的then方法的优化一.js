const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFELLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected '

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

        exector(resolve, reject)
    }

    then(onfulfilled, onrejected) {
        // 将成功回调和失败回调放到数组中
        if (this.status === PROMISE_STATUS_FULFELLED && onfulfilled) {
            onfulfilled(this.value)
        }
        if (this.status === PROMISE_STATUS_REJECTED && onrejected) {
            console.log('***********', this.reason)
            onrejected(this.reason)
        }
        if (this.status === PROMISE_STATUS_PENDING) {
            this.onFulfilledCallbacks.push(onfulfilled)
            this.onRejectedCallbacks.push(onrejected)
        }
    }
}

const promise = new HYPromse((resolve, reject) => {
    resolve(1111111)
    reject('reject message')
})

promise.then((res) => {
    console.log('res', res)
}, (error) => {
    console.log('error', error)
})

promise.then((res1) => {
    console.log('res1', res1)
}, (error1) => {
    console.log('error1', error1)
})

setTimeout(() => {
    promise.then(res2 => {
        console.log('res2', res2)
    }, error2 => {
        console.log('error2', error2)
    })
}, 1000)