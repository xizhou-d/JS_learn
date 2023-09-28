Function.prototype.myCall = function(thisArg, ...args) {
    const fn = this

    // 考虑传入的 thisArg 是基本类型需要转化成对象类型，null 和 undefined 返回 window
    thisArg = (thisArg === null || thisArg === undefined) ? window : Object(thisArg)

    thisArg.fn = fn
    let result = thisArg.fn(...args)
    delete thisArg.fn
    
    return result
}

Function.prototype.myApply = function(thisArg, argsArr) {
    const fn = this

    thisArg = (thisArg === null || thisArg === undefined) ? window : Object(thisArg)

    thisArg.fn = fn
    let result = thisArg.fn(...argsArr)
    delete thisArg.fn

    return result
}

Function.prototype.myBind = function(thisArg, ...args) {
    const fn = this

    thisArg = (thisArg === null || thisArg === undefined) ? window : Object(thisArg)

    function proxyFn(...newArgs) {
        thisArg.fn = fn
        const finalArgs = [...args, ...newArgs]
        let result = thisArg.fn(...finalArgs)
        delete thisArg.fn
        
        return result
    }

    return proxyFn
}

function foo() {
    console.log('foo 函数被执行', this)
}

function sum(num1, num2) {
    console.log('sum 被执行了', this, num1, num2)
    return num1 + num2
}

function sumForTestBind(num1, num2, num3, num4) {
    console.log('sum 被执行了', this, num1, num2, num3, num4)
    return num1 + num2 + num3 + num4
}

// foo.myCall({}, 10, 20)
// foo.myApply({}, [10, 20])

// foo.myCall(null, 10, 20)
// foo.myApply(null, [10, 20])

// foo.myCall(undefined, 10, 20)
// foo.myApply(undefined, [10, 20])

// foo.myCall({name: 'xizhou'}, 10, 20)
// foo.myApply({name: 'xizhou'}, [10, 20])

// console.log(sum.myCall('abc', 10, 20))
// console.log(sum.myApply('abc', [10, 20]))


// const bar = foo.myBind('abc', 10, 20)
// bar()

const newSum = sumForTestBind.bind('aaa', 10, 20)
console.log(newSum(30, 40))


