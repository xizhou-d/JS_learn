// 1. 导出方式一：
// import { sum, sub } from './math.js'
// import { formatTime, formatPrice } from './format.js'

// export {
//     sum,
//     sub,
//     formatPrice,
//     formatTime
// }





// 2. 导出方式二
export { sum, sub } from './math.js'
export { formatTime, formatPrice } from './format.js'




// 3. 导出方式三
export * from './math.js'
export * from './format.js'