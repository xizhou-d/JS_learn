// 父类：公共的属性和方法
function Person() {
    this.name = 'xizhou'
}

Person.prototype.eating = function() {
    console.log(this.name + ' eating~')
}

// 子类：特有的属性和方法
function Student() {
    this.sno = 111111
}

Student.prototype = new Person()

Student.prototype.studying = function() {
    console.log(this.name + ' studying~')
}

var stu = new Student()
console.log('stu.name', stu.name)
console.log('stu.eating()', stu.eating())
console.log('stu.studying', stu.studying())

// 原型链实现继承的弊端
// 1. 打印 stu 对象，继承的属性看不到 
console.log('stu', stu)