# web worker

在 Web 应用程序中，web Worker 是一项后台处理技术在此之前，JavaScript 创建的 Web 应用程序中，因为所有的处理都是在单线程内执行的，所以如果脚本所需运行时间太长，
程序界面就会长时间处于停止状态，甚至当等待时间超出一定的限度，浏览器就会进入假死的状态。为了解决这个问题，HTML5 新增加了一个 web Worker API。使用这个 API，
用户可以很容易的创建在后台运行的线程，这个线程被称之为 Worker。如果将可能耗费较长时间的处理交给后台来执行，则对用户在前台页面中执行的操作没有影响。
web Worker 的特点如下:
- 通过加载一个JS 文件来进行大量复杂的计算，而不挂起主进程。通过 postMessage 和 onMessage 进行通信。
- 可以在 Worker 中通过importScripts(url) 方法来加载JavaScript 脚本文件。
- 可以使用 setTimeout()，clearTimeout()，setInterval() 和 clearInterval() 等方法。
- 可以使用 XMLHttpRequest 进行异步请求。
- 可以访问 navigator 的部分属性。
- 可以使用 JavaScript 核心对象。

除了上述的优点，web Worker 本身也具有一定局限性的，具体如下
- 不能跨域加载 JavaScript
- Worker 内代码不能访问 DOM
- 使用 Web Worker 加载数据没有 /SONP 和 Ajax加载数据高效
目前来看，web Worker 的浏览器兼容性还是很不错的，基本得到了主流浏览器的一致支持.


在开始使用 web Worker 之前，我们先来看一下使用 Woker 时会遇到的属性和方法，如下
- self: self 关键值用来表示本线程范围内的作用域,
- 向创建线程的源窗口发送信息。postMessage( ):
- onMessage:获取接收消息的事件句柄
- importScripts(urls): Worker 内部如果要加载其他脚本，可以使用该方法来导入其它JavaScript 脚本文件。参数为该脚本文件的 URL 地址，导入的脚本文件必须使用该线程文件的页面在同一个域中，并在同一个端口中。

例如:
```js
    // 导入了 3个 JavaScript 脚本
    importScripts("workerl.js","worker2.js","worker3.js");
```
