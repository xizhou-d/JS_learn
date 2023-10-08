// index1.html 中的 serveceWork 发出的消息会到达这里
self.addEventListener('message', async event => {
    // 首先获取到所有注册了 service work 的客户端
    const clients = await self.clients.matchAll()

    clients.forEach(client => {
        client.postMessage(event.data.value)
    })
})