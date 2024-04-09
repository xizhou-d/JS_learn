var p1 = {
    name: 'why',
    age: 18,
    height: 188,
    adress: 'beijing',
    eating: function() {
        console.log(this.name + 'eating')
    },
    running: function() {
        console.log(this.name + 'running')
    }
}

var p2 = {
    name: 'lisi',
    age: 21,
    height: 189,
    adress: 'daqin',
    eating: function() {
        console.log(this.name + 'eating')
    },
    running: function() {
        console.log(this.name + 'running')
    }
}

var p3 = {
    name: 'hanfeizi',
    age: 23,
    height: 185,
    adress: 'hanguo',
    eating: function() {
        console.log(this.name + 'eating')
    },
    running: function() {
        console.log(this.name + 'running')
    }
}