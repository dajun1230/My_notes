# Vuex
> 每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的状态 (state)。Vuex 和单纯的全局对象有以下两点不同：
``` sh
● Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
● 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交(commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。
```

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
``` js
computed:{
    count(){
        return this.$store.state.count;
    }
}
```
这里需要注意的是return this.$store.state.count这一句，一定要写this，要不你会找不到$store的。这种写法很好理解，但是写起来是比较麻烦的，那我们来看看第二种写法。

**二、通过mapState的对象来赋值**
mapState 函数返回的是一个对象，我们首先要用import引入mapState。
``` js
import {mapState} from 'vuex';
```
然后还在computed计算属性里写如下代码：
``` js
computed: mapState({
    count:state=>state.count
})
 ```
这里我们使用ES6的箭头函数来给count赋值。

**三、通过mapState的数组来赋值**
``` js
computed:mapState(["count"])
```
这个算是最简单的写法了，在实际项目开发当中也经常这样使用。

## Mutations修改状态
**$store.commit()**

Vuex提供了commit方法来修改状态，简单回顾一下，我们在button上的修改方法。
``` html
<button @click="$store.commit('add')">+</button>
<button @click="$store.commit('reduce')">-</button>
```
store.js文件：
``` js
const mutations={
    add(state){
        state.count++;
    },
    reduce(state){
        state.count--;
    }
}
```
**传值：**

这只是一个最简单的修改状态的操作，在实际项目中我们常常需要在修改状态时传值。比如上边的例子，是我们每次只加1，而现在我们要通过所传的值进行相加。其实我们只需要在Mutations里再加上一个参数，并在commit的时候传递就就可以了。我们来看具体代码：

现在store.js文件里给add方法加上一个参数n。添加的地方我已经标黄了。
``` js
const mutations={
    add(state,n){
        state.count+=n;
    },
    reduce(state){
        state.count--;
    }
}
```
在Count.vue里修改按钮的commit()方法传递的参数，我们传递10，意思就是每次加10.
``` html
<p>
   <button @click="$store.commit('add',10)">+</button>
   <button @click="$store.commit('reduce')">-</button>
</p>
```
这样两个简单的修改我们就完成了传值，我们可以在浏览器中实验一下了。

**模板获取Mutations方法**

实际开发中我们也不喜欢看到$store.commit()这样的方法出现，我们希望跟调用模板里的方法一样调用。

例如：@click=”reduce” 就和引用vuex插件一样。

要达到这种写法，只需要简单的两部就可以了：

1. vue里用import 引入我们的mapMutations：
``` js
import { mapState, mapMutations } from 'vuex';
```
2.在模板的script标签里添加methods属性，并加入mapMutations
``` js
methods: mapMutations(['add','reduce']),
```
通过上边两部，我们已经可以在模板中直接使用我们的reduce或者add方法了，就像下面这样。
``` html
<button @click="reduce">-</button>
```

## getters计算过滤操作
getters从表面是获得的意思，可以把他看作在获取数据之前进行的一种再编辑,相当于对数据的一个过滤和加工。你可以把它看作store.js的计算属性。

** getters基本用法：**

比如我们现在要对store.js文件中的count进行一个计算属性的操作，就是在它输出前，给它加上100。（getters接收两个参数，第一个参数是state，第二个参数是其他getter）

我们首先要在store.js里用const声明我们的getters属性。
``` js
const getters = {
    count:function(state n=100){
        return state.count += n;
    }
}
```
写好了gettters之后，我们还需要在Vuex.Store()里引入，由于之前我们已经引入了state盒mutations，所以引入里有三个引入属性。代码如下，
``` js
export default new Vuex.Store({
    state,mutations,getters
})
```
在store.js里的配置算是完成了，我们需要到模板页对computed进行配置。在vue 的构造器里边只能有一个computed属性，如果你写多个，只有最后一个computed属性可用，所以要对上节课写的computed属性进行一个改造。改造时我们使用ES6中的展开运算符”…”。
``` js
computed:{
    ...mapState(["count"]),
    count(){
        return this.$store.getters.count;
    }
},
```
需要注意的是，你写了这个配置后，在每次count 的值发生变化的时候，都会进行加100的操作。

**用mapGetters简化模板写法：**

我们都知道state和mutations都有map的引用方法把我们模板中的编码进行简化，我们的getters也是有的，我们来看一下代码。

