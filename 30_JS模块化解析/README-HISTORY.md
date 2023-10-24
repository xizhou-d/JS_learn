## JS模块化
### 1.不得不说的历史
#### 背景
JS本身就是为了简单页面的设计:
页面动画、表单提交，并不会内置任何命名空间或者模块化相关的概念
> 随着业务的飞速的飞速扩张，针对JS的模块化涌现出了大量的解决方案V
#### 幼年期:无模块化
1，开始需要在页面中增加不同类型的js文件，如: 动画js、验证js、格式化js多种js为了维护和可读性，被分在了不同的js文件中
3，不同的文件在同一个模版中被引用
```js
    <script src="jquery.js"></script>
    <script src="main.js"></script>
    <script src"deps1.js"></script>
    <script src="deps2.js"></script>
```
认可:
相比于使用一个js文件去包含所有逻辑，这种多个js文件实现最简单初步的模块化，思想是进步的

问题开始出现:
* 污染全局作用域。每一个模块都是暴露在全局的，协调每一个模块变量函数名称都不可以相同不利于大型项目的分工开发与维护

#### 成长期：模块化的雏形 -- IIFE
##### 作用于的把控
* 例子：
```js
    // 定义全局变量
    let count = 0;
    const increase = () => ++count;
    const reset = () => {
        count = 0;
        console.log('hahaha count is reset');
    }
```

* 利用函数作用域限制
```js
    (() => {
        let count = 0
        const increase = () => ++count;
        const reset = () => {
            count = 0;
            console.log('hahaha count is reset');
        }
    })

    // 仅仅定义了一个函数，但里面的代码并没有执行，如何能够对其原来的逻辑呢？
    (() => {
        let count = 0
        const increase = () => ++count;
        const reset = () => {
            count = 0;
            console.log('hahaha count is reset');
        }
    })();
```
完成了一个模块的封装，实现了对外暴露功能，保留变量 + 不污染全局作用域

* 尝试定义一个简单的模块
```js
    const iifeCounterModule = (() => {
        let count = 0

        return {
            increase = () => ++count,
            reset = () => {
                count = 0;
                console.log('hahaha count is reset');
            }
        }
    })();

    iifeCounterModule.increase()
    iifeCounterModule.reset()
```

> 如果依赖其他的模块呢？
```js
    const iifeCounterModule = ((dependencyModule1, dependencyModule2) => {
        let count = 0
        const increase = () => ++count;
        const reset = () => {
            count = 0;
            console.log('hahaha count is reset');
        }
    })(dependencyModule1, dependencyModule2);
```

** 面试题1: 了解早期 jquery 的依赖处理以及模块加载方案吗？
iife + 传参调配

实际书写上，jquery 等框架实际应用会涉及到 revealing 写法
```js
    const iifeCounterModule = (() => {
        let count = 0

        const increase = () => ++count
        const reset = () => {
                count = 0;
                console.log('hahaha count is reset');
            }
        return {
            increase,
            reset
        }
    })();
```
本质实现与方案上并无不同，只是在写法思想上，更强调 所有API一局部变量的形式定义在函数中，而仅仅对外暴露出可被调用的接口

#### 成熟期：
##### CJS module: CommonJs
> node.js制定 特征：

* 通过module + exports来对外暴露接口
* require来调用其他模块

模块组织方式
```js
    // commonJSCounterModule.js
    const dependencyModule1 = require('./dependencyModule1');
    const dependencyModule2 = require('./dependencyModule2');

    let count = 0;
    const increase = () => ++count;
    const reset = () => {
        count = 0;
        console.log('hahaha count is reset');
    };

    exports.increase = increase;
    exports.reset = reset;

    module.exports = {
        increase,
        reset
    }

    // main.js
    const { increase, reset } = require('./commonJSCounterModule')
    increase();

    const commonJSCounterModule = require('./commonJSCounterModule')
    commonJSCounterModule.increase(); 
```

实际执行处理
```js
    (function(exports, require, module, __filename, __dirname) {
        const dependencyModule1 = require('./dependencyModule1');
        const dependencyModule2 = require('./dependencyModule2');

        let count = 0;
        const increase = () => ++count;
        const reset = () => {
            count = 0;
            console.log('hahaha count is reset');
        };
        module.exports = {
            increase,
            reset
        };

        return module.exports;
    }).call(thisValue, exports, require, module, filename, dirname);

    (function (exports, require, module, __filename, __dirname) {
        const commonJSCounterModule = require('./commonJSCounterModule')
        commonJSCounterModule.increase();
    }).call(thisValue, exports, require, module, filename, dirname); 
```
优点： CommonJS规范在服务器端率先完成了JavaScript的模块化，解决了依赖、全局变量污染的问题，这也是js运行在服务端运行的必要条件
缺点： 由于服务端以及commonjs是同步加载模块的 新的问题：异步

##### AMD 规范
> 非同步加载模块，允许制定回调函数
经典的实现框架 require.js

新增了定义的方式
```js
    // 通过 define 来定义一个模块，然后 require 加载
    /**
     * define([module-name?], [array-of-dependencies?], [module-factory-or-object]);
     * module-name: 模块标识，可以省略。
     * array-of-dependencies: 所依赖的模块，可以省略。
     * module-factory-or-object: 模块的实现，或者一个JavaScript对象。
     */

    define(id, [depends], callback)
    require(module, callback)
```
模块的定义方式：
```js
    define('amdCounterModule', [dependencyModule1, dependencyModule2], (dependencyModule1, dependencyModule2) => {
        let count = 0;
        const increase = () => ++count;
        const reset = () => {
            count = 0;
            console.log('hahaha count is reset');
        }

        return {
            increase,
            reset
        }
    })

    require('amdCounterModule', amdCounterModule => {
        amdCounterModule.increase()
        amdCounterModule.reset()
    })
```

