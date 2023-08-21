var obj = {
    name: 'kobe',
    age: 18
}

// 属性描述符是一个对象
Object.defineProperty(obj, 'height', {
    value: 1.88
})

console.log('obj', obj)
console.log('obj.height', obj.height)