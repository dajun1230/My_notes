# 基础知识

## 组件区别
1. **无状态组件**: 
无状态组件主要用来定义模板，接收来自父组件props传递过来的数据，使用{props.xxx}的表达式把props塞到模板里面。无状态组件应该保持模板的纯粹性，以便于组件复用。创建无状态组件如下：
``` js
import React from 'react';

 const Example = () => {
    return (
        <div>
            
        </div>
    )
}

export default  Example;
```
2. **有状态组件**: 
有状态组件主要用来定义交互逻辑和业务数据（如果用了Redux，可以把业务数据抽离出去统一管理），使用{this.state.xxx}的表达式把业务数据挂载到容器组件的实例上（有状态组件也可以叫做容器组件，无状态组件也可以叫做展示组件），然后传递props到展示组件，展示组件接收到props，把props塞到模板里面。创建有状态组件如下：
``` js
import React, { Component } from 'react';

class Example extends Component {
  constructor(props) {
    super(props);
    this.state={
      nameOne: props.name,
      nameTwo: this.props.name // super()方法中传递了props属性，this.props才可以获取到name属性
    }
  }
  render() {
      return (
          <div>
              
          </div>
      )
  }
}

export default Example;
```

## props传值区别
> 其实，上述代码中props.name和this.props.name的值都是一样的，但是它俩还是有区别的。
1. construtor() --- 构造方法， 这是ES6对类的默认方法，通过 new 命令生成对象实例时自动调用该方法。并且，该方法是类中必须有的，如果没有显示定义，则会默认添加空的constructor( )方法。
2. super() --- 继承，在class方法中，继承是使用 extends 关键字来实现的。子类 必须 在 constructor()调用 super()方法，否则新建实例时会报错。

::: danger 注意
报错的原因是：子类是没有自己的 this 对象的，它只能继承自父类的 this 对象，然后对其进行加工，而super()就是将父类中的this对象继承给子类的。没有 super，子类就得不到 this 对象。
::: 

constructor中传递的props就是子组件本身的属性props，但是this.props.name中的这个props却不是子组件的属性props，虽然值都是一样的，这个props其实在调用super方法的时候被传递到了Component这个父类中去了，所以this.props.name获取到的是Component父类中的props属性。看下React的源码:
``` js
function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
}
```
发现没，子类super方法把props参数传递给了父类Component，Component把props参数挂载到它的实例属性props上了。所以，你只有给super方法中传递props参数，在构造函数里才能用this,props.xxx。如果super方法中不传递props参数，获取this.props.name的值就会报错。获取this.props显示为undifined.

::: warning 注意
1. 如果你用到了constructor就必须写super(),是用来初始化this的，可以绑定事件到this上;
2. 如果你在constructor中要使用this.props,就必须给super加参数：super(props)；
3. （无论有没有constructor，在render中this.props都是可以使用的，这是React自动附带的；）
4. 如果没用到constructor,是可以不写的；React会默认添加一个空的constructor;
5. **只有一个理由需要传递props作为super()的参数，那就是你需要在构造函数内使用this.props**。
:::

