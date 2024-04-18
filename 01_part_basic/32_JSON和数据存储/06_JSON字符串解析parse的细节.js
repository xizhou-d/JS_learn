const jsonString = '{"name":"why","age":18,"friends":["kobe","xizhou"],"hobbies":["lanqiu","zuqiu"]}'

const info = JSON.parse(jsonString, (key, value) => {
    if (key === 'age') {
        return value - 1
    } else {
        return value
    }
})
console.log('info', info)