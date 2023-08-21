// 生成器替代迭代器
function* createArrayIterator(arr) {
    // 1. 第一种写法
    // yield 'abc'
    // yield 'cba'
    // yield 'nba'

    // 2. 第二种写法
    // for (const item of arr) {
    //     yield item
    // }

    // 3. 第三种写法: yield* 后面跟一个可迭代对象，这种写法是第二种写法的语法糖，会自动迭代里面的每一项，并返回
    yield* arr
}

// const names = ['abc', 'cba', 'nba']
// const namesIterator = createArrayIterator(names)

// console.log(namesIterator.next())
// console.log(namesIterator.next())
// console.log(namesIterator.next())
// console.log(namesIterator.next())

// 2. 创建一个函数，这个函数可以迭代一定范围内的数字
function* createRangeIterator(start, end) {
    let index = start

    // 1. 迭代器写法
    // return {
    //     next: () => {
    //         if (index < end) {
    //             return { done: false, value: index++}
    //         } else {
    //             return { done: true, undefined}
    //         }
    //     }
    // }

    // 2. 生成器代替迭代器写法
    while (index < end) {
        yield index++
    }
}
// const rangeIterator = createRangeIterator(11, 33)
// console.log(rangeIterator.next())
// console.log(rangeIterator.next())
// console.log(rangeIterator.next())
// console.log(rangeIterator.next())
// console.log(rangeIterator.next())
// console.log(rangeIterator.next())
// console.log(rangeIterator.next())
// console.log(rangeIterator.next())
// console.log(rangeIterator.next())
// console.log(rangeIterator.next())
// console.log(rangeIterator.next())
// console.log(rangeIterator.next())
// console.log(rangeIterator.next())
// console.log(rangeIterator.next())
// console.log(rangeIterator.next())
// console.log(rangeIterator.next())
// console.log(rangeIterator.next())
// console.log(rangeIterator.next())
// console.log(rangeIterator.next())
// console.log(rangeIterator.next())
// console.log(rangeIterator.next())
// console.log(rangeIterator.next())
// console.log(rangeIterator.next())
// console.log(rangeIterator.next())
// console.log(rangeIterator.next())
// console.log(rangeIterator.next())

// 3. class 案例
class Classroom {
    constructor(address, name, students) {
        this.address = address
        this.name = name
        this.students = students
      }

    entry(newStudent) {
        this.students.push(newStudent)
    }

    foo = () => {
        console.log('foo')
    }

    // [Symbol.iterator] = function*() {
    //     yield* this.students
    // }

    *[Symbol.iterator]() {
        yield* this.students
    }
}

const classroom = new Classroom('3幢5機205"', '计算机教室', ['laozi', 'shijiamoni','jiangziya', 'yaoguang'])

for (const stu of classroom) {
    console.log('stu', stu)
}