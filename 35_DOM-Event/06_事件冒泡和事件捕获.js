const spanEl = document.querySelector('.content')

const divEl = document.querySelector('#box')

spanEl.addEventListener('click', function() {
    console.log('事件冒泡：span 被点击')
}, false)

divEl.addEventListener('click', function() {
    console.log('事件冒泡：divEl 被点击')
}, true)

document.body.addEventListener('click', function() {
    console.log('事件冒泡：body 被点击')
}, false)