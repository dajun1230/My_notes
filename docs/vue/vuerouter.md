## Vue-router
## Vue-router入门
**安装vue-router**

vue-router是一个插件包，所以我们还是需要用npm来进行安装的。打开命令行工具，进入你的项目目录，输入下面命令。
``` js
npm install vue-router --save-dev
```
**解读router/index.js文件**
``` js
import Vue from 'vue'   // 引入Vue
import Router from 'vue-router'  // 引入vue-router
import Hello from '@/components/Hello'  // 引入根目录下的Hello.vue组件
 
Vue.use(Router)  // Vue全局使用Router
 
export default new Router({
  routes: [              // 配置路由，这里是个数组
    {                    // 每一个链接都是一个对象
      path: '/',         // 链接路径
      name: 'Hello',     //路由名称，
      component: Hello   //对应的组件模板
    }
  ]
})
```