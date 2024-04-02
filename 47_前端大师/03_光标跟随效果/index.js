const textContainer = document.querySelector('.text-container')
const textElem = document.querySelector('.text')
const cursor = document.querySelector('.cursor')

async function autoAppend() {
    function delay(ms) {
        return new Promise((resolve, reject) => setTimeout(resolve, ms))
    }
    function transformer(text) {
        return text
    }

    let content = '我们不想探究vue-router或者react-router们的实现，因为不管是哪种路由无外乎用兼容性更好的hash实现或者是H5 History实现，与框架几个只需要做相应的封装即可。'

    for (let i = 0; i < content.length; i++) {
        console.log('i', i)
        let text = content.slice(0, i)
        let result = transformer(text)

        textElem.innerHTML = result
        updateCursor();
        await delay(100)
    }
}

autoAppend()

function getLastTextNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
        return node
    }

    const children = node.childNodes;
    for (let i = children.length - 1; i >=0; i--) {
        let result = getLastTextNode(children[i])

        if (result) {
            return result
        }
    }
    return null
}

function updateCursor() {
    // 1. 找到最后一个文本节点
    const lastTextNode = getLastTextNode(textElem)
    // 2. 加文字
    const tempText = document.createTextNode('⭕️')
    if (lastTextNode) {
        lastTextNode.parentNode.appendChild(tempText)
    } else {
        textElem.appendChild(tempText)
    }
    // 3. 根据文字设置光标位置
    const range = document.createRange()
    range.setStart(tempText, 0)
    range.setEnd(tempText, 0)
    // 新增的文本节点相对于视口的位置
    const rect = range.getBoundingClientRect()
    // textElem 相对于视口的位置
    const textRect = textContainer.getBoundingClientRect()
    const x = rect.left - textRect.left
    const y = rect.top - textRect.top
    console.log(rect, textRect)
    cursor.style.transform = `translate(${x}px, ${y}px)`
    // 4. 删文字
    tempText.remove()
}