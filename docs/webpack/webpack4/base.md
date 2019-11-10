# webpack 4+基础

## 认识webpack的作用
1. webpack安装
``` js
1. mkdir webpack_demo // 新建webpack_demo文件夹
2. cd webpack_demo // 进入文件架
3. npm install -g webpack // 全局安装，但是官方建议不要全局安装，因为安装之后在使用的时候，项目会优先使用本地的webpack
4. npm install -g webpack-cli // 以上webpack、webpack-cli都会默认安装最新版本（当前版本为：4.41.2、3.3.10）
```
经过多次验证，webpack 3+版本，不需要安装webpack-cli，如果安装webpack 4+，不安装webpack-cli，此时打包的时候会提示你：“Do you want to install 'webpack-cli' (yes/no)”，此时，需要全局安装webpack-cli。
### 项目webpack安装
``` js
1. mkdir webpack_demo
2. cd webpack_demo
3. npm init -y // 生成package.json文件，-y是默认选择
4. npm install webpack --save-dev // 安装webpack版本（版本号：4.41.2），当前版本为2019/11/10时的最新版本。
5. npm install webpack-cli --save-dev // 安装webpack-cli版本（版本号：3.3.10），当前版本为2019/11/10时的最新版本。
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
  <title>Hello Webpack</title>
</head>
<body>
  <div id="title"></div>
  <script src="./bundle.js"></script>
</body>
</html>
```
此处，需要引入同级目录下的bundle.js文件，目前该文件未生成。

2. 在src下新建entry.js（入口）文件，代码如下：
``` js
document.getElementById("title").innerHTML = "Hello Webpack";
```
3. 打开终端，输入命令：
``` js
webpack src/entery -o dist/bundle.js // 格式：webpack 入口文件.js -o 出口文件.js ，-o是到的意思。
```
webpack后跟两个参数，前一个是需要打包的文件，后一个是打包后生成的文件。
::: warning 注意
终端会提示你，当前打包的环境是生成环境（默认为生产环境，代码文件中代码不换行），**生产环境的打包后文件大小会开发环境的小**，其中开发环境包含一些日志等信息，**生产环境中不会包含注释的代码**，生产环境和开发环境**都会保留console.log()**。
:::
开发环境打包，需要加上（--mode development），代码如下：
``` js
webpack src/entery --mode development -o dist/bundle.js
```
4. 本地启服务器运行查看
``` js
npm install -g live-server // 全局安装
live-server // 输入命令，启动查看
//（默认端口为8080，需要更改启动端口，命令：live-server --port=8081，此时端口为8081）
```

