var obj = {
    name: 'why'
}

console.log('obj.address', obj.address)

// 到底是找到那一层对象之后停止查找了呢？
// 字面量对象的原型是 [Object: null prototype] {}
// [Object: null prototype] {} 就是顶层原型
console.log(obj.__proto__)

// obj.__proto__ => [Object: null prototype] {}
console.log(obj.__proto__.__proto__) // null