---
sidebarDepth: 1
---
# UmiJS
> 该部分笔记摘抄于[UmiJS官网](https://umijs.org/zh/)，记录其中常用部分，其余具体请查阅官网。

umi，中文可发音为乌米，是一个可插拔的企业级 react 应用框架。umi 以路由为基础的，支持类 next.js 的约定式路由，以及各种进阶的路由功能，并以此进行功能扩展，比如支持路由级的按需加载。然后配以完善的插件体系，覆盖从源码到构建产物的每个生命周期，支持各种功能扩展和业务需求，目前内外部加起来已有 50+ 的插件。

umi 是蚂蚁金服的底层前端框架，已直接或间接地服务了 600+ 应用，包括 java、node、H5 无线、离线（Hybrid）应用、纯前端 assets 应用、CMS 应用等。他已经很好地服务了我们的内部用户，同时希望他也能服务好外部用户。

特性
``` sh
📦 开箱即用，内置 react、react-router 等  
🏈 类 next.js 且功能完备的路由约定，同时支持配置的路由方式  
🎉 完善的插件体系，覆盖从源码到构建产物的每个生命周期  
🚀 高性能，通过插件支持 PWA、以路由为单元的 code splitting 等  
💈 支持静态页面导出，适配各种环境，比如中台业务、无线业务、egg、支付宝钱包、云凤蝶等  
🚄 开发启动快，支持一键开启 dll 等  
🐠 一键兼容到 IE9，基于 umi-plugin-polyfills  
🍁 完善的 TypeScript 支持，包括 d.ts 定义和 umi test  
🌴 与 dva 数据流的深入融合，支持 duck directory、model 的自动加载、code splitting 等等
```

## 目录及约定
``` js
.
├── dist/                          // 默认的 build 输出目录
├── mock/                          // mock 文件所在目录，基于 express
├── config/
    ├── config.js                  // umi 配置，同 .umirc.js，二选一
└── src/                           // 源码目录，可选
    ├── layouts/index.js           // 全局布局
    ├── pages/                     // 页面目录，里面的文件即路由
        ├── .umi/                  // dev 临时目录，需添加到 .gitignore
        ├── .umi-production/       // build 临时目录，会自动删除
        ├── document.ejs           // HTML 模板
        ├── 404.js                 // 404 页面
        ├── page1.js               // 页面 1，任意命名，导出 react 组件
        ├── page1.test.js          // 用例文件，umi test 会匹配所有 .test.js 和 .e2e.js 结尾的文件
        └── page2.js               // 页面 2，任意命名
    ├── global.css                 // 约定的全局样式文件，自动引入，也可以用 global.less
    ├── global.js                  // 可以在这里加入 polyfill
    ├── app.js                     // 运行时配置文件
├── .umirc.js                      // umi 配置，同 config/config.js，二选一
├── .env                           // 环境变量
└── package.json
```
### mock
此目录下所有的 .js 文件（包括 _ 前缀的）都会被解析为 mock 文件。

比如，新建 mock/users.js，内容如下：
``` js
export default {
  '/api/users': ['a', 'b'],
};
```
然后在浏览器里访问 http://localhost:8000/api/users 就可以看到 ['a', 'b'] 了。

如果想忽略 mock 文件夹下的部分文件，排除 mock 目录下不作 mock 处理的文件，则在.umirc.js或config/config.js中进行配置，如下：
``` js
export default {
  mock: {
    exclude: ['mock/**/_*.js', 'mock/_*/**/*.js'],
  },
};
```
### src/layouts/index.js
注：配置式路由下无效。

全局布局，在路由外面套的一层路由。

比如，你的路由是：
``` js
[
  { path: '/', component: './pages/index' },
  { path: '/users', component: './pages/users' },
]
```
如果有 layouts/index.js，那么路由就会变为：
``` js
[
  {
    path: '/',
    component:'./layouts/index',
    routes: [
        { path: '/', component: './pages/index' },
        { path: '/users', component: './pages/users' },
    ] 
  }
]
```
### src/pages/.umi
这是 umi dev 时生产的临时目录，默认包含 umi.js 和 router.js，有些插件也会在这里生成一些其他临时文件。可以在这里做一些验证，但请不要直接在这里修改代码，umi 重启或者 pages 下的文件修改都会重新生成这个文件夹下的文件。
### 配置文件
.umirc.(js|ts) 和 config/config.(js|ts) 编译时配置文件，二选一，不可共存。

### .env
环境变量配置文件，比如：
``` js
CLEAR_CONSOLE=none
BROWSER=none // 删除该行，启动项目时会打开默认浏览器
```
这里定义的系统环境变量在整个umi-build-dev的生命周期里都可以被使用

## 约定式路由
假设 pages 目录结构如下：
``` js
+ pages/
  + users/
    - index.js
    - list.js
  - index.js
```
那么，umi 会自动生成路由配置如下：
``` js
[
  { path: '/', component: './pages/index.js' },
  { path: '/users/', component: './pages/users/index.js' },
  { path: '/users/list', component: './pages/users/list.js' },
]
```
::: danger 注意
若 .umirc.(ts|js) 或 config/config.(ts|js) 文件中对 router 进行了配置，约定式路由将失效、新添的页面不会自动被 umi 编译，umi 将使用配置式路由。(即文件中不能包含routes属性)
:::

## 配置式路由
如果你倾向于使用配置式的路由，可以配置 .umirc.(ts|js) 或者 config/config.(ts|js) 配置文件中的 routes 属性，**此配置项存在时则不会对 src/pages 目录做约定式的解析。**

比如：
``` js
export default {
  routes: [
    { path: '/', component: './a' },
    { path: '/list', component: './b', Routes: ['./routes/PrivateRoute.js'] },
    { path: '/users', component: './users/_layout',
      routes: [
        { path: '/users/detail', component: './users/detail' },
        { path: '/users/:id', component: './users/id' }
      ]
    },
  ],
};
```
注意：**component 是相对于 src/pages 目录的**

## 启用 Hash 路由
**umi 默认是用的 Browser History**，如果要用 Hash History，需配置：
``` js
export default {
  history: 'hash',
}
```
## 页面间跳转
在 umi 里，页面之间跳转有两种方式：声明式和命令式。

### 声明式
基于 umi/link，通常作为 React 组件使用。
``` js
import Link from 'umi/link';

export default () => (
  <Link to="/list">Go to list page</Link>
);
```
### 命令式
基于 umi/router，通常在事件处理中被调用。
``` js
import router from 'umi/router';

function goToListPage() {
  router.push('/list');
}
// 命令式路由的传值方式
function goToHomePage() {
  router.push({
    pathname: '/home',
    query: {
        a: 'b',
    },
  })
}
```
### router.replace(path)
替换当前页面，参数和 router.push() 相同。

### router.go(n)
往前或往后跳指定页数。

例子：
``` js
import router from 'umi/router';

router.go(-1);
router.go(2);
```
### router.goBack()
后退一页。

例子：
``` js
import router from 'umi/router';
router.goBack();
```
## HTML 模板
### 修改默认模板
新建 src/pages/document.ejs，umi 约定如果这个文件存在，会作为默认模板，内容上需要保证有 `<div id="root"></div>`，比如：
``` html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <title>Your App</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```