// 边看视频边练习，该部分没有分文件
// const finalizationRegistry = new FinalizationRegistry((value) => {
//     console.log('有对象被销毁了', value)
// })

// let obj = {
//     name: 'why'
// }

// let info = new WeakRef(obj)


// finalizationRegistry.register(obj, 'obj')
// obj = null

// setTimeout(() => {
//     console.log('info', info.deref())
// }, 50000)

let info = {
    name: 'why',
    // foo: function() {
    //     console.log('foo 函数被调用')
    // }
}

info &&= info.name