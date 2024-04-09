// 传统的面向对象多态有三个前提
// 1. 必须有继承
// 2. 必须有重写（子类重写父类方法）
// 3. 必须有父类引用指向子类对象

// Shape 形状
class Shape {
    getArea() {

    }
}

class Rectangle extends Shape {
    getArea() {
        return 100
    }
}

class Circle extends Shape {
    getArea() {
        return 200
    }
}

var r = new Rectangle()
var c = new Circle()


function calcArea(shape) {
    console.log(shape.getArea())
}

// 多态：当对不同的数据类型执行同一个操作时，如果变现出来的行为不一样，就是多态的体现
calcArea(r)
calcArea(c)