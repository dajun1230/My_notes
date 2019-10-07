# React Hooks
2019年React Hooks是React生态圈里边最火的新特性了。它改变了原始的React类的开发方式，改用了函数形式;它改变了复杂的状态操作形式，让程序员用起来更轻松;它改变了一个状态组件的复用性，让组件的复用性大大增加。

::: warning 注意
React Hooks中render的return返回标签中不需要写“this”，和vue用法一致，直接调用
:::

## 介绍和环境搭建
> Hooks是React v16.7.0-alpha中加入的新特性。它可以让你在class以外使用state和其他React特性。

### React Hooks 简介
2018年底FaceBook的React小组推出Hooks以来，所有的React的开发者都对它大为赞赏。React Hooks就是用函数的形式代替原来的继承类的形式，并且使用预函数的形式管理state，有Hooks可以不再使用类的形式定义组件了。这时候你的认知也要发生变化了，原来把组件分为有状态组件和无状态组件，有状态组件用类的形式声明，无状态组件用函数的形式声明。那现在所有的组件都可以用函数来声明了。

### 使用create-react-app搭建项目
create-react-app是React官方的脚手架，所以稳定性和使用率都是目前最好的，你可以大胆的进行使用。
``` js
npm install -g create-react-app // 全局安装react
create-react-app demo1 // 创建react项目demo1
cd demo1 // 进入demo1项目
npm run start // 启动项目
```
建立好以后，我会把项目进行最小化设置（删除/src下的大部分代码和文件），只留/src/index.js文件，然后把里边的代码删减成下面的样子:
``` js
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<App />, document.getElementById('root'));
```
这样就算开发环境搭建完成了，接下来我们对比一下原始的写法和现在有了React Hooks的写法。

### React Hooks 编写形式对比
先来写一个最简单的有状体组件，点我们点击按钮时，点击数量不断增加。

![An image](./images/hooks_add.png)

原始写法：
``` js
import React from "react";

class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }
    addCount = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    render() {
        return (
            <div>
                <p>You clicked {this.state.count} times</p>
                <button onClick={this.addCount}>增加</button>
            </div>
        )
    }
}

export default Example;
```
React Hooks 写法：
``` js
import React, { useState } from "react";

function Example() {
    const [count, setCount ] = useState(0);
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={()=> setCount(count + 1)}>增加</button>
        </div>
    )
}

export default Example;
```
从这两个程序的对比上可以看出Hooks本质上就是一类特殊的函数，他们可以为你的函数型组件（function component）注入一些特殊的功能。这听起来有点像以前React中的Mixins差不多哦。其实是由很多不同，hooks的目的就是让你不再写class，让function一统江湖。


## useState 的介绍和多状态声明
### useState的介绍
``` sh
useState是react自带的一个hook函数，它的作用是用来声明状态变量。
```
那我们从三个方面来看useState的用法，分别是声明、读取、使用（修改）。这三个方面掌握了，你基本也就会使用useState了.

先来看一下声明的方式，上面的代码如下：
``` js
const [ count , setCount ] = useState(0);
```
这种方法是ES6语法中的数组解构，这样看起来代码变的简单易懂。如果不写成数组解构，上边的语法要写成下面的三行:
``` js
let _useState = userState(0); // _useState是数组
let count = _useState[0];
let setCount = _useState[1];
```
useState这个函数接收的参数是状态的初始值(Initial state)，它返回一个数组，这个数组的第0位是当前的状态值，第1位是可以改变状态值的方法函数。所以上面的代码的意思就是声明了一个状态变量为count，并把它的初始值设为0，同时提供了一个可以改变count的状态值的方法函数。

这时候你已经会声明一个状态了，接下来我们看看如何读取状态中的值。
``` js
<p>You clicked {count} times</p>
```
你可以发现，我们读取是很简单的。只要使用{count}就可以，因为这时候的count就是JS里的一个变量，想在JSX中使用，值用加上{}就可以。

最后看看如果改变State中的值,看下面的代码:
``` js
<button onClick={()=>{setCount(count+1)}}>click me</button>
```
直接调用setCount函数，这个函数接收的参数是修改过的新状态值。接下来的事情就交给React,他会重新渲染组件。React自动帮助我们记忆了组件的上一次状态值，但是这种记忆也给我们带来了一点小麻烦，但是这种麻烦你可以看成规则，只要准守规则，就可以愉快的进行编码。

