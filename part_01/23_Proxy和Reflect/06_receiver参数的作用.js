const obj = {
    _name: 'why',
    get name() {
        return this._name
    },
    set name(newValue) {
        this._name = newValue
    }
}

const objProxy = new Proxy(obj, {
    get: function(target, key, receiver) {
        // receiver 就是创建出来的 objProxy 对象本身  receiver === objProxy, 可以改变 get 方法中的 this 指向
        // console.log('receiver', receiver)
        // console.log('receiver === objProxy', receiver === objProxy)
        console.log('访问')
        return Reflect.get(target, key, receiver)
    },
    set: function(target, key, newValue, receiver) {
        console.log('设置')
        Reflect.set(target, key, newValue, receiver)
    }
})

objProxy.name = 'xizhou'
// console.log(objProxy.name)