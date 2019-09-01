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
      name: 'Hello',     // 路由名称，
      component: Hello   // 对应的组件模板
    }
  ]
})
```
**增加一个Hi的路由和页面**

具体操作步骤：
``` sh
● 在src/components目录下，新建 Hi.vue 文件。
● 编写文件内容，和我们之前讲过的一样，文件要包括三个部分<template><script>和<style>。文件很简单，只是打印一句话。
```
Hi页面代码如下：
``` js
<template>
    <div>
        {{message}}
    </div>
</template>

<script>
export default {
    name: 'Hi',
    data () {
        return {
            message: 'Hi, I am 小明'
        }
    }
}
</script>

<style>

</style>
```
引入 Hi组件：我们在router/index.js文件的上边引入Hi组件
``` js
import Hi from '@/components/Hi'
```
增加路由配置：在router/index.js文件的routes[]数组中，新增加一个对象，代码如下。
``` js
{
  path:'/hi',
  name:'Hi',
  component:Hi
}
```
src/router/index.js：
``` js
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hi from '@/components/Hi'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }, {
      path: '/hi',
      name: 'Hi',
      component: Hi
    }
  ]
})
```
**router-link制作导航**
``` js
<router-link to="/">显示字段</router-link>
```
● to：是我们的导航路径，要填写的是你在router/index.js文件里配置的path值，如果要导航到默认首页，只需要写成 to=”/” ，
● 显示字段 ：就是我们要显示给用户的导航名称，比如首页 新闻页。

明白了router-link的基本语法，我们在 src/App.vue文件中的template里加入下面代码，实现导航。
``` js
<p>导航 ：
   <router-link to="/">首页</router-link>
   <router-link to="/hi">Hi页面</router-link>
</p>
```

## vue-router配置子路由
**一、改造App.vue的导航代码**

我们需要先改造app.vue的导航代码，来实现基本的导航功能。我们用<router-link>标签增加了两个新的导航链接。

**App.vue代码**
``` js
<p>导航 ：
      <router-link to="/">首页</router-link> | 
      <router-link to="/hi">Hi页面</router-link> |
      <router-link to="/hi/hi1">-Hi页面1</router-link> |
      <router-link to="/hi/hi2">-Hi页面2</router-link>
</p>
```
这时候我们再访问主页的时候导航栏就发生了变化。多出了两个自导航：Hi页面1 和 Hi页面2

**二、改写components/Hi.vue页面**

把Hi.vue改成一个通用的模板，加入router-view标签，给子模板提供插入位置。“Hi页面1” 和 “Hi页面2” 都相当于“Hi页面”的子页面，有点想继承关系。我们在“Hi页面”里加入router-view标签。
::: warning 注意
切记要在顶层页面中用router-view标签占位置，如果没有写，页面不会报错，不容易问题发现原因。
:::
**components/Hi.vue,就是第5行的代码，其他代码不变。**
``` js
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <router-view></router-view>
  </div>
</template>
 
<script>
export default {
  name: 'hi',
  data () {
    return {
      msg: 'Hi, I am 小明'
    }
  }
}
</script>
<style scoped>
 
</style>
```
**三、在components目录下新建两个组件模板 Hi1.vue 和 Hi2.vue**

新建的模板和Hi.vue没有太多的差别，知识改变了data中message的值，也就是输出的结果不太一样了。 Hi1.vue：
``` js
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>
<script>
export default {
  name: 'hi',
  data () {
    return {
      msg: 'Hi, I am Hi1!'
    }
  }
}
</script>
<style scoped>
 
</style>
```
Hi2.vue：
``` js
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>
<script>
export default {
  name: 'hi',
  data () {
    return {
      msg: 'Hi, I am Hi2'
    }
  }
}
</script>
<style scoped>
</style>
```
四、修改router/index.js代码 我们现在导航有了，母模板和子模板也有了，只要改变我们的路由配置文件就可以了。子路由的写法是在原有的路由配置下加入children字段。
``` js
children:[
{path:'/',component:xxx},
{path:'xx',component:xxx},
]
```
children字段后边跟的是个数组，数组里和其他配置路由基本相同，需要配置path和component。具体看一下这个子路由的配置写法。
``` js
import Vue from 'vue'   
import Router from 'vue-router'  
import Hello from '@/components/Hello'  
import Hi from '@/components/Hi' 
import Hi1 from '@/components/Hi1' 
import Hi2 from '@/components/Hi2' 
 
Vue.use(Router) 
 