### 多状态声明的注意事项
比如现在我们要声明多个状态，有年龄（age）、性别(sex)和工作(work)。代码可以这么写.
``` js
import React, { useState } from 'react';
function Example2(){
    const [ age , setAge ] = useState(18)
    const [ sex , setSex ] = useState('男')
    const [ work , setWork ] = useState('前端程序员')
    return (
        <div>
            <p>JSPang 今年:{age}岁</p>
            <p>性别:{sex}</p>
            <p>工作是:{work}</p>
            
        </div>
    )
}
export default Example2;
```
其实细心的小伙伴一定可以发现，在使用useState的时候只赋了初始值，并没有绑定任何的key,那React是怎么保证这三个useState找到它自己对应的state呢？

**答案是：React是根据useState出现的顺序来确定的**

比如我们把代码改成下面的样子：
``` js
import React, { useState } from 'react';

let showSex = true
function Example2(){
    const [ age , setAge ] = useState(18)
    if(showSex){
        const [ sex , setSex ] = useState('男')
        showSex=false
    }
   
    const [ work , setWork ] = useState('前端程序员')
    return (
        <div>
            <p>JSPang 今年:{age}岁</p>
            <p>性别:{sex}</p>
            <p>工作是:{work}</p>
            
        </div>
    )
}
export default Example2;
```
这时候控制台就会直接给我们报错，错误如下：
``` sh
React Hook "useState" is called conditionally. React Hooks must be called in the exact same order in every component render 
```
意思就是useState不能在if...else...这样的条件语句中进行调用，必须要按照相同的顺序进行渲染。如果你还是不理解，你可以记住这样一句话就可以了：**就是React Hooks不能出现在条件判断语句中，因为它必须有完全一样的渲染顺序。**

## useEffect代替常用生命周期函数
在用Class制作组件时，经常会用生命周期函数，来处理一些额外的事情（副作用：和函数业务主逻辑关联不大，特定时间或事件中执行的动作，比如Ajax请求后端数据，添加登录监听和取消登录，手动修改DOM等等）。在React Hooks中也需要这样类似的生命周期函数，比如在每次状态（State）更新时执行，它为我们准备了useEffect。

### 用Class的方式为计数器增加生命周期函数
为了让你更好的理解useEffect的使用，先用原始的方式把计数器的Demo增加两个生命周期函数componentDidMount和componentDidUpdate。分别在组件第一次渲染后在浏览器控制台打印出计数器结果和在每次计数器状态发生变化后打印出结果。代码如下：
``` js
import React, { Component } from 'react';

class Example3 extends Component {
    constructor(props) {
        super(props);
        this.state = { count:0 }
    }

    componentDidMount(){
        console.log(`ComponentDidMount=>You clicked ${this.state.count} times`)
    }
    componentDidUpdate(){
        console.log(`componentDidUpdate=>You clicked ${this.state.count} times`)
    }
    addCount(){
        this.setState({count:this.state.count+1})
    }

    render() { 
        return (
            <div>
                <p>You clicked {this.state.count} times</p>
                <button onClick={this.addCount.bind(this)}>Chlick me</button>
            </div>
        );
    }
}
 
export default Example3;
```
这就是在不使用Hooks情况下的写法，那如何用Hooks来代替这段代码，并产生一样的效果那。

### 用useEffect函数来代替生命周期函数
在使用React Hooks的情况下，我们可以使用下面的代码来完成上边代码的生命周期效果，代码如下（修改了以前的diamond）： 记得要先引入useEffect后，才可以正常使用。
``` js
import React, { useState , useEffect } from 'react';
function Example(){
    const [ count , setCount ] = useState(0);
    //---关键代码---------start-------
    useEffect(()=>{
        console.log(`useEffect=>You clicked ${count} times`);
    })
    //---关键代码---------end-------
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={()=>{setCount(count+1)}}>click me</button>
        </div>
    )
}
export default Example;
```
写完后，可以到浏览器中进行预览一下，可以看出跟class形式的生命周期函数是完全一样的，这代表第一次组件渲染和每次组件更新都会执行这个函数。 那这段代码逻辑是什么？我们梳理一下:首先，我们生命了一个状态变量count,将它的初始值设为0，然后我们告诉react，我们的这个组件有一个副作用。给useEffecthook传了一个匿名函数，这个匿名函数就是我们的副作用。在这里我们打印了一句话，当然你也可以手动的去修改一个DOM元素。当React要渲染组件时，它会记住用到的副作用，然后执行一次。等Reat更新了State状态时，它再一词执行定义的副作用函数。

