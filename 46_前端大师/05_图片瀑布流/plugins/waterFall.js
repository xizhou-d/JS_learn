if (!window?.myPlugins) {
    window.myPlugins = {}
}

/**
 * 创建一个图片瀑布流
 */

window.myPlugins.createWaterFall = function(option) {
    const defaultOption = {
        minHGap: 10,
        minVGap: 15,
        imgSrcs: srcs, //数组存放图片的路径
        imgWidth: 220,
        container: document.body
    }
    // 不能用 container.children 获取图片列表，因为里面可能有其他的元素，因此需要用变量保存
    const imgArr = []
    option = Object.assign({}, defaultOption, option)

    // 处理父元素是否是定位元素，如果不是定位元素，需要将父元素转化为定位元素
    function handleParentElementToPostion() {
        const style = getComputedStyle(option.container)
        if (style.position === 'static') {
            option.container.style.position = 'relative'
        }
    }

    // 创建图片元素，并将其放置在父元素中
    function createImgElement() {
        const debounce = myPlugins.debounce(setImgPosition, 20)
        for (let i = 0; i < option.imgSrcs.length; i++) {
            const img = document.createElement('img')
            img.src = option.imgSrcs[i]
            img.style.width = option.imgWidth + 'px'
            img.style.position = 'absolute'
            img.style.transition = '.5s' // 设置动画
            img.onload = debounce
            option.container.appendChild(img)
            imgArr.push(img)
        }
    }

    // 设置图片的定位
    function setImgPosition() {
        console.log('aaaaaaaaaa')
        const info = getHorizontalInfo()
        const arr = new Array(info.number).fill(0)
        // 循环设置 图片的坐标
        imgArr.forEach((img, i) => {
            const minTop = Math.min.apply(null, arr)
            img.style.top = minTop + 'px'
            // 获取最小top的 index
            const minIndex = arr.indexOf(minTop)
            // 因为图片加载是异步的，因此这里获取的 img.clientHeight 一直是 0
            arr[minIndex] = minTop + img.clientHeight + option.minVGap
            // 横坐标
            img.style.left = minIndex * (option.imgWidth + info.gap) + 'px'
        })

        // 此时容器高度塌陷了，因为 图片都是 绝对定位的
        const height = Math.max.apply(null, arr)
        option.container.style.height = height - option.minVGap + 'px'
    }

    function getHorizontalInfo() {
        const obj = {}

        // 获取容器宽度
        obj.containerWidth = option.container.clientWidth
        // 计算当前容器宽度可以容纳多少张图片
        // x * 220 + (x - 1) * minwidth = containerWidth
        obj.number = (obj.containerWidth + option.minHGap) / (option.minHGap + option.imgWidth)
        obj.number = Math.floor(obj.number)
        // number 入股是浮点数，需要向下取整，并且重新计算 option.minHGap
        obj.gap = (obj.containerWidth - obj.number * option.imgWidth) / (obj.number - 1)

        return obj
    }

    // 窗口尺寸变化
    const debounce = myPlugins.debounce(setImgPosition, 300)
    window.onresize = debounce

    handleParentElementToPostion()
    createImgElement()
    
}