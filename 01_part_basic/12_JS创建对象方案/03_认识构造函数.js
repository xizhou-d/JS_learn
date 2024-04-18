function foo() {
    console.log('foo')
}

// foo()
// 直接调用 foo 就是一个普通的函数

// 换一种方式调用 foo 函数：通过 new 关键字去调用一个函数，那么这个函数就是一个构造函数了
new foo

// 通过 new 去调用一个函数时，和普通的调用有什么区别呢？