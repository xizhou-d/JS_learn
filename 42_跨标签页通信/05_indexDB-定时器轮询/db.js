/**
 * 创建数据库
 * @param {*} dbName 数据库名称
 * @param {*} version 数据库版本
 */
function openDB(dbName, version) {
    return new Promise((resolve, reject) => {
        var db; // 存储数据库对象
        // 打开数据库，如果没有就是创建操作
        var request = indexedDB.open(dbName, version)

        // 数据库打开或者创建成功的时候
        request.onsuccess = function(event) {
            // event.target.result 就是数据库对象，存储在变量 db 中
            db = event.target.result
            console.log('数据库打开成功')

            resolve(db)
        }

        // 数据库打开失败
        request.onerror = function() {
            console.log('数据库打开失败')
        }

        // 数据库发生更新的时候: 1. 版本号更新 2. 添加或者删除表的时候
        // 当我们第一次调用 open 方法时，会触发这个事件
        // 我们在这里来初始化我们的表
        request.onupgradeneeded = function(event) {
            db = event.target.result
            // 创建数据仓库（表）
            var objectStore = db.createObjectStore('stu', {
                keyPath: 'stuID',   // 这是主键
                autoIncrement: true // 实现自增
            })
            // 创建索引，有了索引之后，查询效率大大增加（类比新华字典）: 索引名称-列名称-是否唯一
            objectStore.createIndex('stuID', 'stuID', { unique: true })
            objectStore.createIndex('stuName', 'stuName', { unique: false })
            objectStore.createIndex('stuAge', 'stuAge', { unique: false })
        }
    })
}

/**
 * 关闭数据库
 * @param { object } dbName 数据库名称
 */
function closeDB(db) {
    db.close()
    console.log('数据库已关闭')
}

/**
 * 删除数据库
 * @param {object} dbName 数据库名称
 */
function deleteDBALL(dbName) {
    console.log('dbName', dbName)

    const deleteRequest = window.indexedDB.deleteDatabase(dbName)
    deleteRequest.onerror = function() {
        console.log('删除失败')
    }

    deleteRequest.onsuccess = function() {
        console.log('删除成功')
    } 
}

/**
 * 
 * @param {*} db 数据库实例
 * @param {*} storeName 数据仓库实例（表）
 * @param {*} data 要添加的数据
 */
function addData(db, storeName, data) {
    console.log('db', db)
    var request = db.transaction([storeName], 'readwrite') // readwrite 要小写
        .objectStore(storeName)
        .add(data)

    request.onerror = function() {
        console.log('数据写入失败')
    }
    request.onsuccess = function() {
        console.log('数据写入成功')
    }
}

/**
 * 通过主键查询数据
 * @param {*} db 数据库实例
 * @param {*} storeName 数据仓库实例（表）
 * @param {*} key 主键
 */
function getDataByKey(db, storeName, key = '') {
    return new Promise((resolve, reject) => {
        var request = db.transaction([storeName])
                        .objectStore(storeName)
                        .get(key)

        request.onsuccess = function() {
            resolve(request.result)
        }
        request.onerror = function() {
            console.log('数据查询失败')
        }
    })
}

/**
 * 通过主键查询数据
 * @param {*} db 数据库实例
 * @param {*} storeName 数据仓库实例（表）
 */
function getAllData(db, storeName) {
    return new Promise((resolve, reject) => {
        var request = db.transaction([storeName])
                        .objectStore(storeName)
                        .getAll()

        request.onsuccess = function() {
            resolve(request.result)
        }
        request.onerror = function() {
            console.log('数据查询失败')
        }
    })
}

/**
 * 通过游标 （指针） 来查询所有的数据
 * @param {*} db 
 * @param {*} storeName 
 * @returns 
 */
function cursorGetData(db, storeName) {
    return new Promise((resolve, reject) => {
        // 用于存放所有的数据
        var lists = []
        var request = db.transaction([storeName], 'readwrite')
                        .objectStore(storeName)
                        .openCursor()   // 创建一个指针游标

        request.onsuccess = function(event) {
            var cursor = event.target.result
            // 查看游标有没有返回一条数据
            if (cursor) {
                lists.push(cursor.value)
                cursor.continue()   // 移动到下一条数据
            } else {
                resolve(lists)
            }
        }
    })
}

