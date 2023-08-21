class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }

    running() {
        console.log(this.name + ' running.')
    }

    eating() {
        console.log(this.name + ' eating.')
    }

    personMethod() {
        console.log("处理逻辑一")
        console.log("处理逻辑二")
        console.log("处理逻辑三")
        console.log("处理逻辑四")
    }

    // 静态方法也会被子类继承
    static staticMethod() {
        console.log('personStaticMethod')
    }
}

class Student extends Person {
    constructor(name, age, sno) {
        super(name, age)
        this.sno = sno
    }

    // 类对父类方法的重写
    running() {
        console.log('Student: ' + this.name + ' running.')
    }

    // 重写 personMethod 方法，但是又需要用到父类里面的 personMethod 方法
    personMethod() {
        // console.log("处理逻辑一")
        // console.log("处理逻辑二")
        // console.log("处理逻辑三")
        // console.log("处理逻辑四")
        // 使用 super 复用父类里面的逻辑
        super.personMethod()

        console.log("处理逻辑五")
        console.log("处理逻辑六")
        console.log("处理逻辑七")
        console.log("处理逻辑八")
    }

    // 重写静态方法
    // static staticMethod() {
    //     super.staticMethod()
    //     console.log('StudentStaticMethod')
    // }
}

var stu = new Student('why', 28, 111)
// console.log(stu)
// stu.running()

console.log(Object.getOwnPropertyDescriptors(stu.__proto__))
console.log(Object.getOwnPropertyDescriptors(stu.__proto__.__proto__))
stu.personMethod()
Student.staticMethod()

// console.log(Object.getOwnPropertyDescriptors(Person.prototype))
// console.log(Object.getOwnPropertyDescriptors(Person))
// console.log(Object.getOwnPropertyDescriptors(Student))

// console.log(Object.getOwnPropertyDescriptors(Object.getPrototypeOf(stu)))