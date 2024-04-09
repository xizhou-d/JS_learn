// var obj1 = {}
// var obj2 = new Object()

// function Person() {

// }

// var p1 = new Person()

var obj = {
    name: 'xizhou',
    age: 29
}

// obj.__proto__ === Object.prototype // true
// console.log(obj.__proto__)
// console.log(Object.prototype)
// console.log(obj.__proto__ === Object.prototype)

console.log(Object.getOwnPropertyDescriptors(Object.prototype))