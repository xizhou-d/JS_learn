// 父类：公共的属性和方法
function Person(name, age, friends) {
    this.name = name
    this.age = age
    this.friends = friends
}

Person.prototype.eating = function() {
    console.log(this.name + ' eating~')
}

// 子类：特有的属性和方法
function Student(name, age, friends, sno) {
    Person.call(this, name, age, friends)
    this.sno = sno
}

Student.prototype = new Person()

Student.prototype.studying = function() {
    console.log(this.name + ' studying~')
}

var stu = new Student('xizhou', 29, ['jiangtaixu'], 111111)

console.log('stu', stu)