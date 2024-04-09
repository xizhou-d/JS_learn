import { name, age } from './foo.js'

setTimeout(() => {
    console.log('name', name)
}, 2000);
console.log(name, age)