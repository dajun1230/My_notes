# 重要笔记

## Vue在Vs Code中的断点调试
[在Chrome和VS Code中调试Vue.js](https://github.com/Microsoft/vscode-recipes/blob/master/vuejs-cli/README.md)，具体请参考网址。下面以Vue 2.X版本做调试：（两种方法）

**一、直接在要调试的代码处输入debugger，然后重新运行代码**

**二、Vs Code与Chrome联调**

具体操作步骤如下：

1.设置参数

Vue 2.X中在config/index.js并找到devtool物业。将其更新为：
``` js
// devtool: 'cheap-module-eval-source-map', 旧
devtool: 'source-map', // 新
```
Vue CLI 3.X中devtool需要设置在里面vue.config.js。如果文件尚不存在，请在项目的根目录中创建该文件。
``` js
module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  }
}
```
2.在Vs Code中点击“调试-启动调试”或直接按“F5”键，选择**Chrome**，然后会在开发文档目录下生成.vscode文件夹
``` js
- vuecli // 项目目录文件夹
  |- .vscode
    |- launch.json
  |- build
  |- config
  ...
```
3.配置launch.json文件
``` js
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "vuejs: chrome",
      "url": "http://localhost:8080",
      "webRoot": "${workspaceFolder}/src",
      "breakOnLoad": true,
      "sourceMapPathOverrides": {
        "webpack:///./src/*": "${webRoot}/*",
        "webpack:///src/*": "${webRoot}/*",
        "webpack:///*": "*",
        "webpack:///./~/*": "${webRoot}/node_modules/*"
      }
    }
  ]
}
```
4.启动项目
``` js
npm start
```
5.设置断点
6.按“F5”键启动调试，会重新打开一个新窗口，同时Vs Code中代码执行到断点处则会暂停，也可打开开发者工具查看"Sources"输出结果情况
7. shift + F5 关闭调试

## 父子组件间传值
1. 父组件向子组件
> 父组件
``` js
<template>
    <div class="parent">
        <children v-bind:message="parentMsg"></children>
    </div>
</template>

<script>
import Children from '@/components/Children';
export default {
    name: 'Parent',
    components: {
        Children
    },
    data () {
        return {
            parentMsg: 'hell wordld ！'
        }
    }
}
</script>

<style>
</style>
```
> 子组件
``` js
<template>
    <div class="children">
        <p>{{message}}</p>
    </div>
</template>

<script>
export default {
    name: 'Children',
    props: ["message"]
}
</script>

<style>
</style>
```

2. 子组件向父组件传值
> 子组件
``` js
<template>
    <div class="children">
        <p>{{message}}</p>
        <button v-on:click="sendMsgToParent"></button>
    </div>
</template>

<script>
export default {
    name: 'Children',
    props: ["message"],
    data () {
      return {
        msg: 'this message is from child'
      }
    },
    methods: {
      sendMsgToParent () {
        this.$emit('listenToChildEvent', this.msg);
      }
    }
}
</script>

<style>
</style>
```
> 父组件
``` js
<template>
    <div class="parent">
        <children v-on:listenToChildEvent="showMsgFromChild"></children>
    </div>
</template>

<script>
import Children from '@/components/Children';
export default {
    name: 'Parent',
    components: {
        Children
    },
    data () {
        return {
            parentMsg: 'hell wordld ！'
        }
    },
    methods: {
      showMsgFromChild (data) {
        console.log(data);
      }
    }
}
</script>

<style>
</style>
```

## 组件命名规范
定义组件名的方式有两种：
``` js
1. 使用 kebab-case （当使用 kebab-case (短横线分隔命名) 定义一个组件时，你也必须在引用这个自定义元素时使用 kebab-case，例如 <my-component-name>。）
2. 使用 PascalCase （当使用 PascalCase (首字母大写命名) 定义一个组件时，你在引用这个自定义元素时两种命名法都可以使用。也就是说 <my-component-name> 和 <MyComponentName> 都是可接受的。）
::: danger 注意
尽管如此，直接在 DOM (即非字符串的模板) 中使用时**只有 kebab-case 是有效的**。
```
:::
## 动态组件

``` js
<template>
  <div class="dashboard-container">
    <component :is="currentRole"/> // 动态渲染组件
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import adminDashboard from './admin'
import editorDashboard from './editor'

export default {
  name: 'Dashboard',
  components: { adminDashboard, editorDashboard },
  data() {
    return {
      currentRole: 'adminDashboard'
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    if (!this.roles.includes('admin')) {
      this.currentRole = 'editorDashboard' // 某种情况下切换当前组件
    }
  }
}
</script>
```
## 异步加载
> 在大型应用中，我们可能需要将应用分割成小一些的代码块，并且只在需要的时候才从服务器加载一个模块。为了简化，Vue 允许你以一个工厂函数的方式定义你的组件，这个工厂函数会异步解析你的组件定义。Vue 只有在这个组件需要被渲染的时候才会触发该工厂函数，且会把结果缓存起来供未来重渲染。
``` js
export default { 
    components: { 
            Tooltip: () => import('./components/Tooltip') 
        } 
    }
```
::: warning 注意
使用() => import('./components/Tooltip')**替代**前面示例中的import Tooltip from "./components/Tooltip"。Vue一旦请求渲染将会延迟加载该组件。
:::
> 处理加载状态
``` js
onst AsyncComponent = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('./MyComponent.vue'),
  // 异步组件加载时使用的组件
  loading: LoadingComponent,
  // 加载失败时使用的组件
  error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
```

## keep-alive
> 当在这些组件之间切换的时候，你有时会想保持这些组件的状态，以**避免反复重渲染**导致的性能问题。

``` js
<!-- 失活的组件将会被缓存！-->
<keep-alive>
  <component v-bind:is="currentRole"></component>
</keep-alive>
```
::: danger 注意
这个keep-alive要求被切换到的组件都有自己的名字，不论是通过组件的 name 选项还是局部/全局注册。
::: 

## 全局注册组件

``` js
// src/main.js
import Welcome from './components/Welcome'
Vue.component('welcomes', Welcome); // 注意引号内的名称必须要和页面引用组件的名称一直，如welcomes对应<welcomes />
// 页面上直接调用 
<welcomes />
```
## 局部注册组件
``` js
// 页面直接引用，并调用
<template>
    <div>
        <welcomes />
    </div>
</template>

<script>
import Welcomes from '@/components/Welcome'
export default {
    components: {
        Welcomes
    }
}
</script>
```
## Prop
> Prop大小写

HTML 中的特性名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。这意味着当你使用 DOM 中的模板时，camelCase (驼峰命名法) 的 prop 名需要使用其等价的 kebab-case (短横线分隔命名) 命名：
``` js
// 引用组件页面
<cart-item :carts="carts" show-del="false"} />
// 组件页面
<script>
export default {
  name: "cart-item",
  props: {
    carts: {
      type: Array,
      default: () => { // 自定义初始值
        return [];
      }
    },
    showDel: {
      type: Boolean,
      default: false
    }
  }
};
</script>
```

## 插槽
> slot: 在父组件中的子组件的标签内部写上标签，然后在子组件用<slot></slot>引用。

父组件：
``` js
//slot组件
<template>
  <div class="slots">
      slot的用法
      <SlotChild>
          <div class="no-name">我是嵌在子组件内不具有属性名的标签</div>
      </SlotChild>
  </div>
</template>

<script>
import SlotChild from 'component/slotChild'
export default {
    name: 'slots',
    components:{
        SlotChild
    },
    data () {
        return {
      
        }
    }
}
</script>
```
子组件：
``` js
<template>
  <div class="slot-child">
　　　//在子组件中添加slot标签
      <slot></slot>
      我是slot的子组件
  </div>
</template>

<script>
export default {
  name: 'slotChild',
  data () {
    return {
      
    }
  }
}
</script>
```
> 最终显示结果：
``` sh
slot的用法
我是嵌在子组件内不具有属性名的标签
我是slot的子组件
```