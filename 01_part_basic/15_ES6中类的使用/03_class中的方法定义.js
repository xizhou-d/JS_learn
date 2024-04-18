var names = ['abc', 'cba', 'nba']

class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
        this._address = 'beijing'
    }

    eating() {
        console.log(this.name + ' eating.')
    }

    running() {
        console.log(this.name + ' running.')
    }

    // 类的访问器方法
    get address() {
        console.log('拦截访问操作')
        return this._address
    }

    set address(val) {
        console.log('拦截设置操作')
        this._address = val
    }

    // 类的静态方法
    static randomPerson() {
        var nameIndex = Math.floor(Math.random() * names.length)
        var name = names[nameIndex]
        var age = Math.floor(Math.random() * 100)
        console.log('name, age', name, age)

        return new Person(name, age)
    }
}

// var p1 = new Person('xizhou', 21)
// console.log(p1.__proto__)
// console.log(Person.prototype)
// console.log(Object.getOwnPropertyDescriptors(p1.__proto__))

// console.log('p1.address00', p1.address)
// p1.address = 'shanghai city'
// console.log('p1.address11', p1.address)

// for (var i = 0; i < 50; i++) {
//     console.log(Person.randomPerson())
// }

console.log('Person', Person)
console.log(Object.getOwnPropertyDescriptors(Person))