export default new Router({
  routes: [             
    {                    
      path: '/',        
      name: 'Hello',     
      component: Hello   
    },{
      path:'/hi',
      name: 'hi',
      component:Hi,
      children:[
        {path:'hi1',component:Hi1},
        {path:'hi2',component:Hi2},
      ]
    }
  ]
})
```
需要注意的是，在配置路由文件前，需要先用import引入Hi1和Hi2。

## vue-router如何参数传递
**一、用name传递参数**

在路由文件src/router/index.js里配置name属性。
``` js
routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }
 ]
 ```
模板里(src/App.vue)用$route.name的形势接收，比如直接在模板中显示：
``` js
<p>{{ $route.name}}</p>
```

**二、通过router-link标签中的to传参**

我们用router-link标签中的to属性进行传参，需要您注意的是这里的to要进行一个绑定，写成:to。先来看一下这种传参方法的基本语法：

1. to集合name、params，用$route.params来接收
``` js
<router-link :to="{name: xxx, params:{key:value}}">valueString</router-link>
```
这里的to前边是带冒号的，然后后边跟的是一个对象形势的字符串.
``` sh
● name：就是我们在路由配置文件中起的name值。
● params：就是我们要传的参数，它也是对象形势，在对象里可以传递多个值。
```
了解基本的语法后，我们改造一下我们的src/App.vue里的router-link标签,我们把hi1页面的router-link进行修改。
``` js
<router-link :to="{name:'hi1',params:{username:'jspang'}}">Hi页面1</router-link>
```
把src/reouter/index.js文件里给hi1配置的路由起个name,就叫hi1.
``` js
{path:'/hi1',name:'hi1',component:Hi1},
```
最后在模板里(src/components/Hi1.vue)用$route.params.username进行接收.
``` js
{{$route.params.username}}
```
::: warning 注意
to中的name的值必须与router中当前路由的name相对应。
:::
2. to集合path、query，用$route.query来接收
``` js
<router-link :to="{path: xxx, query:{key:value}}">valueString</router-link>
```
这里的to前边是带冒号的，然后后边跟的是一个对象形势的字符串.
``` sh
● path：就是我们在路由配置文件中起的path的值。
● query：就是我们要传的参数，它也是对象形势，在对象里可以传递多个值。
```
了解基本的语法后，我们改造一下我们的src/App.vue里的router-link标签,我们把hi1页面的router-link进行修改。
``` js
<router-link :to="{path: '/hi', query:{key:value}}">valueString</router-link>
```
最后在模板里(src/components/Hi1.vue)用$route.query.username进行接收.
``` js
{{$route.query.username}}
```
::: warning 注意
to中的path的值必须与router中当前路由的path相对应。
:::
两种方法的区别：
``` sh
1. name、params的传值方式不可见，但是在页面刷新之后，值就不会存在了，即不能获取到值。
2. path、query的传值方式在url地址栏处可见，是通过“?xx=xxx&xx=xxx”拼接显示，页面刷新后，值依旧存在，即能获取到值。
```

## 单页面多路由区域操作

单页面多路由区域操作即在一个页面里我们有2个以上router-view区域，我们通过配置路由的js文件，来操作这些区域的内容。例如我们在src/App.vue里加上两个router-view标签。我们用vue-cli建立了新的项目，并打开了src目录下的App.vue文件，在router-view下面新写了两行router-view标签,并加入了些CSS样式。
``` js
<router-view/>
<router-view name="left" style="float:left;width: 50%;background: yellow;height: 200px;" />
<router-view name="right" style="float:right;width: 50%;background: green;height: 200px;" />
 ```
现在的页面中有了三个router-view标签，也就是说我们需要在路由里配置这三个区域，配置主要是在components字段里进行。
``` js
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hi from '@/components/Hi'
import Hi1 from '@/components/Hi1'
import Hi2 from '@/components/Hi2'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      components: { // 注意这里是components，不是component
        default: HelloWorld, // default固定，对应第一个router-view
        left: Hi1, // left必须与router-view中的name属性的值一致
        right: Hi2 // right必须与router-view中的name属性的值一致
      }
    }, {
      path: '/hi',
      name: 'Hi',
      component: Hi,
      children: [
        {
          path: 'hi1',
          name: 'hi1',
          component: Hi1},
        {path: 'hi2', component: Hi2}
      ]
    }
  ]
})
```

## vue-router 利用url传递参数

**冒号(:)的形式传递参数**

我们可以在理由配置文件里以:冒号的形式传递参数，这就是对参数的绑定，在配置文件里以冒号的形式设置参数。我们在/src/router/index.js文件里配置路由。
``` js
{
  path: '/params/:newsId/:newsTitle',
  component: Params
}
```
我们需要传递参数是新闻ID（newsId）和新闻标题（newsTitle）.所以我们在路由配置文件里制定了这两个值。

在src/components目录下建立我们params.vue组件，也可以说是页面。我们在页面里输出了url传递的的新闻ID和新闻标题。
``` js
<template>
    <div>
        <h2>{{ msg }}</h2>
        <p>新闻ID：{{ $route.params.newsId}}</p>
        <p>新闻标题：{{ $route.params.newsTitle}}</p>
    </div>
