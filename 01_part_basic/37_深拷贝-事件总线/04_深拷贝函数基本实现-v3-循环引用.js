function isObject(value) {
    const valueType = typeof value
    return (value !== null) && (valueType === 'object' || valueType === 'function')
}

// const map = new Map()

function deepClone(originValue, map = new WeakMap()) {
    // 判断是否是 Set 类型
    if (originValue instanceof Set) {
        return new Set([...originValue])
    }
    // 判断是否是 Map leix
    if (originValue instanceof Map) {
        return new Map([...originValue])
    }
    // 判断是否是 symbol 类型
    if (typeof originValue === 'symbol') {
        return Symbol(originValue.description)
    }
    // 判断是否是函数: 深拷贝是函数用的是同一个
    if (typeof originValue === 'function') {
        return originValue
    }
    // 判断传入的 originValue 是否是一个对象
    if (!isObject(originValue )) {
        return originValue
    }
    if (map.has(originValue)) {
        return map.get(originValue)
    }
    // 判断传入的是数组，还是对象
    const newObj = Array.isArray(originValue) ? [] : {}

    map.set(originValue, newObj)

    for (let key in originValue) {
        newObj[key] = deepClone(originValue[key], map)
    }

    // 用 Symbol 作为 key的，不能被 for 遍历到，对 Symbol 的 key 做特殊处理
    const symbolKeys = Object.getOwnPropertySymbols(originValue)
    for (const symbolKey of symbolKeys) {
        newObj[symbolKey] = deepClone(originValue[symbolKey])
    }

    return newObj
}

const s1 = Symbol('aaa')
const s2 = Symbol('bbb')
const s3 = Symbol('ccc')
const s4 = Symbol('ddd')

const obj = {
    name: 'why',
    age: 18,
    friends: {
        name: 'xizhou'
    },
    hobbies: ['abc', 'cba', 'nba'],
    foo: function() {
        console.log('foo function')
    },
    [s1]: '999',
    [s3]: '8888',
    [s4]: '00000',
    s2: s2,
    // Set/Map
    set: new Set(['aaa', 'bbb', 'ccc']),
    map: new Map([['aaa', 'AAA'], ['bbb', 'BBB'], ['ccc', 'CCC']]),
}
obj.info = obj

const newObj = deepClone(obj)

// console.log('nowObj111111', newObj)
// console.log('****************')
// obj.hobbies.push('bbc')
// console.log('****************')
// console.log('obj', obj)
// console.log('****************')
// console.log('nowObj22222', newObj)
// console.log('****************')
// console.log('obj.s2 === newObj.s2', obj.s2 === newObj.s2)
console.log('newObj.info.info.info.info', newObj.info.info.info.info)
