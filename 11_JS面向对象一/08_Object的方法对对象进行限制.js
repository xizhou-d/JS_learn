var obj = {
    name: 'why',
    age: 18,
}

// 1. 禁止对象添加新的属性
Object.preventExtensions(obj)


obj.height = 189
obj.address = 'beijing'

console.log('obj', obj)


// 2. 禁止对象配置/删除里面的属性
Object.seal(obj)

delete obj.name
console.log('obj', obj)

// 3. 让属性不可以修改 （writable: false ）
Object.freeze(obj)
obj.name = 'kobe'
console.log('obj', obj)