// const xxx = require('xxx')

const fs = require('fs')
const path = require('path')
const { Script } = require('vm')

function my_require(fileName) {
    const fileContent = fs.readFileSync(path.resolve(__dirname, fileName), 'utf-8')

    const wrapped = `(function(require, module, exports) {
        ${fileContent}
    })`
    console.log('wrapped', wrapped)

    const scripts = new Script(wrapped, {
        filename: 'index.js'
    })
    console.log('scripts', scripts)

    const module = {
        exports: {}
    }
    const func = scripts.runInThisContext() 
    console.log('func', func)

    func(my_require, module, module.exports)

    return module.exports
}

global.my_require = my_require

my_require('./module01.js')
console.log('module000000', module)

