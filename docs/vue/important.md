# 重要

## 组件命名规范
定义组件名的方式有两种：
1. 使用 kebab-case （当使用 kebab-case (短横线分隔命名) 定义一个组件时，你也必须在引用这个自定义元素时使用 kebab-case，例如 <my-component-name>。）
2. 使用 PascalCase （当使用 PascalCase (首字母大写命名) 定义一个组件时，你在引用这个自定义元素时两种命名法都可以使用。也就是说 <my-component-name> 和 <MyComponentName> 都是可接受的。）
::: danger 注意
尽管如此，直接在 DOM (即非字符串的模板) 中使用时**只有 kebab-case 是有效的**。
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
这个 <keep-alive> 要求被切换到的组件都有自己的名字，不论是通过组件的 name 选项还是局部/全局注册。
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