function Person() {

}

var p1 = new Person()

console.log('Person.prototype', Person.prototype)
console.log('Object.getOwn^', Object.getOwnPropertyDescriptors(Person.prototype))

console.log(Person.prototype.__proto__)