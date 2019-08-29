# 快速上手

## 介绍
> Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与现代化的工具链以及各种支持类库结合使用时，Vue 也完全能够为复杂的单页应用提供驱动。

## Vue 2.x
``` js
安装步骤：
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

## Vue 3.x
> CLI (@vue/cli) 是一个全局安装的 npm 包，提供了终端里的 vue 命令。它可以通过 vue create 快速创建一个新项目的脚手架，或者直接通过 vue serve 构建新想法的原型。你也可以通过 vue ui 通过一套图形化界面管理你的所有项目。我们会在接下来的指南中逐章节深入介绍。

关于旧版本：
Vue CLI 的包名称由 vue-cli 改成了 @vue/cli。 如果你已经全局安装了旧版本的 vue-cli (1.x 或 2.x)，你需要先通过 npm uninstall vue-cli -g 或 yarn global remove vue-cli 卸载它。

> 选择方式介绍：
``` js
Please pick a preset: (Use arrow keys)
> default (babel, eslint) // 包含基本的Babel + ESLint设置的preset。
  Manually select features // 手动选择特性，是我们所需要的面向生产的项目，提供可选功能的 npm 包。
手动选择特性介绍：
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
安装步骤： （**个人建议采用手动创建，并用cmd命令来创建项目，其中上下键:切换，空格:选择/取消，a:全选/取消全选，i:反选。**）
``` js

1. npm install -g @vue/cli
# OR
yarn global add @vue/cli
// vue --version 检查其版本是否正确 (3.x)：
2. vue create vue-demo // vue-demo为文件名
3. npm run serve // 运行项目
4. vue add @vue/eslint // 插件添加
5. vue add axio // 插件添加样例
```
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
## 配置修改
在根目录新建一个vue.config.js，加入以下配置：
``` js
module.exports = {   
    baseUrl: '/',// 部署应用时的根路径(默认'/'),也可用相对路径(存在使用限制)    
    outputDir: 'dist',// 运行时生成的生产环境构建文件的目录(默认''dist''，构建之前会被清除)   
    assetsDir: '',//放置生成的静态资源(s、css、img、fonts)的(相对于 outputDir 的)目录(默认'')    
    indexPath: 'index.html',//指定生成的 index.html 的输出路径(相对于 outputDir)也可以是一个绝对路径。    
    pages: {//pages 里配置的路径和文件名在你的文档目录必须存在 否则启动服务会报错        
    index: {//除了 entry 之外都是可选的            
    entry: 'src/index/main.js',// page 的入口,每个“page”应该有一个对应的 JavaScript 入口文件            
    template: 'public/index.html',// 模板来源            
    filename: 'index.html',// 在 dist/index.html 的输出            
    title: 'Index Page',// 当使用 title 选项时,在 template 中使用：<title><%= htmlWebpackPlugin.options.title %></title>           
    chunks: ['chunk-vendors', 'chunk-common', 'index'] // 在这个页面中包含的块，默认情况下会包含,提取出来的通用 chunk 和 vendor chunk        },        
    subpage: 'src/subpage/main.js'//官方解释：当使用只有入口的字符串格式时,模板会被推导为'public/subpage.html',若找不到就回退到'public/index.html',输出文件名会被推导为'subpage.html'    },    
    lintOnSave: true,// 是否在保存的时候检查    
    productionSourceMap: true,// 生产环境是否生成 sourceMap 文件    
    css: {        extract: true,// 是否使用css分离插件 ExtractTextPlugin        
        sourceMap: false,// 开启 CSS source maps        
        loaderOptions: {
            // 给 sass-loader 传递选项
            sass: {
                // @/ 是 src/ 的别名
                // 所以这里假设你有 `src/variables.scss` 这个文件
                data: `@import "@/variables.scss";`
            }
        },// css预设器配置项        
        modules: false// 启用 CSS modules for all css / pre-processor files.    
    },    
    devServer: {// 环境配置        
            host: 'localhost',        
            port: 8080,        
            https: false,        
            hotOnly: false,        
            open: true, //配置自动启动浏览器        
            proxy: {// 配置多个代理(配置一个 proxy: 'http://localhost:4000' )            
                '/api': {                
                    target: '<url>',                
                    ws: true,                
                    changeOrigin: true            
                },            
                '/foo': {                
                target: '<other_url>'            
                }        
            }    
    },    
    pluginOptions: {// 第三方插件配置        // ...    
    }
};
```
## 拉取 2.x 模板 (旧版本)
ue CLI >= 3 和旧版使用了相同的 vue 命令，所以 Vue CLI 2 (vue-cli) 被覆盖了。如果你仍然需要使用旧版本的 vue init 功能，你可以全局安装一个桥接工具：

``` sh
npm install -g @vue/cli-init
# `vue init` 的运行效果将会跟 `vue-cli@2.x` 相同
vue init webpack my-project
```
