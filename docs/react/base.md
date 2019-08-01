# 基础知识

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
    super();
    this.state = {}
  }

  componentDidMount(){

  };

  componentWillReceiveProps(nextProps){

  }

  render () {
    return (
      <div></div>
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
