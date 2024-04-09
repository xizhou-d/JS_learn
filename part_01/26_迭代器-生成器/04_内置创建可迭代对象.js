// const names = ['abc', 'cba', 'nba']

// console.log(names[Symbol.iterator])

// const iterator1 = names[Symbol.iterator]()

// console.log(iterator1.next())
// console.log(iterator1.next())
// console.log(iterator1.next())
// console.log(iterator1.next())

const set = new Set()
set.add(10)
set.add(20)
set.add(30)
set.add(40)

console.log(set[Symbol.iterator])

const setIterator = set[Symbol.iterator]()

console.log(setIterator.next())
console.log(setIterator.next())
console.log(setIterator.next())
console.log(setIterator.next())
console.log(setIterator.next())

// for (const item of set) {
//     console.log('item', item)
// }

// function foo(x, y, z) {
//     for (const item of arguments) {
//         console.log('item', item)
//     }
// }

// foo(10, 20, 30, 40, 50)
