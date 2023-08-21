// 当遇到 yield 停止执行
// 当遇到 return 之后的函数就不会再执行了

function* foo() {
    console.log('函数开始执行……')

    const v1 = 100
    console.log('第一段代码', v1)
    yield v1

    const v2 = 200
    console.log('第二段代码', v2)
    yield v2

    const v3 = 300
    console.log('第三段代码', v3)
    yield v3

    console.log('函数执行结束……')
    return 123
}

// yiele v 后面的表达式的值就是每次执行 next()的 时候的返回值 { done: false, value: v}, 如果 yield 后面没有表达式那么调用 next() 的时候返回的是 {done: true, value: undefined}
// generator 本质上是一个特殊的迭代器
const generator = foo()
console.log('返回值: ', generator.next())
console.log('返回值: ', generator.next())
console.log('返回值: ', generator.next())
console.log('返回值: ', generator.next())