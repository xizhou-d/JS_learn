const obj = {
    name: 'why',
    age: 18,
    friends: {
        name: 'xizhou'
    }
}

const info = JSON.parse(JSON.stringify(obj)) 
console.log('info', info)

obj.friends.name = 'kobe'

console.log('info', info)

