const obj = {
    name: 'why', 
    age: 18,
    friends: [
        'kobe',
        'xizhou'
    ],
    hobbies: ['lanqiu', 'zuqiu']
}

const objString = JSON.stringify(obj)
console.log('objString', objString)

localStorage.setItem('obj', objString)
console.log(localStorage.getItem('obj'))

const jsonString = localStorage.getItem('obj')
console.log('jsonString', jsonString)

const info = JSON.parse(localStorage.getItem('obj'))
console.log('info', info)