## 入口和出口
1. 在项目根目录下创建webpack.config.js，其代码：
``` js 
module.exports = {
  mode: 'development',  // 值为： development、production、none (默认为 production)
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
  // mode: 'development',  // 值为： development、production、none (默认为 production)
  entry: {}, // 入口
  output: {}, // 出口
  module: {}, // 模块
  pulgins: [], // 插件
  devServer: {} // 服务
}

module.exports = config;
```
最终配置为：
``` js
const path = require('path');

module.exports = {
  mode: 'development',
  entry: { // 入口
    entry: './src/entry.js'
  },
  output: { // 出口
    path: path.resolve(__dirname, 'dist'), // node的语法，最终结果为基本路径（eg：f:\webpack_demo\dist）
    filename: 'bundle.js' // 打包后生成的文件
  },
  module: {}, // 模块
  pulgins: [], // 插件
  devServer: {} // 服务
}
```
### mode的使用
webpack 4+版本中新增了mode，没有写会默认为**生产环境**。
``` js
// 终端输入： webpack 即打包后文件为生产环境文件；输入：webpack --mode development 即打包后文件为
webpack
// 或者
webpack --mode development
```
可以直接webpack.config.js文件中直接配置mode的值，即更改打包后文件的环境。
### path的讲解
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
  mode: 'development',
  entry: { // 两个入口，需要对应两个出口
    entry: './src/entry.js',
    entry2: './src/entry2.js'
  },
  output: { // 出口
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js' // 打包后生成的文件为entry.bunble.js和entry2.bunble.js，和入口文件时的字段名称一致
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
  mode: 'development',
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
    contentBase: path.resolve(__dirname, 'dist'), // 绝对路径，告诉服务器从何处提供内容。仅当您要提供静态文件时才需要这样做。
    host: '192.168.0.101', // 本地地址, 如果注释掉，则会默认为 localhost
    compress: true, // 对所有服务启用gzip压缩
    post: 1717 // 端口，默认端口为8080
    hot: true // 启用webpack的热模块更换功能，默认为true
  }
}
```
配置完成之后，需要在终端输入：
``` js
webpack-dev-server
```
此时，会报错，会提示不存在该命令，此时需要安装依赖，如下：（报错原因如下：终端使用的是本地npm/node_modules里面的依赖包，而npm run server这种命令是调用的是该文件下node_modules下面的依赖包）
``` js
cnpm install webpack-dev-server --save-dev
```
同时，需要将package.json文件中的“script”出完全替换，如下：
``` json
"scripts": {
  "server": "webpack-dev-server"
},
```
此时在终端输入命令： **webpack-dev-server**，成功之后将后续显示的网址输入后在浏览器中打开，**地址为: localhost:1717 或者 192.168.0.101：1717**。

同时，修改入口文件中的内容，页面上的内容也会更新，完成了热更新。**（切记：index.html中引入的js文件要和对应打包的js相对应）**

此时，package.json内容为：
``` json
{
  "name": "webpack",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "server": "webpack-dev-server"
  },
  "devDependencies": {
    "webpack": "^4.41.2",
    "webpack-cli": "^3.3.10",
    "webpack-dev-server": "^3.9.0"
  }
}
```

## 打包css文件
在更高层面，在 webpack 的配置中 loader 有两个目标：
``` sh
1. test 属性，用于标识出应该被对应的 loader 进行转换的某个或某些文件。
2. use 属性，表示进行转换时，应该使用哪个 loader。
```
1. 在src文件夹下新建css文件夹，并增加index.css，写入如下代码：
``` css
body {
  background-color: red;
  color: white;
  font-weight: bold;
}
```
2. 在src/entry.js中引入当前css；
``` js
import './css/index.css'; // es6引入css语法

document.getElementById("title").innerHTML = "Hello Webpack!";
```
3. 在webpack.config.js下的module对象下写入：
``` js
module: {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'] // 第一种写法：使用use
  // loader: ['style-loader', 'css-loader'] // 第二种写法：使用loader
  /* use：[ // 第三种写法：use + loader
    {
      loader: 'style-loader'
    }, {
      loader: 'css-loader'
    }
  ] */
}
```
4. 安装style-loader，css-loader：
``` js
npm install style-loader css-loader --save-dev // 安装依赖
```
5. 启动，运行：
``` js
npm run server // 效果为，背景为红色，字体加粗为白色。
```
此时，终端输入命令：webpack 进行打包时，打包后的css会在js中，没有单独分离开来。

webpack.config.js完整代码：
``` js
const path = require('path');

const config = {
  mode: 'development',
  entry: {
    entry: './src/entry.js',
    about: './src/about.js',
    home: './src/home.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '192.168.0.102',
    compress: true,
    port: 8082
  }
}

module.exports = config;
```

## 插件配置_Js代码压缩
webpack.config.js更改如下：
``` js
const path = require('path');
const uglify = require('uglifyjs-webpack-plugin'); // 引入api插件

const config = {
  mode: 'development',
  entry: {
    entry: './src/entry.js',
    about: './src/about.js',
    home: './src/home.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new uglify() // 使用，进行压缩
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '192.168.0.102',
    compress: true,
    port: 8082
  }
}

module.exports = config;
```
2. 配置完成之后，在终端输入：webpack 进行打包，打包完成之后可以对比使用该插件与不适用该插件的文件大小的差别。

## HTML文件的打包
1. 将dist文件夹下的所有文件进行删除
2. 在src目录下新建index.html文件，如下：
``` js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Hello Webpack</title>
</head>
<body>
  <div id="title"></div>
