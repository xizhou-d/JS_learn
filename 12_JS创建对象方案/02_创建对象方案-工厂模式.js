// 工厂模式：工厂函数
function createPerson(name, age, height, address) {
    var p = {}
    p.name = name
    p.age = age
    p.height = height
    p.address = address

    p.eating = function() {
        console.log(this.name + 'eating~.')
    }

    p.running = function() {
        console.log(this.name + 'running~.')
    }

    return p
}

var p1 = createPerson('xizhou', 18, 188, 'luoyang')
var p2 = createPerson('hanfeizi', 23, 184, 'haoguo')
var p3 = createPerson('lisi', 32, 183, 'daqin')

// 工程模式的缺点(获取不到对象最真实的类型)
console.log(p1, p2, p3)