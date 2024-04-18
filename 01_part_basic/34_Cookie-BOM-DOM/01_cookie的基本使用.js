// window.addEventListener('scroll', function() {
//     console.log('window.scrollX', window.scrollX)
//     console.log('window.scrollY', window.scrollY)
// })

// console.log('outerHeight', outerHeight)
// console.log('innerHeight', innerHeight)

// const scrollBtn = document.querySelector('button')

// scrollBtn.onclick = function() {
//     window.scrollTo({ top: 100 })

//     window.close()

//     window.open('http://wwww.baidu.com', '_self')
// }

// window.onload = function() {
//     console.log('window 窗口加载完毕')
// }

// window.onfocus = function() {
//     console.log('窗口获取了焦点')
// }

// window.onblur = function() {
//     console.log('窗口失去了焦点')
// }

// window.onhashchange = function() {
//     console.log('hash 发生了改变')
// }

// const hashChangeBtn = document.querySelector('#hashChange')
// hashChangeBtn.onclick = function() {
//     location.hash = '#aaaaaa'
// }
// const clickHandler = () => {
//     console.log('window 发生了点击')
// }
// window.addEventListener('click', clickHandler)


// setTimeout(() => {
//     window.removeEventListener('click', clickHandler)
// }, 5000)

window.addEventListener('xizhou', () => {
    console.log('监听到了 xizhou 事件')
})

window.dispatchEvent(new Event('xizhou'))