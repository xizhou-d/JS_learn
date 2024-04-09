// 创建一个对象，对一个人进行抽象（描述）
var obj = new Object()
obj.name = 'why'
obj.age = 18
obj.height = 1.88
obj.running = function() {
    console.log(this.name + 'running')
}

// 2. 创建方式二，字面量
var info = {
    name: 'kobe',
    age: 40,
    height: 198,
    eating: function() {
        console.log(this.name + 'eating')
    }
}