首先用import引入我们的`mapGetters
``` js
import { mapState,mapMutations,mapGetters } from 'vuex';
```
在computed属性中加入mapGetters
``` js
...mapGetters(["count"])
```

## actions异步修改状态
actions和之前讲的Mutations功能基本一样，不同点是，actions是异步的改变state状态，而Mutations是同步改变状态。(即actions 提交的是 mutation，而不是直接变更状态；actions可以包含任意异步操作。)
::: warning 注意
actions 函数接受一个与 store 实例具有相同方法和属性的 context 对象，因此你可以调用 context.commit 提交一个 mutation，或者通过 context.state 和 context.getters 来获取 state 和 getters。
:::
在store.js中声明actions，actions是可以调用Mutations里的方法的，我们还是继续在上节课的代码基础上进行学习，在actions里调用add和reduce两个方法。
``` js
const actions ={
    addAction(context){
        context.commit('add',10)
    },
    reduceAction({commit}){
        commit('reduce')
    }
}
```
在actions里写了两个方法addAction和reduceAction，在方法体里，我们都用commit调用了Mutations里边的方法。细心的小伙伴会发现这两个方法传递的参数也不一样。
``` sh
● context：上下文对象，这里你可以理解称store本身。
● {commit}：直接把commit对象传递过来，可以让方法体逻辑和代码更清晰明了。
```
** 模板中的使用** 我们需要在count.vue模板中编写代码，让actions生效。我们先复制两个以前有的按钮，并改成我们的actions里的方法名，分别是：addAction和reduceAction。
``` html
<p>
    <button @click="addAction">+</button>
    <button @click="reduceAction">-</button>
</p>
```
改造一下我们的methods方法，首先还是用扩展运算符把mapMutations和mapActions加入。
``` js
methods:{
    ...mapMutations(['add','reduce']),
    ...mapActions(['addAction','reduceAction'])
},
```
你还要记得用import把我们的mapActions引入才可以使用。

**分发 actions**

actions 通过 store.dispatch 方法触发：
``` js
store.dispatch('increment')
```
乍一眼看上去感觉多此一举，我们直接分发 mutation 岂不更方便？实际上并非如此，还记得 mutation 必须同步执行这个限制么？actions 就不受约束！我们可以在 actions 内部执行异步操作：
``` js
actions: {
  incrementAsync ({ commit }) {
    setTimeout(() => {
      commit('increment')
    }, 1000)
  }
}
```
actions 支持同样的载荷方式和对象方式进行分发：
``` js
// 以载荷形式分发
store.dispatch('incrementAsync', {
  amount: 10
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  amount: 10
})
```
**增加异步检验** 

我们现在看的效果和我们用Mutations作的一模一样，肯定有的小伙伴会好奇，那actions有什么用，我们为了演示actions的异步功能，我们在store.js的actions的addAction方法中增加一个计时器（setTimeOut）延迟执行。在addAction里使用setTimeOut进行延迟执行。
``` js
setTimeOut(()=>{context.commit(reduce)},3000);
console.log('我比reduce提前执行');
```
我们可以看到在控制台先打印出了‘我比reduce提前执行’这句话。

**在组件中分发 actions**

你在组件中使用 this.$store.dispatch('xxx') 分发 action，或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）：
``` js
import { mapActions } from 'vuex'

export default {
  // ...
  methods: {
    ...mapActions([
      'increment', // 将 `this.increment()` 映射为 `this.$store.dispatch('increment')`

      // `mapActions` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.dispatch('incrementBy', amount)`
    ]),
    ...mapActions({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
    })
  }
}
```

**组合 Action**

actions 通常是异步的，那么如何知道 actions 什么时候结束呢？更重要的是，我们如何才能组合多个 actions，以处理更加复杂的异步流程？

首先，你需要明白 store.dispatch 可以处理被触发的 actions 的处理函数返回的 Promise，并且 store.dispatch 仍旧返回 Promise：
``` js
actions: {
  actionA ({ commit }) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('someMutation')
        resolve()
      }, 1000)
    })
  }
}
```
现在你可以：
``` js
store.dispatch('actionA').then(() => {
  // ...
})
```
在另外一个 action 中也可以：
``` js
actions: {
  // ...
  actionB ({ dispatch, commit }) {
    return dispatch('actionA').then(() => {
      commit('someOtherMutation')
    })
  }
}
```
最后，如果我们利用 async / await，我们可以如下组合 action：

// 假设 getData() 和 getOtherData() 返回的是 Promise
``` js
actions: {
  async actionA ({ commit }) {
    commit('gotData', await getData())
  },
  async actionB ({ dispatch, commit }) {
    await dispatch('actionA') // 等待 actionA 完成
    commit('gotOtherData', await getOtherData())
  }
}
```
一个 store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行。

##　module模块组
**声明模块组：**

在vuex/store.js中声明模块组，我们还是用我们的const常量的方法声明模块组。代码如下：
``` js
const moduleA = {
    state,mutations,getters,actions
}
```
声明好后，我们需要修改原来 Vuex.Stroe里的值：
``` js
export default new Vuex.Store({
    modules:{a:moduleA}
})
```
**在模板中使用** 现在我们要在模板中使用count状态，要用插值的形式写入。
``` html
<h3>{{$store.state.a.count}}</h3>
```
如果想用简单的方法引入，还是要在我们的计算属性中rutrun我们的状态。写法如下：
``` js
computed:{
    count(){
        return this.$store.state.a.count;
    }
},
```