### useEffect两个注意点
● React首次渲染和之后的每次渲染都会调用一遍useEffect函数，而之前我们要用两个生命周期函数分别表示首次渲染(componentDidMonut)和更新导致的重新渲染(componentDidUpdate)。  
● useEffect中定义的函数的执行不会阻碍浏览器更新视图，也就是说这些函数时异步执行的，而componentDidMonut和componentDidUpdate中的代码都是同步执行的。个人认为这个有好处也有坏处吧，比如我们要根据页面的大小，然后绘制当前弹出窗口的大小，如果时异步的就不好操作了。

## useEffect替代卸载生命周期函数
在写React应用的时候，在组件中经常用到componentWillUnmount生命周期函数（组件将要被卸载时执行）。比如我们的定时器要清空，避免发生内存泄漏;比如登录状态要取消掉，避免下次进入信息出错。

### useEffect解绑副作用
学习React Hooks 时，我们要改掉生命周期函数的概念（人往往有先入为主的毛病，所以很难改掉），因为Hooks叫它副作用，所以componentWillUnmount也可以理解成解绑副作用。这里为了演示用useEffect来实现类似componentWillUnmount效果，先安装React-Router路由,进入项目根本录，使用npm进行安装。
``` js
npm install --save react-router-dom
```
然后打开Example.js文件，进行改写代码，先引入对应的React-Router组件。
``` js
import { BrowserRouter as Router, Route, Link } from "react-router-dom"
```
在文件中编写两个新组件，因为这两个组件都非常的简单，所以就不单独建立一个新的文件来写了。
``` js
function Index() {
    return <h2>Index.com</h2>;
}
  
function List() {
    return <h2>List-Page</h2>;
}
```
有了这两个组件后，接下来可以编写路由配置，在以前的计数器代码中直接增加就可以了。
``` js
return (
    <div>
        <p>You clicked {count} times</p>
        <button onClick={()=>{setCount(count+1)}}>click me</button>

        <Router>
            <ul>
                <li> <Link to="/">首页</Link> </li>
                <li><Link to="/list/">列表</Link> </li>
            </ul>
            <Route path="/" exact component={Index} />
            <Route path="/list/" component={List} />
        </Router>
    </div>
)
```
然后到浏览器中查看一下，看看组件和路由是否可用。如果可用，我们现在可以调整useEffect了。在两个新组件中分别加入useEffect()函数:
``` js
function Index() {
    useEffect(()=>{
        console.log('useEffect=>老弟，你来了！Index页面')
        )
    return <h2>Index.com</h2>;
}
  
function List() {
    useEffect(()=>{
        console.log('useEffect=>老弟，你来了！List页面')
    })

    return <h2>List-Page</h2>;
}
```
这时候我们点击Link进入任何一个组件，在浏览器中都会打印出对应的一段话。这时候可以用返回一个函数的形式进行解绑，代码如下：
``` js
function Index() {
    useEffect(()=>{
        console.log('useEffect=>老弟你来了！Index页面')
        return ()=>{
            console.log('老弟，你走了!Index页面')
        }
    })
    return <h2>Index.com</h2>;
}
```
这时候你在浏览器中预览，我们仿佛实现了**componentWillUnmount**方法。但这只是好像实现了，当点击计数器按钮时，**你会发现老弟，你走了!Index页面**，也出现了。这到底是怎么回事那？其实每次状态发生变化，useEffect都进行了解绑。

### useEffect的第二个参数
那到底要如何实现类似componentWillUnmount的效果那?这就需要请出**useEffect的第二个参数，它是一个数组，数组中可以写入很多状态对应的变量，意思是当状态值发生变化时，我们才进行解绑。但是当传空数组[]时，就是当组件将被销毁时才进行解绑，这也就实现了componentWillUnmount的生命周期函数。**
``` js
function Index() {
    useEffect(()=>{
        console.log('useEffect=>老弟你来了！Index页面')
        return ()=>{
            console.log('老弟，你走了!Index页面')
        }
    }, [])
    return <h2>Index.com</h2>;
}
```
为了更加深入了解第二个参数的作用，把计数器的代码也加上useEffect和解绑方法，并加入第二个参数为空数组。代码如下：
``` js
function Example(){
    const [ count , setCount ] = useState(0);

    useEffect(()=>{
        console.log(`useEffect=>You clicked ${count} times`)
        return ()=>{
            console.log('====================')
        }
    }, [])

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={()=>{setCount(count+1)}}>click me</button>

            <Router>
                <ul>
                    <li> <Link to="/">首页</Link> </li>
                    <li><Link to="/list/">列表</Link> </li>
                </ul>
                <Route path="/" exact component={Index} />
                <Route path="/list/" component={List} />
            </Router>
        </div>
    )
}
```
这时候的代码是不能执行解绑副作用函数的。但是如果我们想每次count发生变化，我们都进行解绑，只需要在第二个参数的数组里加入count变量就可以了。代码如下：
``` js
function Example(){
    const [ count , setCount ] = useState(0);

    useEffect(()=>{
        console.log(`useEffect=>You clicked ${count} times`)
        return ()=>{
            console.log('====================')
        }
    }, [count])

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={()=>{setCount(count+1)}}>click me</button>

            <Router>
                <ul>
                    <li> <Link to="/">首页</Link> </li>
                    <li><Link to="/list/">列表</Link> </li>
                </ul>
                <Route path="/" exact component={Index} />
                <Route path="/list/" component={List} />
            </Router>
        </div>
    )
}
```
这时候只要count状态发生变化，都会执行解绑副作用函数，浏览器的控制台也就打印出了一串=================。

