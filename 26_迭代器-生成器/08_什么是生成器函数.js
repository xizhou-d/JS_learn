function* foo() {
    console.log('函数开始执行……')

    const v1 = 100
    console.log('第一段代码', v1)
    yield

    const v2 = 100
    console.log('第二段代码', v2)
    yield

    const v3 = 100
    console.log('第三段代码', v3)
    yield

    console.log('函数执行结束……')
}

// 调用生成器函数时，会给我们返回一个生成器对象
const generator = foo()
console.log('generator', generator)

// 开始执行第一段代码
generator.next() 
// generator.next()
// generator.next()
