var data = ''   // index1.html 中 worker.port.postMessage发出的消息在这里存储
onconnect = function(event) {
    const port = event.ports[0]

    port.onmessage = function(e) {
        // event.data === get   说明需要将接收到的数据返回给客户端

        if (e.data === 'get') {
            console.log('e', e)
            port.postMessage(data)
            data = ''
        } else {
            console.log('0000000', e)
            data = e.data
        }
    }
}