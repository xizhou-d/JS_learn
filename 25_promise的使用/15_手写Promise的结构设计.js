const PROMISE_STATUS_PENDING = 'pending'
const PROMISE_STATUS_FULFELLED = 'fulfilled'
const PROMISE_STATUS_REJECTED = 'rejected '

class HYPromse {
    constructor(exector) {
        this.status = PROMISE_STATUS_PENDING
        this.value = undefined
        this.reason = undefined

        const resolve = (value) => {
            if (this.status === PROMISE_STATUS_PENDING) {
                console.log('resolve 被调用')
                this.status = PROMISE_STATUS_FULFELLED
                this.value = value
            }
        }

        const reject = (reason) => {
            if (this.status === PROMISE_STATUS_PENDING) {
                this.status = PROMISE_STATUS_REJECTED
                console.log('reject 被调用')
                this.reson = reason
            }
        }

        exector(resolve, reject)
    }
}

const promise = new HYPromse((resolve, reject) => {
    console.log('exectore 被执行了')
    reject()
    resolve()
})