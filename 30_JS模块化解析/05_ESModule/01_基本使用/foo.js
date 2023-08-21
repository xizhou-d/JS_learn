// 1. 导出方式一： export 声明语句：  export const name = 'xizhou'

// export const name = 'xizhou'
// export const age = 18

// export function foo() {
//     console.log('foo function exection')
// }

// export class Person {

// }




// 2. 导出方式二： export 和 声明分开
/**
 * 将所有需要导出的标识符，放到export后面的 {}中
 *  注意:这里的 {}里面不是ES6的对象字面量的增强写法，{}也不是表示一个对象的; 
 *  所以: export {name: name}，是错误的写法;
 */
const name = 'xizhou'
const age = 18

function foo() {
    console.log('foo function exection')
}

class Person {}

// export {
//     name,
//     age,
//     foo,
//     person
// }




// 3. 导出方式三：第二种导出方式，在导出的时候起一个别名
export {
    name as fName,
    age as fAge,
    foo as fFoo,
    Person as FPerson
}