# 基本写法

## 快捷键
> Vs code快捷键：scaffold;

``` js
<template>
    <div class="wel">
        <button @:click="clickFunc">点击</button>
        <cart-item :carts="carts"></cart-item> // 组件写法,必须使用全小写，中间用“-”隔开
    </div>
</template>

<script>
import { BIND_MAC } from "@/config/api";
import CartItem from "@/components/CartItem"; // 引用CartItem组件

export default {
    name: 'welcome',
    components: {
        CartItem
    },
    data () {
        return {
            list: []
        }
    },
    computed: {

    },
    method: {
        async reqData() { //接口请求
            try {
                let res = await this.$requset();
                if (res.data.status === 200) {
                    console.log('请求成功')
                } else {
                    console.log('请求失败')
                }
            } catch (error) {
                console.log(error)
            }
        },
        clickFunc () { // 第一种写法
            console.log('点击事件')
        },
        mouseFunc: function () { // 第二种写法
            console.log('移动事件')
        }
    }
}
</script>

<style  lang="scss" scoped>
@import "./style"; // 引用当前目录下的style.scss文件
</style>
```

## 基本配置
> src/main.js
``` js
import Vue from 'vue'
import App from './App'
import {
  $Toast,
  $Message
} from '../static/iView/base/index'
import config from '@/config/index';    //全局参数
import * as wxApi from '@/utils/wxApi'; //统一封装的微信api;
import wxRequest from '@/utils/request';


Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue(App)
app.$mount();

Vue.prototype.$Toast = $Toast;
Vue.prototype.$Message = $Message;
Vue.prototype.$config = config;
Vue.prototype.$wxApi = wxApi;
Vue.prototype.$request = wxRequest;
```

## 反向代理
> config/index.js
``` js
dev: {
    // Paths,
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    proxyTable: {
      '/api': {
        target: 'https://xingliwei.lanlvsh.cn',
        // target: 'http://192.168.0.107:9011/api',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
```

## Vuex
> Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

::: warning 注意
核心：<br />
1、state：<br />
2、getters：用于通过state来计算出一个新的值，和Vue本身的computed相似。<br />
3、mutations：是唯一一个更改state的地方，并且是同步的。mutations里的方法最多只有两个参数，第一个是state，第二个用于传递参数，如果要传递多个参数，请使用对象；否则传多了就无效。(**Mutation 必须是同步函数**)<br />
4、actions：主要用于异步方法，两个参数：第一个是整个store，第二个是传入的参数。(Action 类似于 mutation，不同在于：1. Action 提交的是 mutation，而不是直接变更状态;2. 可以包含任意异步操作)
:::

::: tip 非模块化
对全局的状态管理进行统一，未做单独区分模块处理。
:::

前两步参照模块化操作：
3. 新建store.js
``` js
|- src
  |- store
    |- index.js
    |- state.js
    |- getters.js
    |- mutations.js
// index.js
import Vue from 'vue';
import Vuex from 'vuex';
import state from './state.js';
import getters from './getter.js';
import mutations from './mutations.js';

Vue.use(Vuex);

// const syncStorageCart = store => {
//   store.subscribe((mutation, state) => {
//     window.localStorage.setItem('xxxx-cart', JSON.stringify(state.cart))
//   })
// }

export default new Vuex.Store({
    strict: true,
    state,
    getters,
    mutations,
    // plugins: [syncStorageCart]
});
// *************************
// getters.js
export default {
    count () {
        return ;
    }
}
// mutations.js
export default {
    count (state, id) {
        return ;
    }
}
// state.js (全局的state)
export default {
  token: JSON.parse(window.localStorage.getItem('xxxx-token')) || ''
}
```

::: tip 模块化
对单独的模块进行自己模块的getters、matutions等操作。
:::
1. 安装
``` js
npm install vuex -S
```
2. 具体配置
> src/main.js
``` js
import Vue from 'vue';
import App from './App';
import router from './router'; // 路由配置
import store from './store'; // 引入vuex
import $http from './requests'; // 请求
import utils from './util/common'; // 公共工具类

Vue.prototype.$http = $http;
Vue.prototype.$utils = utils;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store, // 引入使用vuex
  components: { App },
  template: '<App/>'
})
```
3. 新建store文件
``` js
|- src
  |- store
    |-modules
      |- count.js
    |- index.js
// *************************
// index.js
import Vue from 'vue';
import Vuex from 'vuex';
import count from './modules/count';
import todos from './modules/todos';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        count,
        todos 
    }
});
// *************************
// count.js
export default {
    state: {
        list: []
    },
    getters: {
        count (state) {
            return state.count;
        }
    },
    mutations: {
        deleteItem (state, Id) {
            state.cart = state.cart.filter(item => item.id !== Id)
            return state.cart
        },
    },
    actions: {
        incrementAsync ({ commit }) {
            setTimeout(() => {
            commit('increment')
            }, 1000)
        },
        async actionA ({ commit }) {
            commit('gotData', await getData());
        },
        async actionB ({ dispatch, commit }) {
            await dispatch('actionA'); // 等待 actionA 完成
            commit('gotOtherData', await getOtherData());
        }
    }
}
```
4. 页面引用
``` js
<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  name: "app",
  components: {},
  computed: {
        ...mapGetters([ "count","completedTodos","completedTodosCount","getTodosById" ])
  },
  // methods: mapMutations(["incrementCount", "decrementCount"])
  methods: {
        ...mapMutations(["incrementCount", "decrementCount"]),
        ...mapActions([ "incrementCountAsync","decrementCountAsync",  "fetchTodos"])
  }
  
```
## 注意事项
::: danger 警告
vuex模块化没有实操过，具体不是特别清楚。
:::