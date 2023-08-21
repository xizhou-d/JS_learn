function Person(name, age, height, address) {
    this.name = name
    this.age = age
    this.height = height
    this.address = address
}

Person.prototype.eating =  function() {
    console.log(this.name + ' eating~')
}

Person.prototype.running = function() {
    console.log(this.name + ' running~')
}

var p1 = new Person('xizhou', 29, 175, 'luoyang')
var p2 = new Person('lifu', 21, 172, 'beijing')

p1.eating()
p2.eating()