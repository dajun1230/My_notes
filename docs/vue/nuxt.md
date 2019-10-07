# Nuxt 服务端渲染

## nuxt介绍
Nuxt.js简单的说是Vue.js的通用框架，最常用的就是用来作SSR（服务器端渲染）。再直白点说，就是Vue.js原来是开发SPA（单页应用）的，但是随着技术的普及，很多人想用Vue开发多页应用，并在服务端完成渲染。这时候就出现了Nuxt.js这个框架，它简化了SSR的开发难度。还可以直接用命令把我们制作的vue项目生成为静态html。

### 那服务器端渲染到底有什么好处那？

最主要的原因时SPA（单页应用）不利于搜索引擎的SEO操作。比如你作一个新闻网站，流量的一个主要来源是通过百度、谷歌、bing这些搜索引擎，但是它们对SPA的抓取并不好，特别是百度根本没法抓取到SPA的内容页面，所以我们必须把我们的应用在服务端渲染成适合搜索引擎抓取的页面，再下载到客户端。那Nuxt.js适合作新闻、博客、电影、咨询这样的需要搜索引擎提供流量的项目。如果你要作移动端的项目，就没必要使用这个框架了。（其实Nuxt.js个人觉的是一个解决方案）

### 什么是SSR？
SSR，即服务器渲染，就是在服务器端将对Vue页面进行渲染生成html文件，将html页面传递给浏览器。

### SSR两个优点：
SEO 不同于SPA的HTML只有一个无实际内容的HTML和一个app.js，SSR生成的HTML是有内容的，这让搜索引擎能够索引到页面内容。
更快内容到达时间 传统的SPA应用是将bundle.js从服务器获取，然后在客户端解析并挂载到dom。而SSR直接将HTML字符串传递给浏览器。大大加快了首屏加载时间。
``` sh
Nuxt.js的官方网站是这样介绍的：

Nuxt.js 是一个基于 Vue.js 的通用应用框架。 通过对客户端/服务端基础架构的抽象组织，Nuxt.js 主要关注的是应用的 UI渲染。
```
Nuxt.js是特点（优点）：

● 基于 Vue.js  
● 自动代码分层 
● 服务端渲染  
● 强大的路由功能，支持异步数据  
● 静态文件服务  
● ES6/ES7 语法支持  
● 打包和压缩 JS 和 CSS  
● HTML头部标签管理  
● 本地开发支持热加载  
● 集成ESLint  
● 支持各种样式预处理器： SASS、LESS、 Stylus等等

## 环境搭建和Hello World
### nuxt.js安装（2种方式）
● 官方推荐方式  
● 通过Vue 2.x版本进行安装

