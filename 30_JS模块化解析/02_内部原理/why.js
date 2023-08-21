const info = {
    name: 'why',
    age: 18,

    foo: function() {
        console.log('foo 函数')
    }
}

setTimeout(() => {
    console.log('info.name', info.name)
}, 2000)

module.exports = info