</template>
 
<script>
export default {
  name: 'params',
  data () {
    return {
      msg: 'params page'
    }
  }
}
</script>
```
在App.vue文件里加入我们的router-view标签。这时候我们可以直接利用url传值了。
``` js
<router-link to="/params/198/xiaoming website is very good">params</router-link>
```

## vue-router 的重定向-redirect
开发中有时候我们虽然设置的路径不一致，但是我们希望跳转到同一个页面，或者说是打开同一个组件。这时候我们就用到了路由的重新定向redirect参数。

**redirect基本重定向**

我们只要在路由配置文件中（/src/router/index.js）把原来的component换成redirect参数就可以了。我们来看一个简单的配置。
``` js
export default new Router({
  routes: [
    {
      path: '/',
      component: Hello
    },{
      path:'/params/:newsId(\\d+)/:newsTitle',
      component:Params
    },{
      path:'/goback',
      redirect:'/'
    }
 
  ]
})
```
**重定向时传递参数**

我们已经学会了通过url来传递参数，那我们重定向时如果也需要传递参数怎么办？其实vue也已经为我们设置好了，我们只需要在ridirect后边的参数里复制重定向路径的path参数就可以了。可能你看的有点晕，我们来看一段代码：
``` js
{
  path:'/params/:newsId(\\d+)/:newsTitle',
  component:Params
},{
  path:'/goParams/:newsId(\\d+)/:newsTitle',
  redirect:'/params/:newsId(\\d+)/:newsTitle'
}
```

## alias别名的使用
使用alias别名的形式，我们也可以实现类似重定向的效果。

1.首先我们在路由配置文件里（/src/router/index.js），给上节课的Home路径起一个别名，jspang。
``` js
{
  path: '/hi1',
  component: Hi1,
  alias:'/gohi1' // alias的值需要和router-link中的to的值要相同
}
```
2.配置我们的router-link，起过别名之后，可以直接使用router-link标签里的to属性，进行重新定向。
``` js
<router-link to="/gohi1">goHi页面</router-link>
```
**redirect和alias的区别**
``` sh
● redirect：仔细观察URL，redirect是直接改变了url的值，把url变成了真实的path路径。
● alias：URL路径没有别改变，这种情况更友好，让用户知道自己访问的路径，只是改变了<router-view>中的内容。
```
**填个小坑：** 

别名请不要用在path为"/"中，如下代码的别名是不起作用的。
``` js
{
  path: '/',
  component: Hello,
  alias:'/home'
}
``` 

## 路由的过渡动画
**transition标签**

想让路由有过渡动画，需要在router-view标签的外部添加transition标签，标签还需要一个name属性。
``` js
<transition name="fade">
  <router-view ></router-view>
