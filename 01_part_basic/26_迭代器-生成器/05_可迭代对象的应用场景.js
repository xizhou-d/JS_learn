const iteratorObj = {
    names: ['abc', 'cba', 'nba'],
    [Symbol.iterator]: function() {
        let index = 0
        return {
            next: () => {
                if (index < this.names.length) {
                    return { value: this.names[index++], done: false }
                } else {
                    return { value: undefined, done: true}
                }
            }
        }
    }
}

const names = ['abc', 'cba', 'nba']
const newNames = [...names, ...iteratorObj]
console.log('newNames', newNames)