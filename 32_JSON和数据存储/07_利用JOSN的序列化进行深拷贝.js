const obj = {
    name: 'why', 
    age: 18,
    friends: [
        'kobe',
        'xizhou'
    ],
    hobbies: ['lanqiu', 'zuqiu'],
    foo: function() {
        console.log('foo exex.')
    }
}

// 将 obj 对象中的内容都放到 info 变量中
const jsonString = JSON.stringify(obj)
console.log('jsonString', jsonString)
const info3 = JSON.parse(jsonString)

obj.friends = ['hanfeizi', 'jiangziyas']
console.log('obj', obj)
console.log('info3', info3)