## useContext 让父子组件传值更简单
有了useState和useEffect已经可以实现大部分的业务逻辑了，但是React Hooks中还是有很多好用的Hooks函数的，比如useContext和useReducer。

在用类声明组件时，父子组件的传值是通过组件属性和props进行的，那现在使用方法(Function)来声明组件，已经没有了constructor构造函数也就没有了props的接收，那父子组件的传值就成了一个问题。React Hooks 为我们准备了useContext。这节课就学习一下useContext，它可以帮助我们跨越组件层级直接传递变量，实现共享。需要注意的是useContext和redux的作用是不同的，一个解决的是组件之间值传递的问题，一个是应用中统一管理状态的问题，但通过和useReducer的配合使用，可以实现类似Redux的作用。

### createContext 函数创建context
直接在src目录下新建一个文件Example4.js,然后拷贝Example.js里的代码，并进行修改，删除路由部分和副作用的代码，只留计数器的核心代码就可以了。
``` js
import React, { useState , useEffect } from 'react';

function Example4(){
    const [ count , setCount ] = useState(0);
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={()=>{setCount(count+1)}}>click me</button>
        </div>
    )
}
export default Example4;
```
然后修改一下index.js让它渲染这个Example4.js组件，修改的代码如下。
``` js
import React from 'react';
import ReactDOM from 'react-dom';
import Example from './Example4'
ReactDOM.render(<Example />, document.getElementById('root'));
```
之后在Example4.js中引入createContext函数，并使用得到一个组件，然后在return方法中进行使用。先看代码，然后我再解释。
``` js
import React, { useState , createContext } from 'react';
//===关键代码
const CountContext = createContext();

function Example4(){
    const [ count , setCount ] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={()=>{setCount(count+1)}}>click me</button>
            {/*======关键代码 */}
            <CountContext.Provider value={count}>
            </CountContext.Provider>
        </div>
    )
}
export default Example4;
```
这段代码就相当于把count变量允许跨层级实现传递和使用了（也就是实现了上下文），当父组件的count变量发生变化时，子组件也会发生变化。接下来我们就看看一个React Hooks的组件如何接收到这个变量。

### useContext 接收上下文变量
已经有了上下文变量，剩下的就时如何接收了，接收这个直接使用useContext就可以，但是在使用前需要新进行引入useContext（不引入是没办法使用的）。
``` js
import React, { useState , createContext , useContext } from 'react';
```
引入后写一个Counter组件，只是显示上下文中的count变量代码如下：
``` js
function Counter(){
    const count = useContext(CountContext)  //一句话就可以得到count
    return (<h2>{count}</h2>)
}
```
得到后就可以显示出来了，但是要记得在<CountContext.Provider>的闭合标签中,代码如下。
``` js
<CountContext.Provider value={count}>
    <Counter />
</CountContext.Provider>
```
完整代码如下：
``` js
import React, { useState , createContext } from 'react';
//===关键代码
const CountContext = createContext();
// 子组件
function Counter(){
    const count = useContext(CountContext);  //一句话就可以得到count
    return (<h2>{count}</h2>)
}
// 父组件
function Example4(){
    const [ count , setCount ] = useState(0);
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={()=>{setCount(count+1)}}>click me</button>
            {/*======关键代码====== */}
            {/* 注意：value在传递多个参数时，可以写成value={{count, age}}或者value={[count, age]}都可以，只是子组件取值显示方式不同。*/}
            <CountContext.Provider value={count}>
                <Counter />
            </CountContext.Provider>
        </div>
    )
}

{/*
    如果需要将父子组件分离，需要将CounContext连同Example4一同导出。
    eg：export {CountContext, Example4};
    引用时格式： import {Example4} from "./xxx";
    并在子组件中引用“CountContext”。
*/}
export default Example4;
```
## useReducer介绍和简单使用
### reducer到底是什么？
为了更好的理解useReducer，所以先要了解JavaScript里的Redcuer是什么。它的兴起是从Redux广泛使用开始的，但不仅仅存在Redux中，可以使用JavaScript来完成Reducer操作。那reducer其实就是一个函数，这个函数接收两个参数，一个是状态，一个用来控制业务逻辑的判断参数。我们举一个最简单的例子。
``` js
function countReducer(state, action) {
    switch(action.type) {
        case 'add':
            return state + 1;
        case 'sub':
            return state - 1;
        default: 
            return state;
    }
}
```
上面的代码就是Reducer，你主要理解的就是这种形式和两个参数的作用，**一个参数是状态，一个参数是如何控制状态**。

