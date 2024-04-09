const list = document.querySelector('.list')

let sourceTarget;
list.ondragstart = function(e) {
    // 这里为什么要加 setTimeout？
    // 因为鼠标拖动着到处跑的那个元素也会变成 透明并且有 border 的，以为这个样式取决于 ondragstart 事件发生的时候原来位置的样式，因此这里加一个延迟
    setTimeout(() => {
        e.target.classList.add('moving')
    }, 0)

    sourceTarget = e.target
}

list.ondragover = function(e) {
    e.preventDefault()
}

list.ondragenter = function(e) {
    e.preventDefault()
    if (e.target === list || e.target === sourceTarget) {
        return
    }
    
    const children = [...list.children]
    // 判断是向上移动还是向下移动
    let sourceIndex = children.indexOf(sourceTarget)
    let targetIndex = children.indexOf(e.target)

    if (sourceIndex > targetIndex) {
        console.log('向上')
        list.insertBefore(sourceTarget, e.target)
    }
    if (sourceIndex < targetIndex) {
        console.log('向下')
        list.insertBefore(sourceTarget, e.target.nextElementSibling)
    }

}

list.ondragend = function(e) {
    e.preventDefault()
    console.log('e.target', e.target)
    e.target.classList.remove('moving')
}