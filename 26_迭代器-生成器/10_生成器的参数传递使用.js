function* foo(num) {
    console.log('函数开始执行……')

    const v1 = 100 * num
    console.log('第一段代码', v1)
    const n = yield v1
    console.log('NNNNNNNNNN', n)

    const v2 = 200 * n
    console.log('第二段代码', v2)
    const count = yield v2

    const v3 = 300 * count
    console.log('第三段代码', v3)
    yield v3

    console.log('函数执行结束……')
    return 123
}

// 生成器上的 next 方法可以传递参数
const generator = foo(5)

console.log(generator.next())

console.log(generator.next())

console.log(generator.next(100))

// 生成器是可以抛出异常的