### useReducer的使用
了解reducer的含义后，就可以讲useReducer了，它也是React hooks提供的函数，可以增强我们的Reducer，实现类似Redux的功能。我们新建一个Example5.js的文件，然后用useReducer实现计数器的加减双向操作。
``` js
import React, { useReducer } from 'react';

function ReducerDemo(){
    const [ count , dispatch ] =useReducer((state,action)=>{
        switch(action){
            case 'add':
                return state+1
            case 'sub':
                return state-1
            default:
                return state
        }
    }, 0)
    return (
       <div>
           <h2>现在的分数是{count}</h2>
           <button onClick={()=>dispatch('add')}>Increment</button>
           <button onClick={()=>dispatch('sub')}>Decrement</button>
       </div>
    )
}

export default ReducerDemo
```
这段代码是useReducer的最简单实现了，这时候可以在浏览器中实现了计数器的增加减少。

修改index.js文件，让ReducerDemo组件起作用。
``` js
import React from 'react';
import ReactDOM from 'react-dom';
import Example from './Example5';

ReactDOM.render(<Example />, document.getElementById('root'));
```

## useReducer代替Redux小案例-1
使用useContext和useReducer是可以实现类似Redux的效果，并且一些简单的个人项目，完全可以用下面的方案代替Redux，这种做法要比Redux简单一些。

### 理论上的可行性
我们先从理论层面看看替代Redux的可能性，其实如果你对两个函数有所了解，只要我们巧妙的结合，这种替代方案是完全可行的。

● useContext：可访问全局状态，避免一层层的传递状态。这符合Redux其中的一项规则，就是状态全局化，并能统一管理。  
● useReducer：通过action的传递，更新复杂逻辑的状态，主要是可以实现类似Redux中的Reducer部分，实现业务逻辑的可行性。

经过我们在理论上的分析是完全可行的，接下来我们就用一个简单实例来看一下具体的实现方法。

![An image](./images/useReducerGif.gif)

###编写基本UI组件

在/src目录下新建一个文件夹Example6，有了文件夹后，在文件夹下面建立一个showArea.js文件。代码如下：
``` js
import React from 'react';
function ShowArea(){
   
    return (<div style={{color:'blue'}}>字体颜色为blue</div>)

}
export default ShowArea;
```
显示区域写完后，新建一个Buttons.js文件，用来编写按钮，这个是两个按钮，一个红色一个黄色。先不写其他任何业务逻辑。
``` js
import React from 'react';

function Buttons(){
    return (
        <div>
            <button>红色</button>
            <button>黄色</button>
        </div>
    )
}

export default Buttons;
```
然后再编写一个组合他们的Example6.js组件，引入两个新编写的组件ShowArea和Buttons，并用div标签给包裹起来。
``` js
import React, { useReducer } from 'react';
import ShowArea from './ShowArea';
import Buttons from './Buttons';

function Example6(){
    return (
        <div>
                <ShowArea />
                <Buttons />
        </div>
    )
}

export default Example6;
```
这步做完，需要到/src目录下的index.js中引入一下Example6.js文件，引入后React才能正确渲染出刚写的UI组件。
``` js
import React from 'react';
import ReactDOM from 'react-dom';
import Example from './Example6/Example6';


ReactDOM.render(<Example />, document.getElementById('root'));
```
做完这步可以简单的预览一下UI效果，虽然很丑，但是只要能满足学习需求就可以了。我们虽然都是前端，但是在学习时没必要追求漂亮的页面，关键时把知识点弄明白。我们写这么多文件，也就是要为接下来的知识点服务，其实这些组件都是陪衬罢了。