/**
 * 根据索引来查询数据（只会返回一条数据）
 * @param {*} db 
 * @param {*} storeName 
 * @param {*} indexName 索引名称
 * @param {*} indexValue 索引值
 */
function getDataByIndex(db, storeName, indexName, indexValue) {
    return new Promise((resolve, reject) => {
        const request = db.transaction([storeName], 'readwrite')
                            .objectStore(storeName)
                            .index(indexName)
                            .get(indexValue)
        // 只是通过索引值来查询数据，只会返回满足条件的第一条数据
        request.onsuccess = function(event) {
            resolve(event.target.result)
        }
    })
}

/**
 * 根据索引和游标来查询数据
 * @param {*} db 
 * @param {*} storeName 
 * @param {*} indexName 索引名称
 * @param {*} indexValue 索引值
 */
function getDataByIndexAndCursor(db, storeName, indexName, indexValue) {
    return new Promise((resolve, reject) => {
        const lists = []    // 存储所有满足条件的数据
        const request = db.transaction([storeName], 'readwrite')
                            .objectStore(storeName)
                            .index(indexName)
                            // .openCursor(IDBKeyRange.only(indexValue))   // 等于 indexValue
                            .openCursor(IDBKeyRange.lowerBound(indexValue)) // 大于或者等于 indexValue
        // 只是通过索引值来查询数据，只会返回满足条件的第一条数据
        request.onsuccess = function(event) {
            var cursor = event.target.result

            if (cursor) {
                lists.push(cursor.value)
                cursor.continue()
            } else {
                resolve(lists)
            }
        }
    })
}


function cursorGetDataByIndexAndPage(
    db,
    storeName,
    indexName,
    indexValue,
    page,
    pageSize
) {
    return new Promise((resolve, reject) => {
        var lists = []  // 用于存储所有的当前页的数据
        var counter = 0  // 创建一个计数器
        var isSkip = true   // 是否要跳过数据


        const request = db.transaction([storeName], 'readwrite')
                            .objectStore(storeName)
                            .openCursor()   // 创建一个指针（游标）对象，最初指向第一条数据

        request.onsuccess = function(event) {
            const cursor = event.target.result
            // 这里有一个很重要的判断，判断是否要跳过一些数据
            if (page > 1 && isSkip) {
                isSkip = false

                cursor.advance((page - 1) * pageSize)   // 跳过数据
                return  // 跳过本次的 onsuccess
            }

            if (cursor) {
                lists.push(cursor.value)
                counter++

                if (counter < pageSize) {
                    cursor.continue()
                } else {
                    counter = 0
                    resolve(lists)
                }
            } else {
                resolve(lists)
            }
        }
    })
}

/**
 * 更新数据
 * @param {*} db 数据库实例
 * @param {*} storeName 仓库名称
 * @param {*} data 数据
 */
function updateData(db, storeName, data) {
    return new Promise((resolve, reject) => {
        const request = db.transaction([storeName], 'readwrite')
                            .objectStore(storeName)
                            .put(data)

        request.onsuccess = function() {
            resolve({
                status: 'true',
                msg: '更新数据成功'
            })
        }
    })
}

/**
 * 通过主键删除数据
 * @param {} db 
 * @param {*} storeName 
 * @param {*} key 
 */
function deleteData(db, storeName, key) {
    return new Promise((resolve, reject) => {
        const request = db.transaction([storeName], 'readwrite')
                            .objectStore(storeName)
                            .delete(key)
        
        request.onsuccess = function() {
            resolve({
                status: 'true',
                msg: '删除数据成功'
            })
        }
    })
}

/**
 * 通过索引和游标删除指定的数据
 * @param {*} db 
 * @param {*} storeName 
 * @param {*} indexName 
 * @param {*} indexValue 
 */
function cursorDelete(db, storeName, indexName, indexValue) {
    return new Promise((resolve, reject) => {
        const request = db.transaction([storeName], 'readwrite')
                            .objectStore(storeName)
                            .index(indexName)
                            .openCursor(IDBKeyRange.only(indexValue))

        request.onsuccess = function(event) {
            const cursor = event.target.result

            if (cursor) {
                const deleteRequest = cursor.delete()

                deleteRequest.onsuccess = function() {
                    resolve({
                        status: 'true',
                        msg: '删除数据成功'
                    })
                }

                deleteRequest.onerror = function() {
                    console.log('删除数据失败')
                }

                cursor.continue()
            }
        }
    })
}