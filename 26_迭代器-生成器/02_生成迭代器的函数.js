// const names = ['abc', 'cba', 'nba']

// const numbers = [10, 20, 30, 40, 50]

// function createArrayIterator(arr) {
//     let index = 0
//     return {
//         next: function() {
//             if (index < arr.length) {
//                 return { done: false, value: arr[index++]}
//             } else {
//                 return { done: true, value: undefined}
//             }
//         }
//     }
// }

// const namesIterator = createArrayIterator(names)
// console.log(namesIterator.next())
// console.log(namesIterator.next())
// console.log(namesIterator.next())
// console.log(namesIterator.next())
// console.log(namesIterator.next())
// console.log(namesIterator.next())
// console.log(namesIterator.next())
// console.log('*********************')
// console.log('*********************')

// const numbersIterator = createArrayIterator(numbers)
// console.log(numbersIterator.next())
// console.log(numbersIterator.next())
// console.log(numbersIterator.next())
// console.log(numbersIterator.next())
// console.log(numbersIterator.next())
// console.log(numbersIterator.next())
// console.log(numbersIterator.next())

// 创建一个无限的迭代器
function createNumIterator() {
    let index = 0

    return {
        next: function() {
            return { done: false, value: index++}
        }
    }
}

const numIterator = createNumIterator()
console.log(numIterator.next())
console.log(numIterator.next())
console.log(numIterator.next())
console.log(numIterator.next())
console.log(numIterator.next())
console.log(numIterator.next())
console.log(numIterator.next())
console.log(numIterator.next())
console.log(numIterator.next())