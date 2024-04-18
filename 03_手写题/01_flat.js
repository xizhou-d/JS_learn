const arr = [1, [2, 3, [4, 5, [8, 9]]], 1, 2, [6, 7]]

function flat(arr) {
    const result = []

    function _flat(arr) {
        arr.forEach(item => {
            if (Array.isArray(item)) {
                _flat(item)
            } else {
                result.push(item)
            }
        })
    }

    _flat(arr)
    
    return result
}

console.log(flat(arr))