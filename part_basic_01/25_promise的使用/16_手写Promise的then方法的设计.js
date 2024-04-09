const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFELLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected '

class HYPromse {
    constructor(exector) {
        this.status = PROMISE_STATUS_PENDING
        this.value = undefined
        this.reason = undefined

        const resolve = (value) => {
            console.log('this.status', this.status, this.status === PROMISE_STATUS_PENDING)
            if (this.status === PROMISE_STATUS_PENDING) {
                this.status = PROMISE_STATUS_FULFELLED
                queueMicrotask(() => {
                    this.value = value

                    // 执行传入 then 的第一个函数
                    this.onFulfilled(this.value)
                })
            }
        }

        const reject = (reason) => {
            if (this.status === PROMISE_STATUS_PENDING) {
                this.status = PROMISE_STATUS_REJECTED
                queueMicrotask(() => {
                    this.reason = reason

                    // 执行传入 then 的第二个函数
                    this.onRejected(this.reason)
                    console.log('bbbbbbb', this.status)
                })
            }
        }

        exector(resolve, reject)
    }

    then(onfulfilled, onrejected) {
        this.onFulfilled = onfulfilled
        this.onRejected = onrejected
    }
}

const promise = new HYPromse((resolve, reject) => {
    console.log('exectore 被执行了')
    reject('reject message')
    resolve(1111111)
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