</transition>
```
我们在/src/App.vue文件里添加了transition标签，并给标签起了一个名字叫fade。

**css过渡类名：** 

组件过渡过程中，会有四个CSS类名进行切换，这四个类名与transition的name属性有关，比如name=”fade”,会有如下四个CSS类名：
``` sh
● fade-enter:进入过渡的开始状态，元素被插入时生效，只应用一帧后立刻删除。
● fade-enter-active:进入过渡的结束状态，元素被插入时就生效，在过渡过程完成后移除。
● fade-leave:离开过渡的开始状态，元素被删除时触发，只应用一帧后立刻删除。
● fade-leave-active:离开过渡的结束状态，元素被删除时生效，离开过渡完成后被删除。
```
从上面四个类名可以看出，fade-enter-active和fade-leave-active在整个进入或离开过程中都有效，所以CSS的transition属性在这两个类下进行设置。

那我们就在App.vue页面里加入四种CSS样式效果，并利用CSS3的transition属性控制动画的具体效果。代码如下：
``` html
.fade-enter {
  opacity:0;
}
.fade-leave{
  opacity:1;
}
.fade-enter-active{
  transition:opacity .5s;
}
.fade-leave-active{
  opacity:0;
  transition:opacity .5s;
}
```
上边的代码设置了改变透明度的动画过渡效果，但是默认的mode模式in-out模式，这并不是我们想要的。下面我们学一下mode模式。

**过渡模式mode：**
``` sh
● in-out:新元素先进入过渡，完成之后当前元素过渡离开。
● out-in:当前元素先进行过渡离开，离开完成后新元素过渡进入。
```

## mode的设置和404页面的处理

**mode的两个值**
``` sh
● histroy: 当你使用 history 模式时，URL 就像正常的 url，例如 http://www.baidu.com，也好看！
● hash: 默认’hash’值，但是hash看起来就像无意义的字符排列，不太好看也不符合我们一般的网址浏览习惯。
```
具体用法：
``` js
export default new Router({
  mode: 'history', // history 是无#，hash 有#
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      components: HelloWorld
    },
```

**404页面的设置：**

用户会经常输错页面，当用户输错页面时，我们希望给他一个友好的提示，为此美工都会设计一个漂亮的页面，这个页面就是我们常说的404页面。vue-router也为我们提供了这样的机制.

1.设置我们的路由配置文件（/src/router/index.js）：
``` js
{
   path:'*',
   component: Error
}
```
这里的path:’*’就是找不到页面时的配置，component是我们新建的一个Error.vue的文件。

2.新建404页面：

在/src/components/文件夹下新建一个Error.vue的文件。简单输入一些有关错误页面的内容。
``` js
<template>
    <div>
        <h2>{{ msg }}</h2>
    </div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'Error:404'
    }
  }
}
</script>
```
3.我们在用router-link瞎写一个标签的路径。
``` js
<router-link to="/bbbbbb">我是瞎写的</router-link>
```

## 路由中的钩子

我们知道一个组件从进入到销毁有很多的钩子函数，同样在路由中也设置了钩子函数。路由的钩子选项可以写在路由配置文件中，也可以写在我们的组件模板中。

**路由配置文件中的钩子函数**

我们可以直接在路由配置文件（/src/router/index.js）中写钩子函数。但是在路由文件中我们只能写一个beforeEnter,就是在进入此路由配置时。先来看一段具体的代码：
``` js
{
  path:'/params/:newsId(\\d+)/:newsTitle',
  component:Params,
  beforeEnter:(to,from,next)=>{
    console.log('我进入了params模板');
    console.log(to);
    console.log(from);
    next();
},
```
我们在params路由里配置了bdforeEnter得钩子函数，函数我们采用了ES6的箭头函数，需要传递三个参数。我们并在箭头函数中打印了to和from函数。具体打印内容可以在控制台查看object。

**三个参数：**
``` sh
● to:路由将要跳转的路径信息，信息是包含在对像里边的。
● from:路径跳转前的路径信息，也是一个对象的形式。
● next:路由的控制参数，常用的有next(true)和next(false)。
```

**写在模板中的钩子函数**

在配置文件中的钩子函数，只有一个钩子-beforeEnter，如果我们写在模板中就可以有两个钩子函数可以使用：
``` sh
● beforeRouteEnter：在路由进入前的钩子函数。
● beforeRouteLeave：在路由离开前的钩子函数。
```
具体用法如下：
``` js
export default {
  name: 'params',
  data () {
    return {
      msg: 'params page'
    }
  },
  beforeRouteEnter:(to,from,next)=>{
    console.log("准备进入路由模板");
    next();
  },
  beforeRouteLeave: (to, from, next) => {
    console.log("准备离开路由模板");
    next();
  }
}
</script>
```
这是我们写在params.vue模板里的路由钩子函数。它可以监控到路由的进入和路由的离开，也可以轻易的读出to和from的值。

## 编程式导航

**this.$router.go(-1) 和 this.$router.go(1)**

这两个编程式导航的意思是后退和前进，功能跟我们浏览器上的后退和前进按钮一样，这在业务逻辑中经常用到。比如条件不满足时，我们需要后退。

router.go(-1)代表着后退，我们可以让我们的导航进行后退，并且我们的地址栏也是有所变化的。

1.我们先在app.vue文件里加入一个按钮，按钮并绑定一个goback( )方法。
``` js
<button @click="goback">后退</button>
```
2.在我们的script模块中写入goback()方法，并使用this.$router.go(-1),进行后退操作。
``` js
<script>
export default {
  name: 'app',
  methods:{
    goback(){
      this.$router.go(-1);
    }
  }
}
</script>
```
打开浏览器进行预览，这时我们的后退按钮就可以向以前的网页一样后退了。

router.go(1):代表着前进，用法和后退一样，我在这里就不重复码字了（码字辛苦希望大家理解）。
``` js
this.$router.push(‘/xxx ‘)
```
这个编程式导航都作用就是跳转，比如我们判断用户名和密码正确时，需要跳转到用户中心页面或者首页，都用到这个编程的方法来操作路由。

我们设置一个按钮，点击按钮后回到站点首页。

1.先编写一个按钮，在按钮上绑定goHome()方法。
``` js
<button @click="goHome">回到首页</button>
```
2.在script模块里加入goHome方法，并用this.$router.push(‘/’)导航到首页
``` js
export default {
  name: 'app',
  methods:{
    goback(){
      this.$router.go(-1);
    },
    goHome(){
      this.$router.push('/');
    }
  }
}
```