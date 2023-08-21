function isObject(value) {
    const valueType = typeof value
    return (value !== null) && (valueType === 'object' || valueType === 'function')
}

function deepClone(originValue) {
    // 判断传入的 originValue 是否是一个对象
    if (!isObject(originValue )) {
        return originValue
    }
    const newObj = {}

    for (let key in originValue) {
        newObj[key] = deepClone(originValue[key])
    }

    return newObj
}

const obj = {
    name: 'why',
    age: 18,
    friends: {
        name: 'xizhou'
    }
}

const newObj = deepClone(obj)

console.log('nowObj', newObj)
obj.friends.name = 'dongzhou'
obj.friends.address = 'beijing'
console.log('nowObj', newObj)
