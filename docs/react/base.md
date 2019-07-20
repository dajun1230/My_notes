# 基础知识

## 配置
src>index.js
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
router>index.js
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
## 页面
src/xxx.jsx
``` js
import React from 'react';
import { connect } from 'dva';

class Bell extends React.Component {
  constructor(props) {
    super();
    this.state = {}
  }
  componentDidMount () {

  };

  render () {
    return (
      <div></div>
    );
  }
}

function mapStateToProps (state) {
  const { taskList, tasksTotal } = state.task;
  return {};
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
                payload: {
                    ...result.data
                },
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

## 路由
``` js
import request from '../../utils/request'

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