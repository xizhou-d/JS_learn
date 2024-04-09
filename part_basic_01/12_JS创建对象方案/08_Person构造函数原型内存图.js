function Person() {

}

var p1 = new Person()
var p2 = new Person()

// console.log(p1.__proto__ === p2.__proto__)

// console.log('p1.name', p1.name)

// p1.__proto__.name = 'why'
Person.prototype.name = 'James'
console.log('p1.name', p1.name)

