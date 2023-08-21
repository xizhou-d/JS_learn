const obj = {
    name: 'why', 
    age: 18,
    friends: [
        'kobe',
        'xizhou'
    ],
    hobbies: ['lanqiu', 'zuqiu'],
    // toJSON: function() {
    //     return 989302
    // }
}

// 将上面的对象转化成 json 字符串
// 1. 直接转化
const jsonString1 = JSON.stringify(obj)
console.log('jsonString1', jsonString1)


// 2. stringify 的第二个参数 replacer
// 2.1 传入数组，设定那些需要转换
const jsonString2 = JSON.stringify(obj, ["name", "friends"])
console.log('jsonString2', jsonString2)

// 2.2 传入回调函数
const jsonString3 = JSON.stringify(obj, (key, value) => {
    if (key === 'age') {
        return value + 1
    }
    return value
})
console.log('jsonString3', jsonString3)

// 2.3 第三个参数
const jsonString4 = JSON.stringify(obj, null, '****')
console.log('jsonString4', jsonString4)

// 4. 如果 obj 中有 toJSON 方法