### 1. 官方推荐安装方式
为了快速入门，Nuxt.js团队创建了脚手架工具 create-nuxt-app。（[官网](https://zh.nuxtjs.org/guide/installation/)）

确保安装了npx（npx在NPM版本5.2.0默认安装了）：
``` sh
npx create-nuxt-app <项目名>
# 建议使用cmd命令台进行输入命令安装，如果报错，可以尝试安装 npm install -g npx
```
或
``` sh
yarn create nuxt-app <项目名>
# 在使用yarn之前，需要在全局安装yarn， npm install -g yarn
```
### 2. 通过Vue 2.x版本进行安装

**1.用npm来安装vue-cli这个框架，如果你已经安装过了，可以省略这步。**
``` js
npm install -g vue-cli // 全局安装Vue 2.x版本
```
这个根据你的网络环境不同，安装的速度不仅相同，如果你的网络环境实在不好，可以考虑使用cnpm来进行安装。（在实际开发中我会尽量避免使用cnpm来进行安装，因为会出现一些未知的错误。）

安装完成后可以使用vue -V 来测试是否安装成功。（注意：这里要使用大写的V，小写无效）。

**2.使用vue安装 nuxt**

安装好vue-cli后，就可以使用init命令来初始化Nuxt.js项目。
``` js
vue init nuxt/starter
```
这时候他会在github上下载模版，然后会询问你项目的名称叫什么，作者什么的，这些完全可以根据自己的爱好填写。

**3.使用npm install安装依赖包**
``` js
npm install
```
这个过程是要等一会的，如果你这个过程安装失败，也不要慌张，你可以直接诶删除项目中的node_modules文件夹后，重新npm install进行安装。

**4.使用npm run dev 启动服务**
``` js
npm run dev
```
**5.在浏览器输入 localhost:3000,可以看到结果。**

Hello World

学程序国际惯例的第一节都是来个Hello World ，我们先来体验一下。

在项目根目录下找到/pages/index.vue文件，让后把项目名称改写成Hello World。框架支持热更新，所以你不用刷新就自动更新了。

## 目录结构详讲
**目录结构：**

Nuxt自动生产了项目目录，我们先来一个一个介绍一下。
``` js
|-- .nuxt                    // Nuxt自动生成，临时的用于编辑的文件，build
|-- assets                   // 用于组织未编译的静态资源入LESS、SASS 或 JavaScript
|-- components               // 用于自己编写的Vue组件，比如滚动组件，日历组件，分页组件
|-- layouts                  // 布局目录，用于组织应用的布局组件，不可更改。
|-- middleware               // 用于存放中间件
|-- pages                    // 用于存放写的页面，我们主要的工作区域
|-- node_modules             // 用于存放项目依赖包
|-- plugins                  // 用于存放JavaScript插件的地方
|-- static                   // 用于存放静态资源文件，比如图片
|-- store                    // 用于组织应用的Vuex 状态管理。
|-- .editorconfig            // 开发工具格式配置
|-- .eslintrc.js             // ESLint的配置文件，用于检查代码格式
|-- .gitignore               // 配置git不上传的文件
|-- nuxt.config.json         // 用于组织Nuxt.js应用的个性化配置，已覆盖默认配置
|-- package-lock.json        // npm自动生成，用于帮助package的统一性设置的，yarn也有相同的操作
|-- package.json             // npm包管理配置文件
```

## 常用配置项
**配置IP和端口：**

开发中经常会遇到端口被占用或者指定IP的情况。我们需要在根目录下的package.json里对config项进行配置。比如现在我们想把IP配置成192.168.32.15，端口设置8888。

/package.json
``` js
"config": {
    "nuxt": {
      "host": "192.168.32.15",
      "port": "8888"
    }
},
```
配置好后，我们在终端中输入npm run dev，然后你会看到服务地址改为了192.168.32.15:8888.

**配置全局CSS**

在开发多页项目时，都会定义一个全局的CSS来初始化我们的页面渲染，比如把padding和margin设置成0，网上也有非常出名的开源css文件normailze.css。要定义这些配置，需要在nuxt.config.js里进行操作。

比如现在我们要把页面字体设置为红色，就可以在assets/css/normailze.css文件，然后把字体设置为红色。

/assets/css/normailze.css
``` js
html{
    color:red;
}
```
/nuxt.config.js
``` js
css:['~assets/css/normailze.css'], // ~ 匹配符，匹配到根目录
```
pages文件夹下新建user.vue，其内容为：
``` html
<template>
    <div>Hello World!</div>
</template>
```

设置好后，在终端输入npm run dev 。然后你会发现"Hello World!"字体已经变成了红色。

**配置webpack的loader**

在nuxt.config.js里是可以对webpack的基本配置进行覆盖的，比如现在我们要配置一个url-loader来进行小图片的64位打包。就可以在nuxt.config.js的build选项里进行配置。
``` js
build: {
    loaders:[
      {
        test:/\.(png|jpe?g|gif|svg)$/,
        loader:"url-loader",
        query:{
          limit:10000,
          name:'img/[name].[hash].[ext]'
        }
      }
    ],
 
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
}
```

## 路由配置和参数传递
简单的说路由就是我们的跳转机制，也可以简单理解成链接跳转。Nuxt.js的路由并不复杂，它给我们进行了封装，让我们节省了很多配置环节。

**简单路由Demo**

我们现在根目录的pages文件下新建两个文件夹，about和news（模仿关于我们和新闻的功能模块，如果此处不清楚请看视频）。

在about文件夹下新建index.vue文件，并写入下面的代码：
``` html
<template>
  <div>
      <h2>About Index page</h2>
      <ul>
        <li><a href="/">Home</a></li>
      </ul>
  </div>
</template>
```
在news文件夹下新建index.vue文件，并写入下面的代码：
``` html
<template>
  <div>
      <h2>News Index page</h2>
       <ul>
        <li><a href="/">Home</a></li>
      </ul>
  </div>
</template>
```
修改原来的pages文件夹下的index.vue，删除没用的代码，写入下面链接代码：
``` html
<template>
  <div>
    <ul>
      <li><a href="/">HOME</a></li>
      <!-- about为文件名，确保地址一定要和文件名相同 -->
      <li><a href="/about">ABOUT</a></li>
      <li><a href="/news">NEWS</a></li>
    </ul>
  </div>
</template>
 
<script>
export default {
  components: {
   
  }
}
</script>
 
<style>
 
</style>
```
这个小例子作完，你会发现这一切太简单了，因为Nuxt.js都为我们作好了，不用写任何配置代码。

### nuxt-link 标签
虽然上面的例子跳转已经成功，但是Nuxt.js并不推荐这种a标签的作法，它为我们准备了nuxt-link标签（vue中叫组件）。我们先把首页的a标签替换成nuxt-link。
``` html
<template>
  <div>
    <ul>
      <li><nuxt-link :to="{name:'index'}">HOME</nuxt-link></li>
      <li><nuxt-link :to="{name:'about'}">ABOUT</nuxt-link></li>
      <li><nuxt-link :to="{name:'news'}">NEWS</nuxt-link></li>
    </ul>
  </div>
</template>
 
<script>
export default {
  components: {
   
  }
}
</script>
 
<style>
 
</style>
```
我们再次预览页面，也是可以进行正常跳转的，在实际开发中尽量使用标签的方法跳转路由。

### params传递参数
路由经常需要传递参数，我们可以简单的使用params来进行传递参数，我们现在向新闻页面（news）传递个参数，然后在新闻页面进行简单的接收。

我们先修改pages下的Index.vue文件，给新闻的跳转加上params参数，传递3306。
``` html
<template>
  <div>
    <ul>
      <li><nuxt-link :to="{name:'index'}">HOME</nuxt-link></li>
      <li><nuxt-link :to="{name:'about'}">ABOUT</nuxt-link></li>
      <li><nuxt-link :to="{name:'news',params:{newsId:3306}}">NEWS</nuxt-link></li>
    </ul>
  </div>
</template>
 
<script>
export default {
  components: {
   
  }
}
</script>
 
<style>
 
</style>
```
在news文件夹下的index.vue里用$route.params.newsId进行接收，代码如下。
``` html
<template>
  <div>
      <h2>News Index page</h2>
      <p>NewsID:{{$route.params.newsId}}</p>
       <ul>
        <li><a href="/">Home</a></li>
      </ul>
  </div>
</template>
```
### query传递参数
我们先修改pages下的Index.vue文件，给新闻的跳转加上query参数，传递123。
``` html
<template>
  <div>
    <ul>
      <li><nuxt-link :to="{name:'index'}">HOME</nuxt-link></li>
      <li><nuxt-link :to="{name:'about'}">ABOUT</nuxt-link></li>
      <li><nuxt-link :to="{path:'/news', query:{newsId:123}}">NEWS</nuxt-link></li>
    </ul>
  </div>
</template>
```
在news文件夹下的index.vue里用$route.query.newsId进行接收，代码如下。
``` html
<template>
  <div>
      <h2>News Index page</h2>
      <p>NewsID:{{$route.query.newsId}}</p>
       <ul>
        <li><a href="/">Home</a></li>
      </ul>
  </div>
</template>
```
::: warning 注意
Nuxt路由传参和Vue中一样，可以参考vue传递参数的方法。
:::
## Nuxt的动态路由和参数校验
新闻详细页面： 我在news文件夹下面新建了_id.vue的文件，以下画线为前缀的Vue文件就是动态路由，然后在文件里边有 $route.params.id来接收参数。

/pages/news/_id.vue
``` html
<template>
  <div>
      <h2>News-Content [{{$route.params.id}}]</h2>
      <ul>
        <li><a href="/">Home</a></li>
      </ul>
  </div>
</template>
```
修改新闻首页路由

我们在/pages/news/index.vue进行修改，增加两个详细页的路由News-1和News-2。
``` html
<template>
  <div>
      <h2>News Index page</h2>
      <p>NewsID:{{$route.params.newsId}}</p>
       <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/news/123">News-1</a></li>
        <!-- <li><nuxt-link :to="{name: 'news-id', params: {id: 123}}">News-1</nuxt-link></li> -->
        <!-- <li><nuxt-link :to="{path: '/news/123'}">News-1</nuxt-link></li> -->
        <li><a href="/news/456">News-2</a></li>
      </ul>
  </div>
</template>
```
代码写好后，打开npm run dev 进行查看，我们已经进入了新闻详细页，并在详细页中取得了传递过来的新闻ID。

**动态参数校验**

进入一个页面，对参数传递的正确性校验是必须的，Nuxt.js也贴心的为我们准备了校验方法validate( )。

/pages/news/_id.vue
``` js
export default {
 
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  }
 
}
```
我们使用了validate方法，并把params传递进去，然后用正则进行了校验，如果正则返回了true正常进入页面，如果返回false进入404页面。

## 路由动画效果
路由的动画效果，也叫作页面的更换效果。Nuxt.js提供两种方法为路由提供动画效果，一种是全局的，一种是针对单独页面制作。

### 全局路由动画
全局动画默认使用**page**来进行设置，例如现在我们为每个页面都设置一个进入和退出时的渐隐渐现的效果。我们可以先在根目录的assets/css下建立一个main.css文件。

/assets/css/main.css(没有请自行建立)
``` css
.page-enter-active, .page-leave-active {
    transition: opacity 2s;
}
.page-enter, .page-leave-active {
    opacity: 0;
}
```
然后在nuxt.config.js里加入一个全局的css文件就可以了。
``` js
css:['~assets/css/main.css'],
```
这时候在页面切换的时候就会有2秒钟的动画切换效果了，但是你会发现一些页面是没有效果的，这是因为你没有用nuxt-link组件来制作跳转链接，此时，你需要进行更改。
``` html
<li><nuxt-link :to="{name:'news-id',params:{id:123}}">News-1</nuxt-link></li>
```
改过之后你就会看到动画效果了。

### 单独设置页面动效
想给一个页面单独设置特殊的效果时，我们只要在css里改变默认的page，然后在页面组件的配置中加入transition字段即可。例如，我们想给about页面加入一个字体放大然后缩小的效果，其他页面没有这个效果。

在全局样式assets/main.css 中添加以下内容。
``` css
.test-enter-active, .test-leave-active {
    transition: all 2s;
    font-size:12px;
    
}
.test-enter, .test-leave-active {
    opacity: 0;
    font-size:40px;
}
```
然后在about/index.vue组件中设置
``` js
export default {
  transition: 'test'
}
```

## 默认模版和默认布局
在开发应用时，经常会用到一些公用的元素，比如网页的标题是一样的，每个页面都是一模一样的标题。这时候我们有两种方法，第一种方法是作一个公用的组件出来，第二种方法是修改默认模版。这两种方法各有利弊，比如公用组件更加灵活，但是每次都需要自己手动引入；模版比较方便，但是只能每个页面都引入。

### 默认模板
Nuxt为我们提供了超简单的默认模版订制方法，只要在根目录下创建一个app.html就可以实现了。现在我们希望每个页面的最上边都加入“Welcome To Learn Nuxt.js” 这几个字，我们就可以使用默认模版来完成。
``` html
<!DOCTYPE html>
<html lang="en">
<head>
   {{ HEAD }}
</head>
<body>
    <p>Welcome To Learn Nuxt.js</p>
    {{ APP }}
</body>
</html>
```
这里的读取的是nuxt.config.js里的信息， 就是我们写的pages文件夹下的主体页面了。需要注意的是HEAD和APP都需要大写，如果小写会报错的。
::: warning 注意
你建立了默认模板后，记得要重启服务器，否则你的显示不会成功；但是默认布局是不用重启服务器的。
:::

### 默认布局
和默认模板类似的功能还有默认布局，但是从名字上你就可以看出来，默认布局主要针对于页面的统一布局使用。它在位置根目录下的layouts/default.vue。需要注意的是在默认布局里不要加入头部信息，只是关于template标签下的内容统一订制。

还是上边的需求，我们在每个页面的最顶部放入“Welcome To Learn Nuxt.js” 这几个字，看一下在默认布局里的实现。
``` html
<template>
  <div>
    <p>Welcome To Learn Nuxt.js</p>
    <nuxt/>
  </div>
</template>
```
这里的<nuxt/>就相当于我们每个页面的内容，你也可以把一些通用样式放入这个默认布局里，但是个人不建议这样写，会增加页面的复杂程度。

总结：要区分默认模版和默认布局的区别，模版可以订制很多头部信息，包括IE版本的判断；布局只能定制template里的内容，跟布局有关系。在工作中修改时要看情况来编写代码。

## 错误页面和个性meta设置
当用户输入路由错误的时候，我们需要给他一个明确的指引，所以说在应用程序开发中404页面是必不可少的。Nuxt.js支持直接在默认布局文件夹里建立错误页面。

### 建立错误页面
在根目录下的layouts文件夹下建立一个error.vue文件，它相当于一个显示应用错误的组件。
``` html
<template>
  <div>
      <h2 v-if="error.statusCode==404">404页面不存在</h2>
      <h2 v-else>500服务器错误</h2>
      <ul>
          <li><nuxt-link to="/">HOME</nuxt-link></li>
      </ul>
  </div>
</template>
 
<script>
export default {
  props:['error'],
}
</script>
```
代码用v-if进行判断错误类型，需要注意的是这个错误是你需要在script里进行声明的，如果不声明程序是找不到error.statusCode的。

这里我也用了一个nuxt-link的简单写法直接跟上路径就可以了。

### 个性meta设置
页面的Meta对于SEO的设置非常重要，比如你现在要作个新闻页面，那为了搜索引擎对新闻的收录，需要每个页面对新闻都有不同的title和meta设置。直接使用head方法来设置当前页面的头部信息就可以了。我们现在要把New-1这个页面设置成个性的meta和title。

1.我们先把pages/news/index.vue页面的链接进行修改一下，传入一个title，目的是为了在新闻具体页面进行接收title，形成文章的标题。

/pages/news/index.vue
``` html
<li><nuxt-link :to="{name:'news-id',params:{id:123,title:'Hello News-1'}}">News-1</nuxt-link></li>
```
2.第一步完成后，我们修改/pages/news/_id.vue，让它根据传递值变成独特的meta和title标签。
``` html
<template>
  <div>
      <h2>News-Content [{{$route.params.id}}]</h2>
      <ul>
        <li><a href="/">Home</a></li>
      </ul>
  </div>
</template>
<script>
export default {
 
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  },
  data(){
    return{
      title:this.$route.params.title,
    }
  },
//独立设置head信息
  head(){
      return{
        title:this.title,
        meta:[
          {hid:'description',name:'news',content:'This is news page'}
        ]
      }
    }
}
</script>
```
注意：为了避免子组件中的meta标签不能正确覆盖父组件中相同的标签而产生重复的现象，建议利用 hid 键为meta标签配一个唯一的标识编号。

## asyncData方法获取数据
在项目中需要在初始化页面前先得到数据，也就是我们常说的异步请求数据。Nuxt.js贴心的为我们扩展了Vue.js的方法，增加了anyncData。从名字上就很好理解，这是一个异步的方法。

**创建远程数据**

在这里制作一些假的远程数据，我选择的网站是myjson.com，它是一个json的简单仓库，学习使用是非常适合的。 我们打开网站，在对话空中输入JSON代码，这个代码可以自己随意输入哦。
``` json
{
  "name": "xiaoming",
  "age": 18,
  "interest": "I love coding!"
}
```
输入后，网站会给你一个地址，这就是你这个JSON仓库的地址了。 https://api.myjson.com/bins/8gdmr

**安装Axios**

Vue.js官方推荐使用的远程数据获取方式就Axios，所以我们安装官方推荐，来使用Axios。这里我们使用npm 来安装 axios。 直接在终端中输入下面的命令：
``` js
npm install axios --save
```
**ansycData的promise方法**

我们在pages下面新建一个文件，叫做ansyData.vue，然后写入下面的代码：
``` html
<template>
  <div>
      <h1>姓名：{{info.name}}</h1>
      <h2>年龄：{{info.age}}</h2>
      <h2>兴趣：{{info.interest}}</h2>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data(){
     return {
         name:'hello World',
     }
  },
  asyncData(){
      return axios.get('https://api.myjson.com/bins/8gdmr')
      .then((res)=>{
          console.log(res)
          return {info:res.data}
      })
      
  }
}
</script>
```
这时候我们可以看到，浏览器中已经能输出结果了。

**ansycData的await方法**

当然上面的方法稍显过时，现在都在用ansyc…await来解决异步,改写上面的代码。
``` html
<template>
  <div>
      <h1>姓名：{{info.name}}</h1>
      <h2>年龄：{{info.age}}</h2>
      <h2>兴趣：{{info.interest}}</h2>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data(){
     return {
         name:'hello World',
     }
  },
  async asyncData(){
      let {data}= await axios.get('https://api.myjson.com/bins/8gdmr')
      return {info: data}
  }
}
</script>
```
## 静态资源和打包
一些图片在项目开发时可用，但是打包后就不可用了，这节课就讲一下Nuxt.js项目中如何放置静态资源和打包。

**直接引入图片**

我们在网上任意下载一个图片，放到项目中的static文件夹下面，然后可以使用下面的引入方法进行引用
``` html
<div><img src="~static/logo.png" /></div>
```
这种引用方法是不用估计相对路径的，“~”就相当于定位到了项目跟目录，这时候你的图片路径就不会出现错误，就算打包也是正常的。

**CSS引入图片**

如果在CSS中引入图片，方法和html中直接引入是一样的，也是用“~”符号引入。
``` css
<style>
.diss{
    width: 300px;
    height: 100px;
    background-image: url('~static/logo.png')
}
</style>
```
这时候在npm run dev 下是完全正常的，那我们看一下打包。

**打包静态HTML并运行**

用Nuxt.js制作完成后，你可以打包成静态文件并放在服务器上，进行运行。

在终端中输入：
``` js
npm run generate
```
然后在dist文件夹下输入live-server就可以了。

总结：Nuxt.js框架非常简单，因为大部分的事情他都为我们做好了，我们只要安装它的规则来编写代码。
