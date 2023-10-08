// 1. 首先获取一个 WebSocketServer 实例
const WebSocketServer = require('ws').Server

// 2. 创建 WebSocket 服务器
const wss = new WebSocketServer({
    port: 3000
})

// 3. 该数组用于保存所有的客户端连接实例
const clients = []

// 4. 当客户端连接上 websocket 服务器的时候
//    就会触发 connection 事件，该客户端的实例就会传入此回调函数
wss.on('connection', function(client) {
    // 将当前客户端连接实例保存到数组 clients 中
    clients.push(client)
    console.log(`当前有 ${clients.length} 个客户端在线`)

    // 给传入进来的客户端连接实例绑定一个 message 事件
    client.on('message', function(msg) {
        console.log('收到的消息 msg: ', msg)
        // 接下来需要将接收到的消息推送给所有的客户端
        for (var c of clients) {
            if (c !== client) {
                c.send(msg.toString())
            }
        }
    })

    client.on('close', function() {
        // 关闭标签页之后，将改客户端从数组中移除
        let index = clients.indexOf(this)
        clients.splice(index, 1)
    })
})

console.log('websocket 服务器已启动')