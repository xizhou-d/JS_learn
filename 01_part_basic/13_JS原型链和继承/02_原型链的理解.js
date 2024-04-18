var obj = {
    name: 'why',
    age: 28
}

obj.__proto__ = {
    address: 'beijing'
}

console.log('obj.address', obj.address)

console.log(obj.__proto__.__proto__.__proto__)