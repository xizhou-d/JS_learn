const name = 'xizhou'
const age = 18

function foo() {
    console.log('foo function exection')
}

class Person {}

export {
    name,
    age,
    // 默认导出方式一
    // foo as default,
    person
}

// 默认导出方式二
export default foo
