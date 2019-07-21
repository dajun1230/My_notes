# Mpvue
## 快速上手
> 美团点评团队出品的小程序开发框架：mpvue。为什么说WePY是一个“类Vue”的框架，而这个mpvue是“基于Vue”的框架呢？因为WePY是在代码开发风格上借鉴了Vue，本身和Vue没有什么关系；而这个mpvue是从整个Vue的核心代码上经过二次开发而形成的一个框架，相当于是给Vue本身赋能，增加了开发微信小程序的能力。

环境搭建：
``` js
1. vue init mpvue/mpvue-quickstart my-project // my-project为文件名
// Project name 项目名称
// wxmp appid 开发者ID （wx***facaf75498695）
// Project description 项目描述
// Author 项目作者
// Vue build 
// Use Vuex 使用Vuex
// Use ESLint to lint your code 使用ESLint
// 小程序测试，敬请关注最新微信开发者工具的“测试报告”功能
2. cd my-project
3. npm install
4. npm run dev
5. 打开微信小程序开发者工具，导入项目
```
## 目录结构
``` js
|- build
|- config
|- dist
|- node_modules
|- src
    |- components
    |- pages
    |- utils
    |- app.json
    |- App.vue
    |- main.js
|- static
    |- images
    |- tabs
    |- .gitkeep
|- .babelrc
|- .editorconfig
|- .gitgnore
|- .postcssrc.js
|- index.html
|- package-lock.json
|- package.json
|- project.config.json
|- README.md
```