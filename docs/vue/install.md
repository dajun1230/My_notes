---
sidebarDepth: 2
---
# vue 环境搭建

## Vue 2.x 安装
``` js
粗略安装步骤：
1. npm install vue-cli -g
2. vue init webpack vue-demo // vue-demo为项目名
   // 是否需要路由  y
   // 是否需要ESLint检查代码风格  y
   // standant 
   // 单元测试  n
   // text  n
3. cd vue-demo
4. npm install // 安装依赖
5. npm run dev // 运行该项目
sass安装：
1. npm install sass-loader node-sass -D
2. 在app.vue的style中加入lang='sass'；如：<style lang="scss" scoped> </style>
less安装：
1. npm install less-loader less -D
2. 在app.vue的style中加入lang='less'；如：<style lang="less" scoped> </style>
```
详细安装步骤：

### 安装vue-cli

安装vue-cli的前提是你已经安装了npm，安装npm你可以直接下载node的安装包进行安装。你可以在命令行工具里输入npm -v 检测你是否安装了npm和版本情况，出现版本号说明你已经安装了npm和node。

[node 下载地址](http://nodejs.cn/download/)   

npm没有问题，接下来我们可以用npm 命令安装vue-cli了，在命令行输入下面的命令：
``` js
npm install vue-cli -g
```
● -g :代表全局安装。如果你安装时报错，一般是网络问题，你可以尝试用cnpm来进行安装。安装完成后，可以用vue  -V来进行查看 vue-cli的版本号。注意这里的V是大写的。我这里版本号是2.9.6，如果vue -V的命令管用了，说明已经顺利的把vue-cli安装到我们的计算机里了。

### 初始化项目

我们用vue init命令来初始化项目，具体看一下这条命令的使用方法。
``` js
$ vue init <template-name> <project-name>
```
具体说明：
``` sh
● init：表示我要用vue-cli来初始化项目
● <template-name>：表示模板名称，vue-cli官方为我们提供了5种模板，
  1. webpack-一个全面的webpack+vue-loader的模板，功能包括热加载，linting,检测和CSS扩展。
  2. webpack-simple-一个简单webpack+vue-loader的模板，不包含其他功能，让你快速的搭建vue的开发环境。
  3. browserify-一个全面的Browserify+vueify 的模板，功能包括热加载，linting,单元检测。
  4. browserify-simple-一个简单Browserify+vueify的模板，不包含其他功能，让你快速的搭建vue的开发环境。
  5. -simple-一个最简单的单页应用模板。
● <project-name>：标识项目名称，这个你可以根据自己的项目来起名字。
```

在实际开发中，一般我们都会使用webpack这个模板，那我们这里也安装这个模板，在命令行输入以下命令：
``` js
vue init webpack vuecli
```
输入命令后，会询问我们几个简单的选项，我们根据自己的需要进行填写就可以了。
``` sh
● Project name :项目名称 ，如果不需要更改直接回车就可以了。注意：这里不能使用大写，所以我把名称改成了vueclitest
● Project description:项目描述，默认为A Vue.js project,直接回车，不用编写。
● Author：作者，如果你有配置git的作者，他会读取。
● Vue build (Use arrow keys)：
● Install vue-router? 是否安装vue的路由插件，我们这里需要安装，所以选择Y
● Use ESLint to lint your code? 是否用ESLint来限制你的代码错误和风格。我们这里不需要输入n，如果你是大型团队开发，最好是进行配置。
● Pick an ESLint preset: Standard
● Set up unit tests: 是否需要安装单元测试工具，我们这里不需要，所以输入n。
● Setup e2e tests with Nightwatch?是否安装e2e来进行用户行为模拟测试，我们这里不需要，所以输入n。
```
命令行出现上面的文字，说明我们已经初始化好了第一步。命令行提示我们现在可以作的两件事情。
``` sh
1. cd vuecli 进入我们的vue项目目录。
2. npm run dev 开发模式下运行我们的程序。给我们自动构建了开发用的服务器环境和在浏览器中打开，并实时监视我们的代码更改，即时呈现给我们。
```
出现这个页面，说明我们的初始化已经成功，现在可以快乐的玩耍了。

### Vue-cli 项目结构讲解
安装完成之后，其目录结构为：
``` js
.
|-- build                            // 项目构建(webpack)相关代码
|   |-- build.js                     // 生产环境构建代码
|   |-- check-version.js             // 检查node、npm等版本
|   |-- logo.png                     // Vue的logo
|   |-- utils.js                     // 构建工具相关
|   |-- vue-loader.conf.js           // 
|   |-- webpack.base.conf.js         // webpack基础配置
|   |-- webpack.dev.conf.js          // webpack开发环境配置
|   |-- webpack.prod.conf.js         // webpack生产环境配置
|-- config                           // 项目开发环境配置
|   |-- dev.env.js                   // 开发环境变量
|   |-- index.js                     // 项目一些配置变量
|   |-- prod.env.js                  // 生产环境变量
|   |-- test.env.js                  // 测试环境变量（没有选test则没有）
|-- src                              // 源码目录
|   |-- assets                       // vue公共资源文件
|   |-- components                   // vue公共组件
|   |-- src                          // vue目录文件
|   |-- store                        // vuex的状态管理（未安装vuex则无）
|   |-- App.vue                      // 页面入口文件
|   |-- main.js                      // 程序入口文件，加载各种公共组件
|-- static                           // 静态文件，比如一些图片，json数据等
|-- .babelrc                         // ES6语法编译配置
|-- .editorconfig                    // 定义代码格式
|-- .eslintignore                    // 定义代码格式
|-- .slintrc.js                      // 定义代码格式
|-- .gitignore                       // git上传需要忽略的文件格式
|-- .postcssrc.js                    // 
|-- index.html                       // 入口页面
|-- package-lock.json                // 
|-- package.json                     // 项目基本信息
|-- README.md                        // 项目说明
.
```

## Vue 3.x
### 介绍
> CLI (@vue/cli) 是一个全局安装的 npm 包，提供了终端里的 vue 命令。它可以通过 vue create 快速创建一个新项目的脚手架，或者直接通过 vue serve 构建新想法的原型。你也可以通过 vue ui 通过一套图形化界面管理你的所有项目。我们会在接下来的指南中逐章节深入介绍。

### 安装@vue/cli
``` js
npm install -g @vue/cli
```
完成之后，在命令台输入：
``` js
vue -V // 查看vue版本号是否为 3.x
```
如果出现了版本号，说明已经顺利的把@vue/cli安装到我们的计算机里了。

### 创建项目
``` js
vue create vue-demo // vue-demo为项目名称
```
然后会出现以下步骤：
::: tip 提示
**个人建议采用手动创建，并用cmd命令来创建项目，其中上下键:切换，空格:选择/取消，a:全选/取消全选，i:反选。**
:::

### 选择安装类型
> 选择安装类型：默认 或者 手动，建议选择手动安装。
``` js
Please pick a preset: (Use arrow keys)
> default (babel, eslint) // 包含基本的Babel + ESLint设置的preset。
  Manually select features // 手动选择特性，是我们所需要的面向生产的项目，提供可选功能的 npm 包。
```

### default（默认安装）介绍
安装成功之后，其目录结构为： (babel, eslint)安装方式
``` js
|- node_modules
|- public
|- src
    |- asserts
    |- components
|-  babel.config.js
|-  package-lock.json
|-  package.json
|-  README.md
```
package.json
``` js
{
  "name": "vue-demo",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint"
  },
  "dependencies": {
    "core-js": "^2.6.5",
    "vue": "^2.6.10"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "^3.9.0",
    "@vue/cli-plugin-eslint": "^3.9.0",
    "@vue/cli-service": "^3.9.0",
    "babel-eslint": "^10.0.1",
    "eslint": "^5.16.0",
    "eslint-plugin-vue": "^5.0.0",
    "vue-template-compiler": "^2.6.10"
  },
  "eslintConfig": {
    "root": true,
    "env": {
      "node": true
    },
    "extends": [
      "plugin:vue/essential",
      "eslint:recommended"
    ],
    "rules": {},
    "parserOptions": {
      "parser": "babel-eslint"
    }
  },
  "postcss": {
    "plugins": {
      "autoprefixer": {}
    }
  },
  "browserslist": [
    "> 1%",
    "last 2 versions"
  ]
}

```
### Manually（手动安装）介绍
手动选择特性介绍：
``` js
* Babel // 将ES6编译成ES5
  TypeScript // JavaScript的一个超集（添加了可选的静态类型和基于类的面向对象编程：类型批注和编译时类型检查、类、接口、模块、lambda 函数）
  Progressive Web App <PWA> Support // 渐进式Web应用程序
  Router // vue-router（vue路由）
  Vuex // vuex（vue的状态管理模式）
  Css Pre-processors // CSS 预处理器（如：less、sass）
* Linter / Formatter // 代码风格检查和格式化（如：ESlint）
  Unit Testing // 单元测试（unit tests）,开发过程中前端对代码进行自运行测试
  E2E Testing // e2e（end to end） 测试
```
常用选择类型：
``` sh
1. 选择
# 常用选择
(*) Babel
( ) TypeScript
( ) Progressive Web App <PWA> Support
(*) Router
(*) Vuex
(*) Css Pre-processors
(*) Linter / Formatter
( ) Unit Testing
( ) E2E Testing
```
### 具体细节介绍
``` js
1. /* 使用路由的历史模式：输入 Y */
Use history mode for router? <Requires proper server setup for index fallback in production> <Y/n>
// 选择: Y
2. /* 选择一个CSS预处理器<PostCSS，Autoprefixer和CSS模块默认支持 */
Pick a CSS pre-processor <PostCSS, Autoprefixer and CSS Modules are supportedby default> <Use arrow keys>
> Sass/SCSS (with dart-sass)
  Sass/SCSS (with node-sass)
  Less
  Stylus
// 选择: Sass/SCSS (with node-sass)
3. /* 选择一个linter/formatter配置 */
Pick a linter / formatter config: <Use arrow keys>
> ESLint with error prevention only
  ESLint + Airbnb config
  ESLint + Standard config
  ESLint + Prettier
// 选择: ESLint + Prettier
4. /* 反向选择 */
to invert selection >
> (*) Lint on save
  ( ) Lint and fix on commit
// 选择： Lint on save
5. /* 您希望在哪里放置Babel、PostCSS、ESLint等的配置。？ */
Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? <Use arrow keys>
> In dedicated config files
  In package.json
// 选择：In package.json
6. /* 将此保存为将来项目的预设 */
Save this as a preset for future projects? (y/N)
// 选择：N
```
### 配置修改
在根目录新建一个vue.config.js，加入以下配置：
``` js
module.exports = {
    configureWebpack: { // 为设置断点调试准备
        devtool: 'source-map'
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/', // 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制),例如，如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。
    outputDir: 'dist', // 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)
    assetsDir: '', // 放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')
    indexPath: 'index.html', // 指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。
    pages: { //pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错
        index: { //除了 entry 之外都是可选的
            entry: 'src/main.js', // page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件
            template: 'public/index.html', // 模板来源
            filename: 'index.html', // 在 dist/index.html 的输出
            title: 'Index Page', // 当使用 title 选项时,在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>
            chunks: ['chunk-vendors', 'chunk-common', 'index'] // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk },
        }
        // subpage: 'src/subpage/main.js' // 当使用只有入口的字符串格式时，模板会被推导为 `public/subpage.html` 并且如果找不到的话，就回退到 `public/index.html`。输出文件名会被推导为 `subpage.html`。
    },
    lintOnSave: true, // 是否显示eslint语法问题
    devServer: {
        hot: true, // 设置eslint错误得显示为控制台
        clientLogLevel: 'warning',
        // overlay: { // 设置eslint错误得显示方式
        //     warnings: false,
        //     errors: false
        // }
        host: 'localhost',        
        port: 8000,
        https: false,
        hotOnly: false,
        open: true, //配置自动启动浏览器
        // proxy: { // 配置多个代理(配置一个 proxy: 'http://localhost:4000' ) }
        //     '/api': {
        //         target: '<url>',
        //         ws: true,
        //         changeOrigin: true
        //     },
        //     '/foo': {
        //     target: '<other_url>'
        //     }
        // }
    },
    productionSourceMap: false, // 生产环境是否生成 sourceMap 文件
    css: { // css预设器配置项
        extract: true, // 是否使用css分离插件 ExtractTextPlugin
        sourceMap: false, // 开启 CSS source maps
        loaderOptions: { // 给 sass-loader 传递选项
          sass: {
            prependData: `@import "~@/assets/css/variable.scss";`
          }
        }, 
        modules: false // 启用 CSS modules for all css / pre-processor files.
    },
    pluginOptions: {} // 第三方插件配置
}
```
### 安装element-ui
1. 安装
``` js
npm i element-ui -S
```
2. 按需引入
借助 babel-plugin-component，我们可以只引入需要的组件，以达到减小项目体积的目的。
``` js
npm install babel-plugin-component -D
```
3. 在项目下新建 babel.config.js，写入如下代码：
``` js
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
};
```
4. 新建 variable.scss 文件，里面写入全局变量，然后通过在vue.config.js中引用，如下：
``` js
css: {
  extract: true, // 是否使用css分离插件 ExtractTextPlugin
  sourceMap: false, // 开启 CSS source maps
  loaderOptions: { // 给 sass-loader 传递选项
    sass: {
      prependData: `@import "~@/assets/css/variable.scss";`
    }
  }, 
  modules: false // 启用 CSS modules for all css / pre-processor files.
}
```
variable.scss中设置变量，同时引入element-ui的样式，并在main.js中进行引用
``` scss
// 全局变量文件
$theme-color: #44C9A8; // 主题色
@import './element-ui.scss';
```
## 拉取 2.x 模板 (旧版本)
ue CLI >= 3 和旧版使用了相同的 vue 命令，所以 Vue CLI 2 (vue-cli) 被覆盖了。如果你仍然需要使用旧版本的 vue init 功能，你可以全局安装一个桥接工具：

``` sh
npm install -g @vue/cli-init
# `vue init` 的运行效果将会跟 `vue-cli@2.x` 相同
vue init webpack my-project
```
