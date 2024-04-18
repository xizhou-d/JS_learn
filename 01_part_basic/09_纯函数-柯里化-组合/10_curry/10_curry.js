/**
 * 
 * 柯里化函数
 * 最重要的作用是把多参数函数变为单参数函数
 */

function curry(func) {
    const args = Array.prototype.slice.call(arguments, 1)
    return function () {
        // 得到当前调用的函数的参数
        const curArgs = Array.from(arguments)
        const totalArgs = args.concat(curArgs)
        if (totalArgs.length >= func.length) {
            // 参数数量够了
            console.log(9999999, totalArgs)
            return func.apply(null, totalArgs)
        } else {
            // 参数数量不够
            totalArgs.unshift(func)
            return curry(...totalArgs)
        }
    }
}

function f(x, y, z) {
    return (x + y) * z
}

// 参数够了
// const g = curry(f, 2)

// console.log(g(3, 5))
// console.log(g(5, 6))


// 参数不够
const g = curry(f, 2)

const y = g(4)
console.log(y(7))
console.log(y(16))
