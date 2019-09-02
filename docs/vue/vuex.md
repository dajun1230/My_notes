# Vuex

## 初出茅庐 来个小Demo
> Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。Vuex 也集成到 Vue 的官方调试工具 [[devtools extension](https://github.com/vuejs/vue-devtools)，提供了诸如零配置的 time-travel 调试、状态快照导入导出等高级调试功能。

1. 安装Vuex：
``` js
npm install vuex --save
```
需要注意的是这里一定要加上 –save，因为你这个包我们在生产环境中是要使用的。

2. 新建一个vuex文件夹（这个不是必须的），并在文件夹下新建store.js文件，文件中引入我们的vue和vuex。
``` js
import Vue from 'vue';
import Vuex from 'vuex';
```
3. 使用我们vuex，引入之后用Vue.use进行引用。

Vue.use(Vuex);
通过这三步的操作，vuex就算引用成功了，接下来我们就可以尽情的玩耍了。

**入门小Demo**

我们这个小案例先声明一个state的count状态，在页面中使用显示这个count，然后可以利用按钮进行加减。

1. 现在我们store.js文件里增加一个常量对象。store.js文件就是我们在引入vuex时的那个文件。
``` js
const state={
    count:1
}
```
2.用export default 封装代码，让外部可以引用。
``` js
export default new Vuex.Store({
	state
})
```
3. 新建一个vue的模板，位置在components文件夹下，名字叫count.vue。在模板中我们引入我们刚建的store.js文件，并在模板中用$store.state.count输出count 的值。
``` html
<template>
    <div>
        <h2>{{msg}}</h2>
        <hr/>
        <h3>{{$store.state.count}}</h3>
    </div>
</template>
<script>
    import store from '@/vuex/store' // 确保是一定要引用，否则出现$store找不到
    export default{
        data(){
            return{
                msg:'Hello Vuex',
            }
        },
        store // **必须写上**
    }
</script>
```
4. 在store.js文件中加入两个改变state的方法。
``` js
const mutations={ // mutations是固定写法，这里是改变的意思。
    add(state){
        state.count++;
    },
    reduce(state){
        state.count--;
    }
}
```
5. .vue模板中加入两个按钮，并调用mutations中的方法。
``` html
<div>
    <button @click="$store.commit('add')">+</button>
    <button @click="$store.commit('reduce')">-</button>
</div>
```
这样进行预览就可以实现对vuex中的count进行加减了。

## state访问状态对象
> 有三种方法可以通过state访问状态对象

**一、通过computed的计算属性直接赋值**

computed属性可以在输出前，对data中的值进行改变，我们就利用这种特性把store.js中的state值赋值给我们模板中的data值。

computed:{
    count(){
        return this.$store.state.count;
    }
}
这里需要注意的是return this.$store.state.count这一句，一定要写this，要不你会找不到$store的。这种写法很好理解，但是写起来是比较麻烦的，那我们来看看第二种写法。

二、通过mapState的对象来赋值

我们首先要用import引入mapState。

import {mapState} from 'vuex';
然后还在computed计算属性里写如下代码：

computed:mapState({
        count:state=>state.count
 })
这里我们使用ES6的箭头函数来给count赋值。

** 三、通过mapState的数组来赋值 **

 computed:mapState(["count"])
这个算是最简单的写法了，在实际项目开发当中也经常这样使用。