class Person {

}

console.log(Person.prototype)
console.log(Person.__proto__ === Function.prototype)

console.log('typeof Person', typeof Person) // function

var p = new Person()
console.log(p.__proto__ === Person.prototype)