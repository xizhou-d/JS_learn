const nums = [0,1,2,3,3,0,4,2]
const target = 2

function removeElement(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === target) {
            for (let j = i + 1; j < nums.length; j++) {
                nums[j - 1] = nums[j]
            }
            console.log('nums', nums)
            i--
            nums.splice(nums.length - 1, 1)
        }
    }
    return nums
}

function removeElement1(nums, target) {
    let fastIndex = 0
    let slowIndex = 0

    while(fastIndex < nums.length) {
        if (nums[fastIndex] !== target) {
            nums[slowIndex] = nums[fastIndex]
            slowIndex++
        }
        fastIndex++
    }
    return nums
}

console.log(removeElement1(nums, target))
