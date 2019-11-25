# React 16.x
## React简介
> ReactJS是由Facebook在2013年5月推出的一款JS前端开源框架,推出式主打特点式函数式编程风格。

**React优点总结**

生态强大：现在没有哪个框架比React的生态体系好的，几乎所有开发需求都有成熟的解决方案。

上手简单: 你甚至可以在几个小时内就可以上手React技术，但是他的知识很广，你可能需要更多的时间来完全驾驭它。

社区强大：你可以很容易的找到志同道合的人一起学习，因为使用它的人真的是太多了。

**React三大体系**

![An image](./images/React_Three.png)

## React开发环境搭建
**安装Node.js**

Node中文网址：http://nodejs.cn/ (建议你在这里下载，速度会快很多)

需要你注意的是，一定要正确下载对应版本，版本下载错误，可是没有办法使用的哦。

Node.js 安装好以后，如果是Windows系统，可以使用 Win+R打开运行，然后输入cmd，打开终端（或者叫命令行工具）。

输入代码：
``` js
node -v 
```
如果正确出现版本号，说明Node安装成功了，需要说明的是，你的版本号可能跟我视频中的有所不同，这无关紧要。

然后再输入代码:
``` js
npm -v
```
如果正确出现版本号，说明npm也是没问题的，这时候我们的Node.js安装就算完成了。

Node安装好之后，你就可以使用npm命令来安装脚手架工具了，方法很简单，只要打开终端，然后输入下面的命令就可以了。
``` js
npm install -g create-react-app
```
**脚手架的安装**

创建第一个React项目

脚手架安装好以后，就可以创建项目了，我们在D盘创建一个ReactDemo文件夹，然后进入这个文件夹，创建新的React项目。
``` js
D:  //进入D盘
mkdir ReactDemo  //创建ReactDemo文件夹
create-react-app demo01   //用脚手架创建React项目
cd demo01   //等创建完成后，进入项目目录
npm start   //预览项目，如果能正常打开，说明项目创建成功
```
## 脚手架生成的项目目录介绍
**项目根目录中的文件**

先从进入项目根目录说起，也就是第一眼看到的文件(版本不同，可能稍有不同)

● README.md :这个文件主要作用就是对项目的说明，已经默认写好了一些东西，你可以简单看看。如果是工作中，你可以把文件中的内容删除，自己来写这个文件，编写这个文件可以使用Markdown的语法来编写。

● package.json: 这个文件是webpack配置和项目包管理文件，项目中依赖的第三方包（包的版本）和一些常用命令配置都在这个里边进行配置，当然脚手架已经为我们配置了一些了，目前位置，我们不需要改动。如果你对webpack了解，对这个一定也很熟悉。

● package-lock.json：这个文件用一句话来解释，就是锁定安装时的版本号，并且需要上传到git，以保证其他人再npm install 时大家的依赖能保证一致。

● gitignore : 这个是git的选择性上传的配置文件，比如一会要介绍的node_modules文件夹，就需要配置不上传。

● node_modules :这个文件夹就是我们项目的依赖包，到目前位置，脚手架已经都给我们下载好了，你不需要单独安装什么。

● public ：公共文件，里边有公用模板和图标等一些东西。

● src ： 主要代码编写文件，这个文件夹里的文件对我们来说最重要，都需要我们掌握。

**public文件夹介绍**

这个文件都是一些项目使用的公共文件，也就是说都是共用的，我们就具体看一下有那些文件吧。

● favicon.ico : 这个是网站或者说项目的图标，一般在浏览器标签页的左上角显示。

● index.html : 首页的模板文件，我们可以试着改动一下，就能看到结果。

● mainifest.json：移动端配置文件，这个会在以后的课程中详细讲解。

**src文件夹介绍**

这个目录里边放的是我们开放的源代码，我们平时操作做最多的目录。

● index.js : 这个就是项目的入口文件，视频中我们会简单的看一下这个文件。

● index.css ：这个是index.js里的CSS文件。

● app.js : 这个文件相当于一个方法模块，也是一个简单的模块化编程。

● serviceWorker.js: 这个是用于写移动端开发的，PWA必须用到这个文件，有了这个文件，就相当于有了离线浏览的功能。
此时，可以通过**npm start**将项目运行起来，默认端口为3000

