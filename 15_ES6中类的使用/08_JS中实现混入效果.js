class Person {

}

class Runner {
    running() {

    }
}

class Eater {
    eating() {

    }
}

// JS 中类只能有一个父类：单继承
// class Student extends Person, Runner {}

function mixinRunner(BaseClass) {
    class NewClass extends BaseClass {
        running() {
            console.log('running~')
        }
    }

    return NewClass
}

function mixinEater(BaseClass) {
    return class extends BaseClass {
        eating() {
            console.log('eating~')
        }
    }
}

class Student extends Person {

}

const NewStudent = mixinEater(mixinRunner(Runner))
var ns = new NewStudent()
ns.eating()
ns.running()