</body>
</html>
```
3. 安装html-webpack-plugin插件
``` js
npm install --save-dev html-webpack-plugin
```
4. 更改webpack.config.js文件，其中引入html-webpack-plugin插件，如下：
引入：
``` js
const htmlPulgin = require('html-webpack-plugin');
```
并更改plugins对象，如下：
``` js
plugins: [
    new htmlPulgin({ // 引入并使用
      minify: { // 压缩
        removeAttributeQuotes: true // <div id="title"></div>去掉引号后变成<div id=title></div>
      },
      hash: true, // 哈希值，防止我们进行缓存，类似与key值
      template: './src/index.html' // 模板文件
    })
  ],
```
webpack.config.js完整代码如下：
``` js
const path = require('path');
const htmlPulgin = require('html-webpack-plugin'); // 打包html文件

const config = {
  mode: 'development',
  entry: {
    entry: './src/entry.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    new htmlPulgin({ // 引入并使用
      minify: { // 压缩
        removeAttributeQuotes: true // <div id="title"></div>去掉引号后变成<div id=title></div>
      },
      hash: true, // 哈希值，防止我们进行缓存，类似与key值
      template: './src/index.html' // 模板文件
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '192.168.0.102',
    compress: true,
    port: 8082
  }
}

module.exports = config;
```
5. 重新在终端输入：webpack 命令，会在dist文件下生成index.html、entry.js两个文件，其中index.html如下：
``` html
<!DOCTYPE html>
<html lang=en>
<head>
  <meta charset=UTF-8>
  <meta name=viewport content="width=device-width,initial-scale=1">
  <meta http-equiv=X-UA-Compatible content="ie=edge">
  <title>Hello Webpack</title>
</head>
<body>
  <div id=title></div>
  <!-- 其中去掉了双引号，自动引入js文件，增加?462b7f8cf7c42b4258e4即代表hash值。 -->
<script type=text/javascript src=entry.js?462b7f8cf7c42b4258e4></script></body>
</html>
```

## CSS中引用图片
1. 在src下新建images文件夹，并存放一张timg.jpg格式的图片。
2. 在index.html文件中增加标签，修改如下：
``` html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Hello Webpack</title>
</head>
<body>
  <!-- id为img为设置背景图片 -->
  <div id="img"></div>
  <div id="title"></div>
</body>
</html>
```
3. 更改css文件，写入背景图片，
``` css
body {
  background-color: red;
  color: white;
  font-weight: bold;
}

#img {
  background: url(../images/timg.jpg);
  width: 300px;
  height: 300px;
}
```
4. 安装url-loader、file-loader
``` js
npm install url-loader file-loader --save-dev
```
5. 增加webpack配置文件中的module模块，
``` js
{
  test: /\.(png|jpg|gif)/,
  use: [{
    loader: 'url-loader',
    options: {
      limit: 50000 
    }
  ]
}
```
::: warning 说明
注：此处单位为bit，该数字与图片大小进行比较，如果limit > 图片大小，则图片会转为base64进行打包；如果limit < 图片大小，则图片不会转格式，在dist目录下会生成一张图片，名字不一样。（其中，**file-loader**主要是作用于当图片没有进行base64转换后打包时，其引用路径就会发生改变，而file-loader则会更正引用路径。）
:::
此时，webpack.config.js完整代码如下：
``` js
const path = require('path');
const htmlPulgin = require('html-webpack-plugin');

const config = {
  mode: 'development',
  entry: {
    entry: './src/entry.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{
          loader: 'style-loader'
        }, {
          loader: 'css-loader'
        }]
      }, {
        test: /\.(png|jpg|gif)/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 50000
          }
        }]
      }
    ]
  },
  plugins: [
    new htmlPulgin({
      minify: { // 压缩
        removeAttributeQuotes: true // <div id="title"></div>去掉引号后变成<div id=title></div>
      },
      hash: true, // 哈希值，防止我们进行缓存，类似与key值
      template: './src/index.html' // 模板文件
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '192.168.0.102',
    compress: true,
    port: 8082
  }
}

module.exports = config;
```


