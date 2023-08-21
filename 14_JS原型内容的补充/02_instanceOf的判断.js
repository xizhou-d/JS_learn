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

function Person() {

}

function Student() {

}

inheritPrototype(Student, Person)

var stu = new Student()
console.log(stu instanceof Student) // true
console.log(stu instanceof Person) // true
console.log(stu instanceof Object) // true