function Person(name, age, height, address) {
    this.name = name
    this.age = age
    this.height = height
    this.address = address

    this.eating = function() {
        console.log(this.name + 'eating~')
    }

    this.running = function() {
        console.log(this.name + 'running~')
    }
}

var p1 = new person('zhangsan', 18, 188, 'beijing')

console.log(p1)