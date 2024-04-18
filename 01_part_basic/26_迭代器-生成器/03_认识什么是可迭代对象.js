const iterableObj = {
    names: ['abc', 'cba', 'nba'],
    [Symbol.iterator]: function createArrayIterator(arr) {
        let index = 0
        return {
            next: () => {
                if (index < this.names.length) {
                    return { done: false, value: this.names[index++]}
                } else {
                    return { done: true, value: undefined}
                }
            }
        }
    }
}

// iterableObj 就是一个可迭代对象
// console.log(iterableObj[Symbol.iterator])
// const iterator = iterableObj[Symbol.iterator]()
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())
// console.log(iterator.next())

// const obj = {
//     name: 'why',
//     age: 18
// }
for (let item of iterableObj) {
    console.log('item', item)
}
