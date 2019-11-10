# webpack 3+基础
> 当前版本号3.6.0
## 认识webpack的作用
1. webpack安装
``` js
1. mkdir webpack_demo // 新建webpack_demo文件夹
2. cd webpack_demo // 进入文件架
3. npm install -g webpack@3.6.0 // 全局安装指定版本号3.6.0，但是官方建议不要全局安装，因为安装之后在使用的时候，项目会优先使用本地的webpack
```

### 项目webpack安装
``` js
1. mkdir webpack_demo
2. cd webpack_demo
3. npm init -y // 生成package.json文件，-y是默认选择
4. npm install -D webpack@3.6.0 // 安装webpack版本（版本号：3.6.0）
```

## webpack快速上手
1. 项目搭建完成之后，在package.json同级目录下新建dist、src文件夹，幷在dist文件夹下新建index.html文件，代码如下：
``` js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Yang Webpack</title>
</head>
<body>
  <div id="title"></div>
  <script src="./bundle.js"></script>
</body>
</html>
```
此处，需要引入同级目录下的bundle.js文件，目前该文件未生成。

2. 在src下新建emtry.js（入口）文件，代码如下：
``` js
document.getElementById("title").innerHTML = "Hello Webpack";
```
3. 打开终端，输入命令：
``` js
webpack src/entery dist/bundle.js
```
webpack后跟两个参数，前一个是需要打包的文件，后一个是打包后生成的文件。
4. 本地启服务器运行查看
``` js
npm install -g live-server // 全家安装
live-server // 输入命令，启动查看
```

## 入口和出口
1. 在项目根目录下创建webpack.config.js，其代码：
``` js 
module.exports = {
  entry: {}, // 入口
  output: {}, // 出口
  module: {}, // 模块
  pulgins: [], // 插件
  devServer: {} // 
}
```
或者写成如下也可以：
``` js
const config = {
  entry: {}, // 入口
  output: {}, // 出口
  module: {}, // 模块
  pulgins: [], // 插件
  devServer: {} // 
}

module.exports = config;
```
最终配置为：
``` js
const path = require('path');

module.exports = {
  entry: { // 入口
    entry: './src/entry.js'
  },
  output: { // 出口
    path: path.resolve(__dirname, 'dist'), // node的语法，最终结果为基本路径（eg：f:\webpack_demo\dist）
    filename: 'bundle.js' // 打包后生成的文件
  },
  module: {}, // 模块
  pulgins: [], // 插件
  devServer: {} // 
}
```
插入：path.resolve(__dirname, 'dist')语法介绍，根目录下新建newjs.js文件，代码如下：
``` js
const path = require('path');
console.log('是什么：'+ path.resolve(__dirname, 'dist'));
```
然后终端输入：
``` js
node newjs.js
```
打印出的结果为： 是什么：f:\webpack_demo\dist

最后终端输入：
``` js
webpack
```
结果显示和之前一样的结果。但是目前是单入口，单出口，如何更改为多入口，多出口呢？
### 多入口、多出口
当需要配置多入口、和多出口时，同时也需要在index.html文件中，引入多个js文件，同时配置文件更改如下：
``` js
const path = require('path');

module.exports = {
  entry: { // 两个入口，需要对应两个出口
    entry: './src/entry.js',
    entry2: './src/entry2.js'
  },
  output: { // 出口
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js' // 打包后生成的文件为entry.js和entry2.js，和入口文件时的字段名称一致
  },
  module: {},
  pulgins: [],
  devServer: {}
}
```
最后终端输入：webpack 命令进行打包。

## 配置服务和热更新
配置服务主要是配置devServer，有四个参数，如下：
``` js
const path = require('path');

module.exports = {
  entry: { // 入口
    entry: './src/entry.js'
  },
  output: { // 出口
    path: path.resolve(__dirname, 'dist'), // node的语法，最终结果为基本路径（eg：f:\webpack_demo\dist）
    filename: 'bundle.js' // 打包后生成的文件
  },
  module: {}, // 模块
  pulgins: [], // 插件
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'), // 绝对路径
    host: '192.168.0.101', // 本地地址
    conpress: true, // 是否启用服务器压缩
    post: 1717 // 端口，默认端口为80
  }
}
```
配置完成之后，需要在终端输入：
``` js
webpack-dev-server
```
此时，会报错，会提示不存在该命令，此时需要安装依赖，如下：
``` js
cnpm install webpack-dev-server --save-dev
```
同时，需要将package.json文件中的“script”出完全替换，如下：
``` json
"scripts": {
  "server": "webpack-dev-server"
},
```
此时在终端输入命令： webpack-dev-server，成功之后将后续显示的网址输入后在浏览器中打开，发现已完成。
同时，修改入口文件中的内容，页面上的内容也会更新，完成了热更新。

