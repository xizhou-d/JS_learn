// 带 {} 叫做命名导出
import { name, age, foo } from './foo.js'
// import 导入的的代码没有被解析完之前，之后的代码是不会运行的（相当于是一种同步的代码）



// import 作为函数使用返回的结果是一个 promise 
import('./foo.js').then(res => {
    console.log('res', res)
})
console.log(11111111)





// es11 行增的特性
// meta 属性本身也是一个对象： { url: ‘当前模块所在的路径’}
console.log(import.meta)