### 编写颜色共享组件color.js
有了UI组件后，就可以写一些业务逻辑了，这节课我们先实现状态共享，这个就是利用useContext。建立一个color.js文件，然后写入下面的代码。
``` js
import React, { createContext } from 'react';

export const ColorContext = createContext({})

export const Color = props=>{
    return (
        <ColorContext.Provider value={{color:"blue"}}>
            {props.children}
        </ColorContext.Provider>
    )
}
```
代码中引入了createContext用来创建共享上下文ColorContext组件，然后我们要用{props.children}来显示对应的子组件。详细解释我在视频中讲解吧。

有了这个组件后，我们就可以把Example6.js进行改写，让她可以共享状态。
``` js
import React, { useReducer } from 'react';
import ShowArea from './ShowArea';
import Buttons from './Buttons';
import { Color } from './color';   //引入Color组件

function Example6(){
    return (
        <div>
            <Color>
                <ShowArea />
                <Buttons />
            </Color>
            
        </div>
    )
}

export default Example6;
```
然后再改写showArea.js文件，我们会引入useContext和在color.js中声明的ColorContext，让组件可以接收全局变量。
``` js
import React , { useContext } from 'react';
import { ColorContext } from './color';

function ShowArea(){
    const {color} = useContext(ColorContext)
    return (<div style={{color:color}}>字体颜色为{color}</div>)

}

export default ShowArea;
```
## useReducer代替Redux小案例-2
### 在color.js中添加Reducer
颜色（state）管理的代码我们都放在了color.js中，所以在文件里添加一个reducer，用于处理颜色更新的逻辑。先声明一个reducer的函数，有了reducer后，在Color组件里使用useReducer,这样Color组件就有了那个共享状态和处理业务逻辑的能力，跟以前使用的Redux几乎一样了。之后修改一下共享状态。我们来看代码：
``` js
import React, { createContext,useReducer } from 'react';

export const ColorContext = createContext({})

export const UPDATE_COLOR = "UPDATE_COLOR"

const reducer= (state,action)=>{
    switch(action.type){
        case UPDATE_COLOR:
            return action.color
        default:
            return state
    }
}

export const Color = props=>{
    const [color,dispatch]=useReducer(reducer,'blue')
    return (
        <ColorContext.Provider value={{color,dispatch}}>
            {props.children}
        </ColorContext.Provider>
    )
}
```
注意，这时候我们共享出去的状态变成了color和dispatch,如果不共享出去dispatch，你是没办法完成按钮的相应事件的。

### 通过dispatch修改状态
目前程序已经有了处理共享状态的业务逻辑能力，接下来就可以在buttons.js使用dispatch来完成按钮的相应操作了。先引入useContext、ColorContext和UPDATE_COLOR，然后写onClick事件就可以了。代码如下:
``` js
import React ,{useContext} from 'react';
import {ColorContext,UPDATE_COLOR} from './color'

function Buttons(){
    const { dispatch } = useContext(ColorContext)
    return (
        <div>
            <button onClick={()=>{dispatch({type:UPDATE_COLOR,color:"red"})}}>红色</button>
            <button onClick={()=>{dispatch({type:UPDATE_COLOR,color:"yellow"})}}>黄色</button>
        </div>
    )
}

export default Buttons;
```
这样代码就编写完成了，用useContext和useReducer实现了Redux的效果，这个代码编写过程比Redux要简单，但是也是有一定难度的。

## useMemo优化React Hooks程序性能
useMemo主要用来解决使用React hooks产生的无用渲染的性能问题。使用function的形式来声明组件，失去了shouldCompnentUpdate（在组件更新之前）这个生命周期，也就是说我们没有办法通过组件更新前条件来决定组件是否更新。而且在函数组件中，也不再区分mount和update两个状态，这意味着函数组件的每一次调用都会执行内部的所有逻辑，就带来了非常大的性能损耗。

