function Student(name, age) {
    this.name = name
    this.age = age
}

function Teacher() {

}

const stu = new Student('why', 18)
console.log('stu', stu)

// 执行 Student 函数中的内容，但是创建出来的对象是 Teacher 对象
const teacher = Reflect.construct(Student, ['why', 18], Teacher)
console.log('teacher', teacher)
console.log(teacher.__proto__ === Teacher.prototype)


