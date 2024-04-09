// 1. 导入方式一： 普通的导入
// import { name, age, foo, Person } from './foo.js'
// import { fName, fAge, fFoo, FPerson } from './foo.js' // 导出时有用到 as 起别名，这里需要使用别名


// 2. 导入方式二：起别名
// 导入的时候如果有命名冲突的话就起一个别名
// import { name as fName, age as fAge, foo as Ffoo, Person as FPerson } from './foo.js'

// const name = 'main'

// console.log('fName', fName)
// console.log('fAge', fAge)

// fFoo()


// 3. 导入方式三： 将导出的所有内容放到一个标识符中
import * as fooModule from './foo.js'

console.log(fooModule.fName)

