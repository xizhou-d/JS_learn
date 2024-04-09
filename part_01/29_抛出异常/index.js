
function foo() {
    console.log('11111111')
    console.log('22222222')
    console.log('33333333')
    throw new Error('错误信息')
    console.log('44444444')
    console.log('55555555')
    console.log('66666666')
}

function test() {
    try {
        foo()
    } catch(error) {
        console.log('error.name', error.name)
        console.log('**********************')
        console.log('error.message', error.message)
        console.log('**********************')
        console.log('error.stack', error.stack)
    } finally {
        console.log('finally 代码。')
    }
}

function bar() {
    test()
    console.log('BAR_______')
}

bar()