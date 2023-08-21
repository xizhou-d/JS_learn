const obj = {
    name: 'why',
    age: 18
}

const objProxy = new Proxy(obj, {
    get: function(target, key, receiver) {
        console.log('get-----------')
        return Reflect.get(target, key)
    },
    set: function(target, key, value, receiver) {
        console.log('set-----------')
        Reflect.set(target, key, value)
    }
})

console.log('obhProxy.name', objProxy.name)

objProxy.name = 'xizhou'

console.log('obhProxy.name', objProxy.name)