## HelloWorld和组件的讲解
** 入口文件的编写**
``` js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
ReactDOM.render(<App />,document.getElementById('root'))
```
**App组件编写**
``` js
import React, {Component} from 'react';
// 这行代码相当于下面两行
// import React from 'react'
// const Component = React.Component
class App extends Component{
    render(){
        return (
            <div>
                Hello JSPang
            </div>
        )
    }
}
export default App;
```
## React中JSX语法简介
**JSX简介**

JSX就是Javascript和XML结合的一种格式。React发明了JSX，可以方便的利用HTML语法来创建虚拟DOM，当遇到<，JSX就当作HTML解析，遇到{就当JavaScript解析.

**组件和普通JSX语法区别**

自定义的组件必须首写字母要进行大写，而JSX是小写字母开头的。

**JSX中使用三元运算符**
``` js
import React from 'react'
const Component = React.Component


class App extends Component{
    render(){
        return (
            <ul className="my-list">
                <li>{false?'语文':'数学'}</li>
                <li>I love React</li>
            </ul>
        )
    }
}

export default App;
```
::: warning 注意
组件外层包裹原则:React要求必须在一个组件的最外层进行包裹。
:::

**Fragment标签讲解**

加上最外层的DIV，组件就是完全正常的，但是你的布局就偏不需要这个最外层的标签怎么办?比如我们在作Flex布局的时候,外层还真的不能有包裹元素。这种矛盾其实React16已经有所考虑了，为我们准备了Fragment标签。

要想使用Fragment，需要先进行引入。
``` js
import React,{Component,Fragment } from 'react';
```
然后把最外层的div标签，换成Fragment标签，代码如下。
``` js
import React, {Component,Fragment } from 'react';

class Example extends Component{
    render(){
        return  (
            <Fragment>
               <div><input /> <button> 增加课程 </button></div>
               <ul>
                   <li>数学</li>
                   <li>语文</li>
               </ul> 
            </Fragment>
        )
    }
}
export default Example ;
```
这时候你再去浏览器的Elements中查看，就回发现已经没有外层的包裹了。

## React-响应式设计
react不建议你直接操作DOM元素,而是要通过数据进行驱动，改变界面中的效果。React会根据数据的变化，自动的帮助你完成界面的改变。所以在写React代码时，你无需关注DOM相关的操作，只需要关注数据的操作就可以了（这也是React如此受欢迎的主要原因，大大加快了我们的开发速度）。
``` js 
//js的构造函数，由于其他任何函数执行
constructor(props){
    super(props) //调用父类的构造函数，固定写法
    this.state={
        inputValue:'' , // input中的值
        list:[]    //服务列表
    }
}
```

## JSX踩坑之路

**JSX代码注释**
``` js
<Fragment>
    {/* 正确注释的写法 */}
    <div>
        <input value={this.state.inputValue} onChange={this.inputChange.bind(this)} />
        <button onClick={this.addList.bind(this)}> 增加服务 </button>
    </div>
</Fragment>
```
**JSX中的class陷阱**

要求把class换成className，它是防止和js中的class类名 冲突，所以要求换掉。

**JSX中的html解析问题**
如果想在文本框里输入一个h1标签，并进行渲染。默认是不会生效的，只会把h1标签打印到页面上，这并不是我想要的。如果工作中有这种需求，可以使用dangerouslySetInnerHTML属性解决。具体代码如下：
``` js
<ul>
    {
        this.state.list.map((item,index)=>{
            return (
                <li 
                    key={index+item}
                    onClick={this.deleteItem.bind(this,index)}
                    dangerouslySetInnerHTML={{__html:item}}
                >
                </li>
            )
        })
    }
</ul> 
```
上面的代码就可以实现html格式的输出。

**JSX中label标签的坑**

react中，如果label标签中使用for，你会发现浏览效果虽然可以正常，但console里还是有红色警告提示的。大概意思是不能使用for。它容易和javascript里的for循环混淆，会提示你使用htmlfor。正确代码示例如下：
``` js
<div>
    <label htmlFor="jspang">加入服务：</label>
    <input id="jspang" className="input" value={this.state.inputValue} onChange={this.inputChange.bind(this)} />
    <button onClick={this.addList.bind(this)}> 增加服务 </button>
</div>
```
## React进阶-Simple React Snippets
安装Simple React Snippets，可以实现快速输入react基础代码。

打开VSCode的插件查单，然后在输入框中输入Simple React Snippets,然后点击进行安装就可以了。


## React进阶-父子组件的传值
**父组件**
``` js
import React, { Component } from 'react';
import Children from '../../component/Children';

class Parent extends Component {
    constructor(props){
        super(props);
        this.state={
            data: []
        }
    }
    onSubmit = (value) => {
        console.log(value); // value即为子组件传递过来的参数
    }
    render() {
        return (
            <div>
                <Children 
                listData={this.state.data} // 父组件向子组件传值
                onSubmit={this.onSubmit} // 父组件向子组件传方法
                />
            </div>
        )
    }
}

export default Parent;
```
**子组件**
``` js
import React, { Component } from 'react';

class Children extends Component {
    constructor(props){
        super(props);
        this.state={
            list: [],
            device: ''
        }
    }
    componentDidMount () {
        this.setState({
            list: this.props.listData // listData为父组件传过来的数据
        })
    }
    childFunc = () => {
        this.props.onSubmit(this.state.device); // 子组件调用父组件方法，并将值传递给父组件
    }
    render() {
        return (
            <div>
                <div onClick={this.childFunc}></div>
            </div>
        )
    }
}

export default Children;
```
注：传值可以通过父子组件之间进行传值（主要是利用 props 来进行交流，父组件用this.state传值，子组件用this.prop），也可以通过父组件将值存于models中，然后子组件在props中获取。

## React进阶-单项数据流
通过父组件与子组件中可以看出，父组件往子组件传的值是不允许修改的，只能显示。

**函数式编程**

在面试React时，经常会问道的一个问题是：函数式编程的好处是什么？

● 函数式编程让我们的代码更清晰，每个功能都是一个函数。
● 函数式编程为我们的代码测试代理了极大的方便，更容易实现前端自动化测试。

React框架也是函数式编程，所以说优势在大型多人开发的项目中会更加明显，让配合和交流都得心应手。

## React高级-调试工具的安装及使用

**下载React developer tools**

这个需要在chrome浏览器里进行，并且需要科学上网（这东西我不能在这里教，所以自行百度吧）。

点击浏览器地址栏最右边的...，然后选择更多工具,然后选择扩展程序。

点击打开chrome网上应用店,直接在搜索框里搜索React，出现的第一个就是。

点击添加至Chrome,然后就是等待了..........

**React developer tools的三种状态**

React developer tools有三种颜色，三种颜色代表三种状态：

● 灰色： 这种就是不可以使用，说明页面不是又React编写的。
● 黑色: 说明页面是用React编写的，并且处于生成环境当中。
● 红色： 说明页面是用React编写的，并且处于调试环境当中。

**React developer tools使用**

打开浏览器，然后按F12,打开开发者工具，然后在面板的最后一个，你会返现一个React,这个就是安装的插件了。

在这里你可以清晰的看到React的结构，让自己写的代码更加清晰，你还可以看到组间距的数据传递，再也不用写console.log来测试程序了。
::: danger 注意
在科学上网前提下。
:::

## React高级-PropTypes校验传递值
在父组件向子组件传递数据时，使用了属性的方式，也就是props，但“小姐姐服务菜单”的案例并没有任何的限制。这在工作中时完全不允许的，因为大型项目，如果你不校验，后期会变的异常混乱，业务逻辑也没办法保证。

**PropTypes的简单应用**

我们在往子组件里传递了4个值，有字符串，有数字，有方法，这些都是可以使用PropTypes限制的。在使用需要先引入PropTypes。
``` js
import PropTypes from 'prop-types';
```
引入后，就可以在组件的下方进行引用了，需要注意的是子组件的最下面（不是类里边），写入下面的代码：
``` js
Example.propTypes={
    content:PropTypes.string,
    deleteItem:PropTypes.func,
    index:PropTypes.number
}
```
给出完成代码，如下：
``` js
import React from 'react';
import PropTypes from 'prop-types';

class Children extends React.Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    getItem(index) {
        this.props.deleteItem(index);
    }

    render() {
        return (<li onClick={this.getItem.bind(this, this.props.index)}>{this.props.content}</li>)
    }
}

export default Children;

Children.propTypes = {
    index: PropTypes.number.isRequired, // isRequired为必传，具体请查看官网
    content: PropTypes.string,
    deleteItem: PropTypes.func
}

Children.defaultProps = { // 为设置props的初始值
    name: '小杨'
}
```
**使用默认值defaultProps**

如上面代码所示，可以通过defaultProps设置props的初始值。

## React高级-ref的使用方法

## React高级-生命周期讲解-1
**React生命周期图**

通过这张图你可以看到React声明周期的四个大阶段：

1. Initialization:初始化阶段。
2. Mounting: 挂在阶段。
3. Updation: 更新阶段。
4. Unmounting: 销毁阶段

**什么是生命周期函数**

如果非要用一句话把生命周期函数说明白，我觉的可以用这句话来说明：
``` sh
生命周期函数指在某一个时刻组件会自动调用执行的函数
```

举例：js文件里边的render()函数，就是一个生命周期函数，它在state发生改变时自动执行。这就是一个标准的自动执行函数。

constructor不算生命周期函数。

constructor我们叫构造函数，它是ES6的基本语法。虽然它和生命周期函数的性质一样，但不能认为是生命周期函数。

但是你要心里把它当成一个生命周期函数，我个人把它看成React的Initialization阶段，定义属性（props）和状态(state)。

**1.Mounting阶段**

Mounting阶段叫挂载阶段，伴随着整个虚拟DOM的生成，它里边有三个小的生命周期函数，分别是：

1. componentWillMount : 在组件即将被挂载到页面的时刻执行。
2. render : 页面state或props发生变化时执行。
3. componentDidMount : 组件挂载完成时被执行。

**componentWillMount代码**
``` js
componentWillMount(){
    console.log('componentWillMount----组件将要挂载到页面的时刻')
}
```
**componentDidMount代码**
``` js
componentDidMount(){
    console.log('componentDidMount----组件挂载完成的时刻执行')
}
```
**render代码**
``` js
render(){
    console.log('render---组件挂载中.......')
}
```
这时候我们查看一下控制台，会为我们打出如下提示：
``` sh
componentWillMount----组件将要挂载到页面的时刻执行
render----开始挂载渲染
componentDidMount----组件挂载完成的时刻执行
```
这也是生命周期的顺序。
::: warning 注意
componentWillMount和componentDidMount这两个生命周期函数，只在页面刷新时执行一次，而render函数是只要有state和props变化就会执行。
:::

**2.Updation**

eact生命周期中的Updation阶段,也就是组件发生改变的更新阶段，这是React生命周期中比较复杂的一部分，它有两个基本部分组成，一个是props属性改变，一个是state状态改变（这个在生命周期的图片中可以清楚的看到）。

**shouldComponentUpdate函数**

shouldComponentUpdate函数会在组件更新之前，自动被执行。比如写入下面的代码:
``` js
shouldComponentUpdate(){
    console.log('shouldComponentUpdate---组件发生改变前执行');
    return true;
}
```
::: danger 注意
它要求返回一个布尔类型的结果，必须有返回值，上述代码中就直接返回一个true
:::
现在就可以在控制台console里看到结果了，并且结果是每次文本框发生改变时都会随着改变。如果你返回了false，这组件就不会进行更新了。 简单点说，就是返回true，就同意组件更新;返回false,就反对组件更新。

**omponentWillUpdate函数**
componentWillUpdate在组件更新之前，但shouldComponenUpdate之后被执行。但是如果shouldComponentUpdate返回false，这个函数就不会被执行了。
``` js
//shouldComponentUpdate返回true才会被执行。
componentWillUpdate(){
    console.log('componentWillUpdate---组件更新前，shouldComponentUpdate函数之后执行')
}
```
**componentDidUpdate**

componentDidUpdate在组件更新之后执行，它是组件更新的最后一个环节。
``` js
componentDidUpdate(){
    console.log('componentDidUpdate----组件更新之后执行')
}
```
为了方便我们看出结果，可以在每个函数前加上序号。最后我们可以看到控制台输出的结果如下：
``` sh
1-shouldComponentUpdate---组件发生改变前执行
2-componentWillUpdate---组件更新前，shouldComponentUpdate函数返回true之后执行
3-render----开始挂载渲染
4-componentDidUpdate----组件更新之后执行
```
**componentWillReceiveProps 函数**

如果是一个顶层组件，它并没接收任何的props，则不会执行。
``` js
componentWillReceiveProps(){
    console.log('child - componentWillReceiveProps')
}
```
也就是说，在组件中有接收通过props传来的参数的时候，在顶层组件再次渲染的时候，就会执行该钩子函数。

**3.Unmounting阶段**

**componentWillUnmount函数**
``` js
//当组件从页面中删除的时候执行
componentWillUnmount(){
    console.log('child - componentWillUnmount')
}
```

## React高级-生命周期改善程序性能
