function* foo(num) {
    console.log('函数开始执行……')

    const v1 = 100 * num
    console.log('第一段代码', v1)
    const n = yield v1

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
const generator = foo(3)

// 1. 第一段代码的执行
console.log(generator.next())

// 2. 第二段代码的执行, 使用了 return
// 那么就意味着，在第一段代码的后面加上 return，就会提前终止生成器函数代码继续执行
// console.log(generator.return(15))
console.log(generator.next())
console.log(generator.next())
console.log(generator.next())
console.log(generator.next())
console.log(generator.next())
console.log(generator.next())
console.log(generator.next())
console.log(generator.next())