### 性能问题展示案例
先编写一下刚才所说的性能问题，建立两个组件,一个父组件一个子组件，组件上由两个按钮，一个是“左”，一个是“右”，点击哪个，哪个时间戳就更新了。在/src文件夹下，新建立一个Example7的文件夹，在文件夹下建立一个Example7.js文件.然后先写第一个父组件。
``` js
import React, {useState} from "react";

function Parent() {
    const [left, changeLeft] = useState('左侧');
    const [right, changeRight] = useState("右侧");
    return (
        <>
            <button onClick={()=> changeLeft(new Date().getTime())}>左</button>
            <button onClick={()=> changeRight(new Date().getTime())}>右</button>
            <Children name={left}>{right}</Children>
        </>
    )
}
export default Parent;
```
父组件调用了子组件，子组件我们输出两个时间戳，显示在界面上。代码如下：
``` js
function Children({name, children}) {
    function changeTime(name) {
        console.log("时间改变"+ name)
    };
    const time = changeTime(name);
    return (
        <>
            <div>左侧时间: {name}</div>
            <div>右侧时间: {children}</div>
        </>
    )
}
```
这时候你会发现在浏览器中点击“左”按钮，改变时间对应的方法都会执行，结果虽然没变，但是每次都执行，这就是性能的损耗。目前只有子组件，业务逻辑也非常简单，如果是一个后台查询，这将产生严重的后果。所以这个问题必须解决。当我们点击“右”按钮时，左对应的方法changeTime不能执行，只有在点击“左”按钮时才能执行。

#useMemo 优化性能
其实只要使用useMemo，然后给她传递第二个参数，参数匹配成功，才会执行。代码如下：
``` js
import React, {useState, useMemo} from "react";

function Parent() {
    const [left, changeLeft] = useState('左侧');
    const [right, changeRight] = useState("右侧");
    return (
        <>
            <button onClick={()=> changeLeft(new Date().getTime())}>左</button>
            <button onClick={()=> changeRight(new Date().getTime())}>右</button>
            <Children name={left}>{right}</Children>
        </>
    )
}

function Children({name, children}) {
    function changeTime(name) {
        console.log("时间改变"+ name)
    };
    // 关键代码：只有在name值改变的时候才会执行该函数
    const time = useMemo(()=>changeTime(name), [name]);
    return (
        <>
            <div>左侧时间: {name}</div>
            <div>右侧时间: {children}</div>
        </>
    )
}

export default Parent;
```
这时在浏览器中点击一下“右”按钮，changeTime就不再执行了。也节省了性能的消耗。案例只是让你更好理解，你还要从程序本身看到优化的作用。好的程序员对自己写的程序都是会进行不断优化的，这种没必要的性能浪费也是绝对不允许的，所以useMemo的使用在工作中还是比较多的。

## useRef获取DOM元素和保存变量
useRef在工作中虽然用的不多，但是也不能缺少。它有两个主要的作用:

● 用useRef获取React JSX中的DOM元素，获取后你就可以控制DOM的任何东西了。但是一般不建议这样来作，React界面的变化可以通过状态来控制。  
● 用useRef来保存变量，这个在工作中也很少能用到，我们有了useContext这样的保存其实意义不大，但是这是学习，也要把这个特性讲一下。

### useRef获取DOM元素
界面上有一个文本框，在文本框的旁边有一个按钮，当我们点击按钮时，在控制台打印出input的DOM元素，并进行复制到DOM中的value上。这一切都是通过useRef来实现。

![An image](./images/useRef_demo01.png)

在/src文件夹下新建一个Example8.js文件，然后先引入useRef，编写业务逻辑代码如下:
``` js
import React, { useRef} from 'react';
function Example8(){
    const inputEl = useRef(null);
    const onButtonClick= () => { 
        inputEl.current.value="Hello, World"
        console.log(inputEl) //输出获取到的DOM节点
    }
    return (
        <>
            {/*保存input的ref到inputEl */}
            <input ref={inputEl} type="text"/>
            <button onClick={onButtonClick}>在input上展示文字</button>
            {/* 注：下面这两种写法，对应上面直接写function onButtonClick(){}，已经绑定了this */}
            {/* <button onClick={()=>onButtonClick}>在input上展示文字</button> */}
            {/* <button onClick={onButtonClick.bind(this)}>在input上展示文字</button> */}
        </>
    )
}
export default Example8;
```
当点击按钮时，你可以看到在浏览器中的控制台完整的打印出了DOM的所有东西，并且界面上的input框的value值也输出了我们写好的Hello , World。这一切说明我们可以使用useRef获取DOM元素，并且可以通过useRefu控制DOM的属性和值。

