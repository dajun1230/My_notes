# 进阶之路

## Hooks 
> Hooks是React v16.7.0-alpha中加入的新特性。它可以让你在class以外使用state和其他React特性。

在这里，useState是一个钩子（我们将在一瞬间谈论这意味着什么）。我们在函数组件中调用它来向它添加一些本地状态。React将在重新渲染之间保留此状态。useState返回一对：当前状态值和一个允许您更新它的函数。您可以从事件处理程序或其他位置调用此函数。它类似于this.setState一个类，除了它不会将旧状态和新状态合并在一起。
``` js
import React, { useState } from 'react';

function Example() {
    const [ count, setCount ] = useState(0); // 拆分如下三行代码
    // let _useState = useState(0); // _useState是数组
    // let count = _useState[0];
    // let setCount = _useState[1];
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>点击</button>
        </div>
    )
}

export default Example;
```
## useEffect 

1. useEffect替换了原有的componentDidmount、componentDidUpdate;即当第一次进入即会执行useEffet，当你去更新内容时，也会执行。
``` js
import React, { useState, useEffect } from 'react';
function Example() {
    const [ count, setCount ] = useState(0);
    useEffect(() => {
        console.log(`You clicked ${count} times`);
    })
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>点击</button>
        </div>
    )
}
export default Example;
```
打印结果： 第一次进入打印 "You clicked 0 times"，然后每点击一次就打印一次"You clicked X times"。

2. useEffect实现componentWillUnmount效果，提供了return返回一个匿名函数，页面在离开的时候会执行这个return，但是每当页面更新变换的时候，也会执行return效果，所以，需要在useEffect中传入第二个参数，是数组，写空值时就只有在离开当前页面后才会执行return里面的函数。具体看如下Index组件与List组件中useEffect区别：
``` js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'; 

function Index() {
    useEffect(() => {
        console.log('老大哥，你来了，-----index');
        return () => {
            console.log('老大哥，你走了，----index');
        }
    }, [])
    return (
        <div>首页</div>
    )
}

function List() {
    useEffect(() => {
        console.log('老大哥，你来了,----list');
        return () => {
            console.log('老大哥，你走了，----list');
        }
    })
    return (
        <div>列表</div>
    )
}

function Example() {
    const [ count, setCount ] = useState(0);
    useEffect(() => {
        console.log(`You clicked ${count} times`);
    })
    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>点击</button>
            <Router>
                <Route>
                    <ul>
                        <li><Link to='/'>首页</Link></li>
                        <li><Link to='/list'>列表</Link></li>
                    </ul>
                    <Route path="/" exact component={Index} />
                    <Route path="/list" component={List} />
                </Route>
            </Router>
        </div>
    )
}

export default Example;
```

## useContext父子组件传值
``` js
import React, { useState, createContext, useContext } from 'react';

// 父组件
const CountContext = createContext();
function Example() {
    const [ count, setCount ] = useState(0);

    return (
        <div>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>点击</button>
            <CountContext.Provider value={count}>
                {/* 子组件 */}
                <Counter />
            </CountContext.Provider>
        </div>
    )
}

export default Example;

// 子组件
function Counter() {
    const count = useContext(CountContext);
    return (
        <h2>{count}</h2>
    )
}
```
