function* foo() {
    console.log('代码开始执行')

    const v1 = 100
    try {
        yield v1
    } catch(error) {
        console.log('捕获到异常情况', error)
    }

    console.log('第二段代码继续执行')
    const v2 = 200
    yield v2

    console.log('代码执行结束')
}

const generator = foo()

console.log(generator.next())

console.log(generator.throw('Something is wrong.'))

// console.log(generator.next())