### useRef保存普通变量
这个操作在实际开发中用的并不多，但我们还是要讲解一下。就是useRef可以保存React中的变量。我们这里就写一个文本框，文本框用来改变text状态。又用useRef把text状态进行保存，最后打印在控制台上。写这段代码你会觉的很绕，其实显示开发中没必要这样写，用一个state状态就可以搞定，这里只是为了展示知识点。

接着上面的代码来写，就没必要重新写一个文件了。先用useState声明了一个text状态和setText函数。然后编写界面，界面就是一个文本框。然后输入的时候不断变化。
``` js
import React, { useRef ,useState,useEffect } from 'react';

function Example8(){
    const inputEl = useRef(null);
    const onButtonClick=()=>{ 
        inputEl.current.value="Hello ,useRef";
        console.log(inputEl);
    }
    const [text, setText] = useState('123');
    return (
        <>
            {/*保存input的ref到inputEl */}
            <input ref={inputEl} type="text"/>
            <button onClick = {onButtonClick}>在input上展示文字</button>
            <br/>
            <br/>
            <input value={text} onChange={(e)=>{setText(e.target.value)}} />
        </>
    )
}

export default Example8;
```
这时想每次text发生状态改变，保存到一个变量中或者说是useRef中，这时候就可以使用useRef了。先声明一个textRef变量，他其实就是useRef函数。然后使用useEffect函数实现每次状态变化都进行变量修改，并打印。最后的全部代码如下。
``` js
import React, { useRef ,useState,useEffect } from 'react';
function Example8(){
    const inputEl = useRef(null);
    const onButtonClick=()=>{ 
        inputEl.current.value="Hello ,useRef";
        console.log(inputEl);
    }
    //-----------关键代码--------start
    const [text, setText] = useState('123');
    const textRef = useRef();

    useEffect(()=>{
        textRef.current = text;
        console.log('textRef.current:', textRef.current);
    })
    //----------关键代码--------------end
    return (
        <>
            {/*保存input的ref到inputEl */}
            <input ref={inputEl} type="text"/>
            <button onClick = {onButtonClick}>在input上展示文字</button>
            <br/>
            <br/>
            <input value={text} onChange={(e)=>{setText(e.target.value)}} />
        </>
    )
}

export default Example8;
```
这时候就可以实现每次状态修改，同时保存到useRef中了。也就是我们说的保存变量的功能。

## 自定义Hooks函数获取窗口大小
其实自定义Hooks函数和用Hooks创建组件很相似，跟我们平时用JavaScript写函数几乎一模一样，可能就是多了些React Hooks的特性，自定义Hooks函数偏向于功能，而组件偏向于界面和业务逻辑。由于差别不大，所以使用起来也是很随意的。

### 编写自定义函数
在实际开发中，为了界面更加美观。获取浏览器窗口的尺寸是一个经常使用的功能，这样经常使用的功能，就可以封装成一个自定义Hooks函数，记住一定要用use开头，这样才能区分出什么是组件，什么是自定义函数。

新建一个文件Example9.js,然后编写一个useWinSize,编写时我们会用到useState、useEffect和useCallback所以先用import进行引入。
``` js
import React, { useState ,useEffect ,useCallback } from 'react';
```
然后编写函数，函数中先用useState设置size状态，然后编写一个每次修改状态的方法onResize，这个方法使用useCallback，目的是为了缓存方法(useMemo是为了缓存变量)。 然后在第一次进入方法时用useEffect来注册resize监听时间。为了防止一直监听所以在方法移除时，使用return的方式移除监听。最后返回size变量就可以了。
``` js
function useWinSize(){
    const [ size , setSize] = useState({
        width:document.documentElement.clientWidth,
        height:document.documentElement.clientHeight
    })

    const onResize = useCallback(()=>{
        setSize({
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        })
    },[]) 
    useEffect(()=>{
        window.addEventListener('resize',onResize)
        return ()=>{
            window.removeEventListener('resize',onResize)
        }
    }, [])

    return size;
}
```
这就是一个自定义函数，其实和我们以前写的JS函数没什么区别，所以这里也不做太多的介绍。

### 编写组件并使用自定义函数
自定义Hooks函数已经写好了，可以直接进行使用，用法和JavaScript的普通函数用起来是一样的。直接在Example9组件使用useWinSize并把结果实时展示在页面上。
``` js
function Example9(){

    const size = useWinSize()
    return (
        <div>页面Size:{size.width}x{size.height}</div>
    )
}

export default Example9;
```
之后就可以在浏览器中预览一下结果，可以看到当我们放大缩小浏览器窗口时，页面上的结果都会跟着进行变化。说明自定义的函数起到了作用。

