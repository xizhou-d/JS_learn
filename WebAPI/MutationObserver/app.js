// 选择要观察的元素
const targetNode = document.getElementById('observedElement');

// 创建一个 MutationObserver 实例并定义回调函数
const observer = new MutationObserver((mutationsList) => {
    console.log('mutationsList', mutationsList)
    mutationsList.forEach((mutation) => {
        console.log('mutation', mutation)
        switch (mutation.type) {
            case 'childList':
                if (mutation.addedNodes.length) {
                    console.log('A child node has been added:', mutation.addedNodes[0]);
                }
                if (mutation.removedNodes.length) {
                    console.log('A child node has been removed:', mutation.removedNodes[0]);
                }
                break;
            case 'attributes':
                console.log(`The ${mutation.attributeName} attribute was modified.`);
                break;
        }
    });
});

// 配置 MutationObserver 选项
const config = { 
    childList: true, // 监听子节点的变化
    attributes: true, // 监听属性的变化
    subtree: true // 监听子元素以及后代元素
};

// 开始观察指定的节点
observer.observe(targetNode, config);

// 按钮操作：添加子节点
document.getElementById('addChild').addEventListener('click', () => {
    const newChild = document.createElement('p');
    newChild.textContent = 'New child node';
    targetNode.appendChild(newChild);
});

// 按钮操作：删除最后一个子节点
document.getElementById('removeChild').addEventListener('click', () => {
    const lastChild = targetNode.lastChild;
    if (lastChild) {
        targetNode.removeChild(lastChild);
    }
});

// 按钮操作：改变属性
document.getElementById('changeAttribute').addEventListener('click', () => {
    targetNode.setAttribute('data-example', 'newValue');
});

// 按钮操作：停止观察
document.getElementById('disconnectObserver').addEventListener('click', () => {
    observer.disconnect();
    console.log('Observer disconnected.');
});