// const jumpBtn = document.querySelector('#jump')

// jumpBtn.onclick = function() {
//     // location.href = './demo.html'

//     // 跳转，不刷新网页
//     history.pushState({name: 'xizhou'}, "", '/detail')

//     // history.replaceState({name: 'xizhou'}, "", '/detail')
// }



// 经典面试题 


var x = 0

// 当函数的参数有默认值时，会形成一个新的作用域，这个作用城用于保存参数的信，函数作用于在参数作用于中被包含
function foo(x, y = function() { x=3; console.log('x', x)}) {
    console.log(x)

    var x = 2
    y()
    console.log(x)
}

foo()
console.log(x)