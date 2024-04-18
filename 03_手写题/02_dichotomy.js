const nums = [-1,0,3,5,9,12]
const target = 9

function dichotomy(arr, target) {
    if (!arr.length > 0) return -1

    let left = 0
    let right = arr.length - 1

    while(left <= right) {
        const mid = Math.floor((left + right) / 2)
        if (arr[mid] === target) {
            return mid
        } else if (mid < target) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }

    return -1
}

const res = dichotomy(nums, -1)
console.log('res', res)