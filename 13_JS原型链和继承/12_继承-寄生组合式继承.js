function createObject(o) {
    function Fn() {}

    Fn.prototype = o
    return new Fn()
}

function inheritPrototype(SubType, SuperType) {
    // SubType.prototype = Object.create(SuperType.prototype)
    SubType.prototype = createObject(SuperType.prototype)

    Object.defineProperty(SubType.prototype, 'constructor', {
        configurable: true,
        enumerable: false,
        writable: true,
        value: SubType
    })
}

function Person(name, age, friends) {
    this.name = name
    this.age = age
    this.friends = friends
}

Person.prototype.running = function() {
    console.log(this.name + ' running~')
}

Person.prototype.eating = function() {
    console.log(this.name + ' eating~')
}

function Student(name, age, friends, sno, score) {
    Person.call(this, name, age, friends)
    this.sno = sno
    this.score = score
}

// Student.prototype = Object.create(Person.prototype)

// Object.defineProperty(Student.prototype, 'constructor', {
//     configurable: true,
//     enumerable: false,
//     writable: true,
//     value: Student
// })

inheritPrototype(Student, Person)

Student.prototype.studying = function() {
    console.log(this.name + ' studying~')
}

var stu = new Student('xizhou', 22, ['dongzhou'], 111, 99)
console.log('stu', stu)
console.log('stu.__proto__', stu.__proto__)
console.log('stu.__proto__', stu.__proto__.__proto__)

// stu.running()
// stu.eating()
// stu.studying()
