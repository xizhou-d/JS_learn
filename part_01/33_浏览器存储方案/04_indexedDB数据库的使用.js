
// 打开数据库和数据库建立连接
const dbRequest = indexedDB.open('xizhou')

dbRequest.onerror = function(error) {
    console.log('打开数据库失败', error)
}

let db = null
dbRequest.onsuccess = function(event) {
    console.log('打开数据库成功', event)
    db = event.target.result
}

// 第一次打开或者版本发生更新
dbRequest.onupgradeneeded = function(event) {
    const db = event.target.result

    // 创建一些存储对象
    db.createObjectStore('users', { keyPath: 'id' })
}

class User {
    constructor(name, age, height, id) {
        this.name = name
        this.age = age
        this.height = height
        this.id = id
    }
}

const users = [
    new User('haifeizi', 1000, 199, 1001),
    new User('lisi', 1012, 183, 1002),
    new User('xiangyu', 900, 189, 1003),
    new User('liubang', 901, 173, 1004),
]

// 获取 btns， 监听点击事件
const btns = document.querySelectorAll('button')

for (let i = 0; i < btns.length; i++) {
    btns[i].onclick = function() {
        const transaction = db.transaction(["users"], "readwrite")
        const store = transaction.objectStore("users")
        switch(i) {
            case 0:
                console.log('点击了新增')
                for (let user of users) {
                    const request = store.add(user)
                    request.onsuccess = function() {
                        console.log(`${user.name} 插入成功`)
                    }
                }

                transaction.oncomplete = function() {
                    console.log('添加操作成功')
                }
                break
            case 1: 
                console.log('点击了删除')
                const deleteRequest = store.openCursor()
                deleteRequest.onsuccess = function(event) {
                    const cursor = event.target.result

                    if (cursor) {
                        if (cursor.key === 1004) {
                            cursor.delete()
                        } else {
                            cursor.continue()
                        }
                    }
                }
                break
            case 2:
                console.log('点击了修改')
                const modidfyRequest = store.openCursor()
                modidfyRequest.onsuccess = function(event) {
                    const cursor = event.target.result

                    if (cursor) {
                        if (cursor.key === 1002) {
                            const value = cursor.value
                            value.name = 'huangtiandi'
                            cursor.update(value)
                        } else {
                            cursor.continue()
                        }
                    }
                }
                break
            case 3:
                console.log('点击了查询')
                // 1. 查询方式一：知道主键，根据主键方式查询
                // const request = store.get(1003)
                // request.onsuccess = function(event) {
                //     console.log(event.target.result)
                // }

                // 2.  查询方式二：
                const queryRequest = store.openCursor()
                queryRequest.onsuccess = function(event) {
                    const cursor = event.target.result
                    if (cursor) {
                        console.log('cursor', cursor.key, cursor.value)
                        cursor.continue()
                    } else {
                        console.log('查询完成')
                    }
                }
                break
        }
    }
} 