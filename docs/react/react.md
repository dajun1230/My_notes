# 基础
## React介绍

**React简介:**

React起源于Facebook的内部项目，该公司积极尝试引入HTML5技术用来架设Instagram网站，开发中发现HTML5的性能下降明显，达不到预期的效果。他们就自己开发了React框架。

[ReactJS官方地址](https://facebook.github.io/react/)   

[GitHub地址](https://github.com/facebook/react)   

**react特点：**
1. 虚拟DOM: React也是以数据驱动的，每次数据变化React都会扫码整个虚拟DOM树，自动计算与上次虚拟DOM的差异变化，然后针对需要变化的部分进行实际的浏览器DOM更新。
2. 组件化： React可以从功能角度横向划分，将UI分解成不同组件，各组件都独立封装，整个UI是由一个个小组件构成的一个大组件，每个组件只关系自身的逻辑，彼此独立。
3. 单项数据流：React设计者认为数据双向绑定虽然便捷，但在复杂场景下副作用也是很明显，所以React更倾向于单向的数据流动-从父节点传递到子节点。（使用ReactLink也可以实现双向绑定，但不建议使用）

## 环境搭建和HelloWorld程序
如果不考虑工程化的问题，React的运行基础环境非常简单，只需要在HTML文件中引入两个js文件（react.min.js和react-dom.min.js）即可开始工作
**搭建开发环境**

下载所需文件

首先我们访问https://facebook.github.io/react/,在页面中单击网页左上角的React版本（课程录制时是v15.6.1）。点击后下载两个文件。

1. react.js：实现React核心逻辑，且于具体的渲染引擎无关，从而可以跨平台公用。如果应用要迁移到React Native，这一部分逻辑是不需要改变的。
2. react-dom.js：包含了具体的DOM渲染更新逻辑，以及服务端渲染的逻辑，这部分就是与浏览器相关的部分了。
``` js
// Hello World程序
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <div id="reactContainer"></div>
        <script src="./common/react.js"></script>
        <script src="./common/react-dom.js"></script>
        <script>
            var HelloComponent = React.createClass({
                render: function() {
                    return React.createElement('h1',null,'Hello world');
                    // React.createElement()里面有多个参数，其中，前两个标签内容固定，第一个参数代表“标签”，第二个参数代表“标签内的内容”，为空则为填写null，有值则为对象，以后的参数代表“双标签内部的内容”，多个以逗号隔开。
                }
            });
    
            ReactDOM.render(
                React.createElement(HelloComponent,null),
                document.getElementById('reactContainer')
            )
        </script>
    </body>
</html>
```
React.createClass

它的作用是注册一个组件类HelloComponent,这个组件类只包含一个render函数，该函数通过调用React.createElement实现了以下HTML内容：
``` js
<h1>Hello world</h1>
```

ReactDOM.render()

ReactDOM.render是React的最基本方法，用于将模板转为HTML语言，并插入指定的DOM节点。

## 初识JSX语法
JSX即Javascript XML，它使用XML标记来创建虚拟DOM和声明组件。第02节的HelloWorld程序从本质上能完成所有的工作。只是有一些开发效率问题，比如JavaScript代码与标签混写在一起、缺乏模板支持等。而使用JSX，则可以有效解决这些问题。

**加入JSX语法支持**

如果要使用JSX语法的支持，你可以使用Babel来进行转换，但是为了讲解方便我们这里直接引入Babel的核心文件 browser.min.js。你可以去网上提供的静态资源库引用（http://www.bootcdn.cn/），也可以自己下载。

**重写HelloWorld**
``` js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="./common/react.js"></script>
    <script src="./common/react-dom.js"></script>
    <script src="http://cdn.bootcss.com/babel-core/5.8.38/browser.min.js"></script>
</head>
<body>
    <div id="reactContainer"></div>
    // 注意要写上type="text/babel"
    <script type="text/babel">
        var HelloComponent =React.createClass({
            render:function(){
                return <h1>Hello {this.props.name?this.props.name:'world'}</h1>;
            }
        });
 
        ReactDOM.render(
            <HelloComponent name="jspang" />,
            document.getElementById('reactContainer')
        )
    </script>
</body>
</html>
```
::: danger 注意
需要注意的是表达式不支持if…else这样的语句，但是支持三元运算符和二元运算符。
:::