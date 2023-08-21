// 案例：创建一个🧑‍🏫类，这个类创建出来的对象都是可迭代对象
class ClassRoom {
    constructor(address, name, students) {
        this.name = name
        this.address = address
        this.students = students
    }

    entry(newStudent) {
        this.students.push(newStudent )
    }

    [Symbol.iterator]() {
        let index = 0
        return {
            next: () => {
                if (index < this.students.length) {
                    return { value: this.students[index++], done: false}
                } else {
                    return { value: undefined, done: true}
                }
            },
            return: () => {
                console.log('迭代器提前终止了～')
                return { done: true, value: undefined}
            }
        }
    }
}

const classroom1 = new ClassRoom('3幢5機205"', '计算机教室', ['laozi', 'shijiamoni','jiangziya', 'yaoguang'])
classroom1.entry('yesu')

for (const stu of classroom1) {
    console.log('stu', stu)
    // break 会触发 return 函数
    if (stu === 'jiangziya') break
}