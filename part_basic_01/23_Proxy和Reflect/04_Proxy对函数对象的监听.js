function foo(arg1, arg2) {
    // console.log('arg1, arg2', arg1, arg2)
}

const fooProxy = new Proxy(foo, {
    apply: function(target, thisArg, argArray) {
        console.log('对 foo 函数进行了 apply 调用。', this)
        return target.apply(thisArg, argArray)
    },
    construct: function(target, argArray, newTarget) {
        console.log('对 foo 函数进行了 new 调用', target, argArray, newTarget)
        return new target(...argArray)
    }
})

// fooProxy.apply({}, ['abc', 'cba'])

new fooProxy('abc', 'cba')