## 配置
> src>index.js
``` js
import router from './router/index.js';
import dva from 'dva';
import { createBrowserHistory as createHistory } from 'history'; // cnpm install history -S

// 1. Initialize
const app = dva({
  history: createHistory()
});

// 2. Plugins
// app.use({});

// 3. Model  将models加载到 dva实例中， 不加载则无法通过dva实现 数据状态管理
app.model(require('./models/global').default);

// 4. Router
app.router(router);

// 5. Start
app.start('#root');
```
> router>index.js
``` js
import React from 'react';
import { Spin } from 'antd';
import { Route, Router, Switch} from 'dva/router';
import Root from './Root';
import Loadable from 'react-loadable';
import AuthorizedRoute from '../components/routerConfig/AuthorizedRoute';
import '../index.less';

const Loading = () => <div className="loading-box"><Spin /></div>

const asyncLogin = Loadable({
  loader: () => import('../routes/Login/Login.js'),
  loading: Loading,
})
function RouterConfig({ history, app }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path='/login' component={asyncLogin} />
        <AuthorizedRoute path="/" component={Root} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
```
## 页面（routes)
src/xxx.jsx
``` js
import React from 'react';
import { connect } from 'dva';

class Bell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: false
    }
    // 为了在回调中使用 `this`，这个绑定是必不可少的
    this.handleClick = this.handleClick.bind(this); // 第一种方式
  }

  componentDidMount(){

  };

  componentWillReceiveProps(nextProps){

  };

  handleClick() {
    this.setState(state => ({
      isToggleOn: !state.isToggleOn
    }));
  }

  // handleClick = () => { // 第二种方式
  //   this.setState(state => ({
  //     isToggleOn: !state.isToggleOn
  //   }));
  // }

  render () {
    return (
      <div>
      {--或者使用<button onClick={(e) => {this.handleClick(id, e)}> 第三种方式--}
      {--或者使用<button onClick={this.handleClick.bind(this, id)}> 第四种方式--}
        <button onClick={this.handleClick}> 
          {this.state.isToggleOn ? 'ON' : 'OFF'}
        </button>
      </div>
    );
  }
}

function mapStateToProps (state) {
  const { taskList, tasksTotal } = state.alarm;
  return {
    taskList,
    tasksTotal
  };
}

function mapDispatchToProps (dispatch) {
  return {
    getTasks: (params) => dispatch({
      type: 'task/getTasks',
      params
    })
  }
}
export default connect(mapStateToProps, mapDispatchToProps) (Bell);
```

## Modles
``` js
import * as alarmService from '../services/alarm/index';

export default {
    namespace: 'alarm',

    state: {
        alarmList: []
    },

    subscriptions: {},

    effects: {
        * updateWarnLevel({params}, {call, put}) {
            const result = yield call(alarmService.updateWarnLevel, params);
            yield put({
                type: 'saveUserInfoSuccess',
                payload: result.data,
            });
        },
    },

    reducers: {
        saveUserInfoSuccess(state, action) {
            return {...state, ...action.payload}
        }
    }
}; 
```

## 接口（services）
``` js
import request from '../../utils/request';

export async function authLogin(params) {
  return request('/api/auth/login', {
    method: 'POST',
    data: params,
  })
}

export async function refreshToken(params) {
  return request(`/api/auth/token/${params.id}`, {
    method: 'get'
  });
}
```
## 父子组件间传值
> 父组件
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

> 子组件
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

## 父组件向更深层的子组件传值 
> 通过添加 childContextTypes 和 getChildContext() 到 第一层组件MessageList （ context 的提供者），React 自动向下传递数据然后在组件中的任意组件（也就是说任意子组件，在此示例代码中也就是 Button ）都能通过定义 contextTypes（必须指定context的数据类型） 访问 context 中的数据。这样就不需要通过第二层组件进行传递了。
指定数据并要将数据传递下去的父组件要定义 childContextTypes 和 getChildContext() ；想要接收到数据的子组件 必须定义 contextTypes 来使用传递过来的 context 。

父组件：
``` js
class Parent extends Component {
    constructor(props){
        super(props);
        this.state={
            data: []
        }
    }
    // 父组件要定义 childContextTypes 和 getChildContext()
    childXontextTypes: {
      color: React.PropTypes.string
    },
    getChildContext: function(){
      return {color: 'purple'}
    }
    render() {
        return (
            <div>
                <Children />
            </div>
        )
    }
}
```
子组件：
``` js
class Children extends Component {
    constructor(props){
        super(props);
        this.state={
            list: [],
            device: ''
        }
    }
    // 必须指定context的数据类型
    contextTypes: {
      color: React.PropTypes.string
    }

    render() {
        return (
            <div>
                <div style={{background: this.context.color}}></div> // 父组件传递过来的color
            </div>
        )
    }
}
```

## 处理多个输入
