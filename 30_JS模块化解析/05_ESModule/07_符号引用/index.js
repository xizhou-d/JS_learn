import { count, increment } from './count.js'
import * as counter from './count.js'

const { count: c } = counter
increment()

console.log('counter', counter)
console.log('count', count)
console.log('counter.count', counter.count)
console.log('c', c)