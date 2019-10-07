# Next 
Next.js 是一个轻量级的 React 服务端渲染应用框架。有了它我们可以简单轻松的实现React的服务端渲染，从而加快首屏打开速度，也可以作SEO（收索引擎优化了）。

## 相关网址
[Next 官网](https://nextjs.frontendx.cn) 

## 简介和创建项目
### Next.js简介
用一个框架，就要知道它的优点（或者是解决了我们什么问题）:

● 完善的React项目架构，搭建轻松。比如：Webpack配置，服务器启动，路由配置，缓存能力，这些在它内部已经完善的为我们搭建完成了。  
● 自带数据同步策略，解决服务端渲染最大难点。把服务端渲染好的数据，拿到客户端重用，这个在没有框架的时候，是非常复杂和困难的。有了Next.js，它为我们提供了非常好的解决方法，让我们轻松的就可以实现这些步骤。  
● 丰富的插件帮开发人员增加各种功能。每个项目的需求都是不一样的，包罗万象。无所不有，它为我们提供了插件机制，让我们可以在使用的时候按需使用。你也可以自己写一个插件，让别人来使用。
● 灵活的配置，让开发变的更简单。它提供很多灵活的配置项，可以根据项目要求的不同快速灵活的进行配置。

目前Next.js是React服务端渲染的最佳解决方案，所以如果你想使用React来开发需要SEO的应用，基本上就要使用Next.js。

### 手动创建Next.js项目
**第一步： 建立文件夹**

创建一个Next.js项目，可以有两种方法进行，一种是手动创建，另一种是用create-next-app（脚手架）来创建。这节课我们先来进行手动创建，这样虽然麻烦点，但是可以更容易让新手了解过程和原理。

先在你喜欢的位置新建一个文件夹，名称你也可以自己起，我这里是在D盘里建立了一个叫NextDemo文件夹。
``` js
D:
mkdir NextDemo
npm init // 初始化package.json，全部选择默认项输入： npm init -y
```
这里的npm init 是用来把文件夹初始化成可管理的项目的，其实就是在根目录里给你添加了一个package.json的文件。

**第二步：安装所需要的依赖包**

接下来可以使用yarn来安装所需要的项目依赖包，先来安装下面三个react、react-dom和next。
``` js
yarn add react react-dom next
```
当让你也可以使用npm来进行安装，npm安装时记得要使用--save
``` js
npm install --save react react-dom next
```
安装完可以打开package.json文件查看一下dependencies的版本。

**第三步：增加快捷命令**

为了开发时简便的使用Next.js中的操作命令行工具，所以把常用的配置到package.json中，代码如下：
``` js
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev" : "next" ,
    "build" : "next build",
    "start" : "next start"
},
```
**第四步：创建pages文件夹和文件**

在根目录下，创建一个pages文件夹，这个文件夹是Next规定的，在这个文件夹下写入的文件，Next.js会自动创建对应的路由。有了文件夹以后，在文件下面创建一个index.js文件，这就是我们的首页了,然后用React Hooks的写法，写个最简单的Hello World。
``` js
function Index(){
    return (
        <div>Hello Next.js</div>
    )
}
export default Index;
```
写好后在终端中使用yarn dev来打开预览，在浏览器中可以看到输出了正确的结果。

## creact-next-app快速创建Next.js项目
create-next-app可以快速的创建Next.js项目，它就是一个脚手架，有了它只要一句命令就可以把项目需要的依赖包和基本目录都生成，工作中我基本不用手动的形式自己创建，全部使用create-next-app来创建。

### 安装create-next-app
使用脚手架前，需要先进行全局安装。
``` js
npm install -g create-next-app
```
安装完成后，就可以通过create-next-app命令来创建一个Next.js的项目了。

### 创建Next.js项目
目前可以支持三种方式的创建，分别是用npx,yarn和create-next-app命令来进行安装，安装的结构都是完全一样的，所以就给大家演示其中的一种npx的形式。
``` sh
npx 是Node自带的npm模块，所以你只要安装了Node都是可以直接使用npx命令的。
```
但低版本的Node是不带这个命令的，所以你需要手都安装一下。
``` js
$ npm install -g npx
```
打开命令提示符工具，然后进入D盘，然后直接用下面的npx命令创建项目。
``` js
$ npx create-next-app next-create
```
输入后按回车，就会自动给我们进行安装项目需要的依赖。并且会给我们添加好命令。 稍等一会，全部安装完成后，可以进入项目目录，执行yarn dev来测试项目。

在浏览器中输入http://localhost:3000/,看到下面的内容，说明项目生成成功.

### 项目结构介绍
看到结果后，用VSCode打开目录，可以看到已经有了很多自动建立好的文件和文件夹，下面就简单的介绍一下这些它们的用处：

● components文件夹:这里是专门放置自己写的组件的，这里的组件不包括页面，指公用的或者有专门用途的组件。  
● node_modules文件夹：Next项目的所有依赖包都在这里，一般我们不会修改和编辑这里的内容。  
● pages文件夹：这里是放置页面的，这里边的内容会自动生成路由，并在服务器端渲染，渲染好后进行数据同步。  
● static文件夹： 这个是静态文件夹，比如项目需要的图片、图标和静态资源都可以放到这里。  
● .gitignore文件： 这个主要是控制git提交和上传文件的，简称就是忽略提交。  
● package.json文件：定义了项目所需要的文件和项目的配置信息（名称、版本和许可证），最主要的是使用npm install 就可以下载项目所需要的所有包。

当你了解项目目录和文件后就可以试着修改一下项目，简单的尝试一下了。这节课就到这里了，主要讲解的就是利用create-next-app来创建项目和生成项目的基本结构介绍。

## Pages和Component的使用
我们已经利用create-next-app创建了项目，也简单的介绍了一下创建后的项目结构。现在就来看看如何新建页面和新建组件。

### 新建页面和访问路径
直接在根目录下的pages文件夹下，新建一个news.js页面。然后写入下面的代码：
``` js
function News(){
    return (<button>查看新闻</button>)
}

export default News;
```
只要写完上面的代码，Next框架就自动作好了路由，这个也算是Next的一个重要优点，给我们节省了大量的时间。

现在要作一个更深的页面，比如把有关博客的界面都放在这样的路径下http://localhost:3000/blog/nextBlog,其实只要在pages文件夹下再建立一个新的文件夹blog，然后进入blog文件夹，新建一个nextBlog.js文件，就可以实现了。

nextBlog.js文件内容,我们这里就用最简单的写法了
``` js
export default ()=><div>nextBlog page</div>
```
写完后，就可以直接在浏览器中访问了，是不是发现Next框架真的减轻了我们大量的工作。

### Component组件的制作
制作组件也同样方便，比如要建立一个list组件，直接在components目录下建立一个文件list.js,然后写入下面代码:
``` js
export default ({children})=><button>{children}</button>
```
组件写完后需要先引入，比如我们在Index页面里进行引入：
``` js
import List from '../components/list';
```
使用就非常简单了，直接写入标签就可以。
``` js
<List>按钮</List>
```
一个自定义组件的创建和使用也是这么简单， 如果你React的基础很好，上面的内容对你来说就更加简单了。也就是说Next框架并没有给我们带来太多的学习成本，但是为我们减轻了很多配置工作。

## 路由-基础和基本跳转
学会编写组件和页面后，下一步应该了解的就是路由体系，每个框架都有着不同的路由体系，这节先学习最基础的页面如何跳转。页面跳转一般有两种形式，第一种是**利用标签Link**,第二种是**用js编程的方式进行跳转，也就是利用Router组件**。先来看一下标签的形式如何跳转。

### 标签式导航Link
在编写代码之前，先删除index.js中的代码，保证代码的最小化。使用标签式导航需要先进行引入，代码如下:
``` js
import Link from 'next/link';
```
然后新建两个页面demoA.js和demoB.js，新建后写个最简单的页面，能标识出来A、B两个页面就好。
``` js
// demoA.js
import Link from 'next/link'

export default ()=>(
    <>
        <div>demo-A page .  </div>
        <Link href="/"><a>返回首页</a></Link>
    </>
)
```
写完A页面后，可以直接复制A页面的内容，然后修改一下就是B页面。
``` js
// demoB.js

import Link from 'next/link';

export default ()=>(
    <>
        <div>demo-B page .  </div>
        <Link href="/"><a>返回首页</a></Link>
    </>
)
```
有了两个页面后，可以编写首页的代码，实现跳转了。
``` js
//index.js
import React from 'react'
import Link from 'next/link'

const Home = () => (
  <>
    <div>我是首页</div>
    <div><Link href="/demoA"><a>去demoA页面</a></Link></div>
    <div><Link href="/demoB"><a>去demoB页面</a></Link></div>

  </>
)

export default Home;
```
用Link标签进行跳转是非常容易的，但是又一个小坑需要你注意一下，就是他不支持兄弟标签并列的情况。
``` js
 <div>
  <Link href="/demoA">
    <span>去demoA页面</span>
    <span>前端博客</span>
  </Link>
</div>
```
如果这样写会直接报错，报错信息如下
``` text
client pings, but there's no entry for page: /_error
Warning: You're using a string directly inside <Link>. This usage has been deprecated. Please add an <a> tag as child of <Link>
```
但是你可以把这两个标签外边套一个父标签，就可以了，比如下面的代码就没有错误。
``` js
<Link href="/demoA">
  <a>
    <span>去demoA页面</span>
    <span>前端博客</span>
  </a>
</Link>
```
通过标签跳转非常的简单，跟使用a标签几乎一样。那再来看看如何用编程的方式进行跳转。

### Router模块进行跳转
在Next框架中还可以使用Router模块进行编程式的跳转，使用前也需要我们引入Router，代码如下：
``` js
import Router from 'next/router';
```
然后在Index.js页面中加入，直接使用Router进行跳转就可以了。
``` js
 <div>
    <button onClick={()=>{Router.push('/demoA')}}>去demoA页面</button>
</div>
```
这样写只是简单，但是还是耦合性太高，跟Link标签没什么区别，你可以修改一下代码，把跳转放到一个方法里，然后调用方法。
``` js
import React from 'react'
import Link from 'next/link'
import Router from 'next/router'
const Home = () => {
  function gotoA(){
    Router.push('/demoA')
  }
  return(
    <>
      <div>我是首页</div>
      <div>
        <Link href="/demoA">
          <a>
            <span>去demoA页面</span>
            <span>前端博客</span>
          </a>
        </Link>
      </div>
      <div><Link href="/demoB"><a>去demoB页面</a></Link></div>
      <div>
        <button onClick={gotoA}>去demoA页面</button>
      </div>
    </>
  )

}
export default Home
```
这样也是可以实现跳转的，而且耦合性也降低了,所以个人更喜欢这种跳转方式。这节课主要学习了Next的两种跳转方式，第一种是标签式跳转，第二种是编程式跳转。

## 路由-跳转时用query传递和接受参数
项目开发中一般都不是简单的静态跳转，而是需要动态跳转的。动态跳转就是跳转时需要带一个参数或几个参数过去，然后在到达的页面接受这个传递的参数，并根据参数不同显示不同的内容。比如新闻列表，然后点击一个要看的新闻就会跳转到具体内容。这些类似这样的需求都都是通过传递参数实现的。

### 只能用query传递参数
在Next.js中只能通过通过query（?id=1）来传递参数，而不能通过(path:id)的形式传递参数，这个一定要记住，在工作中很容易就容易记混。

现在我们改写一下pages文件夹下的index.js文件。
``` js
import React from 'react';
import Link from 'next/link';
import Router from "next/router";

const Home = () => (
  <>
    <div>
      <h2>首页</h2>
      <div><Link href="/demoA?id=123"><a>demoA页面</a></Link></div>
      <div>
        <Link href="/demoB">
          <a>demoB页面</a>
        </Link></div>
      <div>
        <p onClick={()=> {Router.push('/demoA?id=678')}}>去demoA页面</p>
      </div>
    </div>
  </>
)

export default Home;
```
这样编写query参数就可以进行传递过去了，接下来就是要接受参数了。

### 接收传递过来的参数
在demoA.js页面下，写下下面的代码，接收参数。
``` js
import {withRouter} from "next/router";
import Link from "next/link";

function demoA({router}) {
    return (
        <div>
            <h2>这是demoA-页面</h2>
            <p>已接收到参数：{router.query.id}</p>
            <Link href="/"><a>返回首页</a></Link>
        </div>
    )
}

export default withRouter(demoA);
```
withRouter是Next.js框架的高级组件，用来处理路由用的，这里先学简单用法，以后还会学习的。通过这种方式就获得了参数，并显示在页面上了。

### 编程式跳转传递参数
回了Link这种标签式跳转传递参数的形式，那编程式跳转如何传递那，其实也可以简单使用?加参数的形式，代码如下：
``` js
<div>
  <p onClick={()=> {Router.push('/demoA?id=678')}}>去demoA页面</p>
</div>
```
这种形式跳转和传递参数是完全没有问题的，但是不太优雅（优雅这东西很难界定，其实你完全可以看成一种装X，这太简单了，我需要装个X），所以也可以写成Object的形式。
``` js
 function goDemoB(){
    Router.push({
      pathname:'/demoB',
      query:{
        id:'aaa'
      }
    })
  }
```
嗯，这样写确实优雅很多(我们一定要面向对象编程，有对象比没对象要好)。

其实Link标签也可以写成这种形式，比如我们把第一个修改成这种形式.
``` js
<Link href={{pathname:'/demoA',query: {id: '789'}}}><a>demoA页面</a></Link><br/>
```
在浏览器中预览一下，如果一切正常是可以顺利进行跳转，并接收到传递的值。这次主要讲解了Next框架的路由跳转时带参数过去，然后用withRouter进行接收。