** 面试题2: 如果想在 AMD 中使用 require 同步加载模块可以吗？
AMD 支持向前兼容的，以提供回调的方式动态加载模块
```js
    define(require => {
        const dependecyModule1 = require('dependecyModule1')
        const dependecyModule2 = require('dependecyModule2')

        let count = 0;
        const increase = () => ++count;
        const reset = () => {
            count = 0;
            console.log('hahaha count is reset');
        }

        // return {
        //     increase,
        //     reset
        // }

        exports.increase = increase
        exports.reset = reset
    })
```

** 面试题3：有没有什么方式可以统一兼容 AMD 和 common
UMD 的出现
```js
    (define => define((require, exports, module) {
        const dependecyModule1 = require('dependecyModule1')
        const dependecyModule2 = require('dependecyModule2')
        let count = 0;
        const increase = () => ++count;
        const reset = () => {
            count = 0;
            console.log('hahaha count is reset');
        }

        module.exports = {
            increase,
            reset
        }
    }))
    (
        // 是否是 common 的方式
        typeof module === 'object' && module.exports && typeof define !== 'function'
            ? // CommonJS
                factory => module.exports = factory(require, exports, module)
            : // AMD
                define
    )
```
* 优点： 适合在浏览器里面异步加载模块，同时又已采用 common 模块
* 缺点： 提高了开发成本，不能按需加载，必须提前加载所有依赖

##### CMD 规范
> 应用于可优化方案中，代表：sea.js
特征：支持按需加载

```js
    define(function(require, exports, module) {
        var $ = require('jquery')
        var dependecyModule1 = require('dependecyModule1')

        let count = 0;
        const increase = () => ++count;
        const reset = () => {
            count = 0;
            console.log('hahaha count is reset');
        }

        module.exports = {
            increase,
            reset
        }
    })
```


** 面试题：AMD 和 CMD 的区别？
```js
    // AMD
    define([
        './dependecyModule1',
        './dependecyModule2'
    ], function(dependecyModule1, dependecyModule2) {
        dependecyModule1.increase()
        dependecyModule2.reset()
    })

    // CMD 依赖就近
    define(
        function(require, exports, module) {
            let dependecyModule1 = require('./dependecyModule1')
            dependecyModule1.increase()

            if () {
                let dependecyModule2 = require('./dependecyModule2')
                dependecyModule2.increase()
            }
        }
    )
```

#### ES6 模块化
新增定义方式
引入： import
导出： export

模块引入、导出和定义的地方
```js
    import dependecyModule1 from './dependecyModule1'
    import dependecyModule2 from './dependecyModule1'

    let count = 0

    export increase = () => ++count
    export reset = () => {
        count = 0;
        console.log('hahaha count is reset');
    }

    ||

    export default {
        increase,
        reset
    }
```

** 面试题： 动态模块的加载
```js
    import('./esmodule').then(({ increase, reset }) => {
        increase()
        reset()
    })

    import('./esmodule').then(dynamicESModule => {
        dynamicESModule.increase()
        dynamicESModule.reset()
    })
```

### 解决模块化的新思路
#### 背景
根本问题： 运行时的分析依赖
> 前端的模块化处理方案，依赖于运行时进行分析，并且同时进行依赖加载处理以及实际的逻辑执行

解决方案：线下执行
```js
    project
        | - lib
            | - xms.js
        | - mods
            | - a.js
            | - b.js
            | - c.js
            | - d.js
            | - e.js
            | - f.js
        | - index.html

    // index.html
    <!Doctype html>
    <script src="lib/xmd.js"></script>
    <script>
        {/* 等待构建工具生成数据替换 `__FRAMEWORK_CONFIG__` */}
        require.config(__FRAMEWORK_CONFIG__)
    </script>
    <script>
        {/* 业务代码 */}
        require.async(['a', 'e'], function(a, e) {
            // ...
        })
    </script>

    // mods/a.js 
    define('a', function(require, exports, module) {
        let b = require('b')
        let c = require('c')

        exports.run = function() {
            // ...
        }
    })

    // 工程化模块的构建
    // 1. 扫描生成依赖关系
    {
        'a': ['b', 'c'],
        'b': ['d']
    }

    // 2. 生成构建模版
    <!Doctype html>
    <script src="lib/xmd.js"></script>
    <script>
        {/* 等待构建工具生成数据替换 `__FRAMEWORK_CONFIG__` */}
        require.config({
            {
                'a': ['b', 'c'],
                'b': ['d']
            }
        })
    </script>
    <script>
        {/* 业务代码 */}
        require.async(['a', 'e'], function(a, e) {
            // ...
        })
    </script>

    // 3. 转化配置为依赖加载代码
    define('a', ['b', 'c'], function(require, exports, module) {
        let name = _check ? 'b' : 'c'
        let mod = require(name)
        exports.run = function() {
            // ...
        }
    })

    /**
     * 前端的编译在编译什么： 工程化的替换和操作
     */
```


#### 究极体 webpack
知识体系：上游 执行&作用于&原理 => 模块化 => 工程化
