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

## CSS分离和publicPath配置
### CSS分离
1. css分离需要安装mini-css-extract-plugin插件
``` js
npm install --save-dev mini-css-extract-plugin
```
2. 修改webpack.config.js，引入插件，并使用，代码如下：
``` js
const miniCssExtractPlugin = require('mini-css-extract-plugin');
```
3. 在plugins中进行使用，代码如下：
``` js
plugins: [
  new miniCssExtractPlugin({
    // 这里的配置和webpackOptions.output中的配置相似
    // 即可以通过在名字前加路径，来决定打包后的文件存在的路径
    filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
    chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
  }),
]
```
4. 将原有处理css的修改如下：
``` js
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        {
          loader: miniCssExtractPlugin.loader,
          options: {
            // 这里可以指定一个 publicPath
            // 默认使用 webpackOptions.output中的publicPath
            // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
            // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
            publicPath: './',  
            // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
            hmr: devMode, // 仅dev环境启用HMR功能
          },
        },
        'css-loader'
      ]
      // use: [{ // 原有
      //   loader: 'style-loader'
      // }, {
      //   loader: 'css-loader'
      // }]
    }
  }
}
```
5. 在终端输入命令：“webpack”进行打包查看
此时webpack.config.js的完成代码如下：
``` js
const path = require('path');
const htmlPulgin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
  mode: 'development',
  entry: {
    entry: './src/entry.js',
    home: './src/home.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js' // 前一个js代表js文件夹的意思，如果不写，则直接放到dist目录下
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader,
          }, {
            loader: 'css-loader'
          }
        ]
      }, {
        test: /\.(png|jpg|gif)/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 5000,
            outputPath: 'images' // 这是将图片统一放到dist目录的images文件夹下，如果没写，则放到dist目录下
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
    }),
    new miniCssExtractPlugin({
      filename: 'css/[name].css', // 前面这个css，代表的是css文件夹，如果不写，则直接放在dist文件下
      chunkFilename: 'css/[id].css',
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '192.168.1.3',
    compress: true,
    port: 8082
  }
}

module.exports = config;
```
### publicPath的使用
> 将css分离出来之后，会存在引用图片路径问题，当图片的大小小于limit的时候，是不会进行base位转换，而是直接生成图片并引用，然后将css分离成单独文件之后，引用路径就发生了改变，此时就需要配置publicPath。

1. 将图片打包中的limit：50000值改小，确保图片在打包时不会进行base 64位转换。
2. 在webpack.config.js增加如下配置，如下：
``` js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader,
            options: { // 此处为新增配置
              // 这里可以指定一个 publicPath
              // 默认使用 webpackOptions.output中的publicPath
              // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
              // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
              publicPath: '../', // 此处为设置css中引用图片的问题，如果css与images并存于dist目录下，则使用“../”  
              // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
            },
          },
          'css-loader'
        ]
      }
    ]
  }
}
```
此时打包完成的时候，图片都以绝对路径来引用的。

3. 终端输入“webpack”命令进行打包查看。

此时，webpack.config.js的配置文件如下：
``` js
const path = require('path');
const htmlPulgin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const config = {
  mode: 'development',
  entry: {
    entry: './src/entry.js',
    home: './src/home.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader,
            options: {
              // 这里可以指定一个 publicPath
              // 默认使用 webpackOptions.output中的publicPath
              // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
              // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
              publicPath: '../',  
              // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
              hmr: devMode, // 仅dev环境启用HMR功能
            },
          },
          'css-loader'
        ]
      }, {
        test: /\.(png|jpg|gif)/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 5000,
            outputPath: 'images'
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
    }),
    new miniCssExtractPlugin({
      // 这里的配置和webpackOptions.output中的配置相似
      // 即可以通过在名字前加路径，来决定打包后的文件存在的路径
      filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
      chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '192.168.1.3',
    compress: true,
    port: 8082
  }
}

module.exports = config;
```

## HTML中的图片打包

### 插入：
1. 如何调用依赖包中的webpack，而不是用本地的webpack

在package.json文件中的script出增加build命令，如下：
``` json
{
  "scripts": {
    "server": "webpack-dev-server",
    "build": "webpack" // 此处即调用node_modules文件中的依赖包
  }
}
```
2. 如何使打包后的图片都放在dist目录下的images文件夹下，代码如下：

修改webpack.config.js文件中对于图片模块的配置，增加outputPath配置：
``` js
module: {
  rules: [
    {
      test: /\.(png|jpg|gif)/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 5000,
          outputPath: 'images' // 配置此处，则会在dist文件夹下生成images文件夹，如果不配置，则直接保存在dist文件夹下。
        }
      }]
    }
  ]
}
```
### HTML中使用图片
> 当我们在html代码中写入img标签，并引用图片路径时，直接打包出来的文件夹里面的图片没有此图片，因为webpack没有对标签里面的图片进行处理。然而，国人对此问题，增加了一个html-withimg-loader的包（github.com上直接搜索该单词可以查到）。

具体操作步骤，如下：
1. 直接安装依赖包
``` js
npm install --save-dev html-withimg-loader
```
2. 在webpack.config.js文件的modules中rules的最后一个进行配置，如下：
``` js
module = {
  rules: [
    {
      test: /\.(htm|html)$/i,
      use: ['html-withimg-loader']
  ]
}
```
3. 终端输入命令“npm run build”中进行打包查看

此时，webpack.config.js文件的代码如下：
``` js
const path = require('path');
const htmlPulgin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';

const config = {
  mode: 'development',
  entry: {
    entry: './src/entry.js',
    home: './src/home.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader,
            options: {
              // 这里可以指定一个 publicPath
              // 默认使用 webpackOptions.output中的publicPath
              // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
              // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
              publicPath: '../',  
              // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
              hmr: devMode, // 仅dev环境启用HMR功能
            },
          },
          'css-loader'
        ]
      }, {
        test: /\.(png|jpg|gif)/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 5000,
            outputPath: 'images'
          }
        }]
      },
      {
        test: /\.(htm|html)$/i,
        use: ['html-withimg-loader']
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
    }),
    new miniCssExtractPlugin({
      // 这里的配置和webpackOptions.output中的配置相似
      // 即可以通过在名字前加路径，来决定打包后的文件存在的路径
      filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
      chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
    }),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '192.168.1.3',
    compress: true,
    port: 8082
  }
}

module.exports = config;
```

## webpack中的less和less分离

### less在webpack中的应用
1. 安装less依赖
``` js
npm install --save-dev less less-loader
```
2.在webpack.config.js中配置less，以自动转为css，配置如下：
``` js
module = {
  rules: [
    {
      test: /\.less/,
      use: ['style-loader', 'css-loader', 'less-loader'] // 切记需要将“less-loader”放到最后
      // use: [ // 第二种写法
      //   {
      //     loder: 'style-loader'
      //   }, {
      //     loder: 'css-loader'
      //   }, {
      //     loader: 'less-loader'
      //   }
      // ]
    }
  ]
}
```
3. 在src的css文件夹下新建gogo.less，并在entry.js中引用，代码如下:
``` less
@bgcolor: #000;

#gogo {
  width: 300px;
  height: 200px;
  background-color: #bgcolor;
}
```
entry.js引用:
``` js
import './css/index.css';
import './css/ceshi.css';
import './css/gogo.less';

document.getElementById("title").innerHTML = "Hello Webpack!";
```
4. 修改src下的index.html文件，如下：
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
  <!-- 增加id为gogo的标签 -->
  <div id="gogo"></div>
  <div><img src="./images/girl.jpg" alt=""></div>
  <div id="img">
  </div>
  <div id="title"></div>
</body>
</html>
```
5. 启动项目，查看效果

::: warning 注意
此时，对代码进行打包时，打包后的entry.js文件中会包含gogo.less中的语法，简而言之就是less代码并未与js代码进行分离。
:::

### less分离
修改webpack.config.js，代码如下：
``` js
module = {
  rules: [
    {
      test: /\.less/,
      // use: ['style-loader', 'css-loader', 'less-loader'] // 修改之前
      use: [ // 修改之后
          {
            loader: miniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'less-loader'
        ]
    }
  ]
}
```
修改之后，再次进行打包，发现dist文件夹下的entry.js文件中的css代码分离出来了。

## webpack中的sass和sass分离

### sass在webpack中的应用
1. 安装sass依赖
``` js
npm install --save-dev node-save sass-loader
```
2.在webpack.config.js中配置sass，以自动转为css，配置如下：
``` js
module = {
  rules: [
    {
      test: /\.less/,
      use: ['style-loader', 'css-loader', 'sass-loader'] // 切记需要将“sass-loader”放到最后
    }
  ]
}
```
3. 在src的css文件夹下新建bb.scss，并在entry.js中引用，代码如下:
``` scss
$bgcolor: #000;

#bb {
  width: 300px;
  height: 200px;
  background-color: $bgcolor;
}
```
entry.js引用:
``` js
import './css/index.css';
import './css/ceshi.css';
import './css/gogo.less';
import './css/bb.scss';

document.getElementById("title").innerHTML = "Hello Webpack!";
```
4. 修改src下的index.html文件，如下：
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
  <!-- 增加id为bb的标签 -->
  <div id="bb"></div>
  <div id="gogo"></div>
  <div><img src="./images/girl.jpg" alt=""></div>
  <div id="img">
  </div>
  <div id="title"></div>
</body>
</html>
```
5. 启动项目，查看效果

::: warning 注意
此时，对代码进行打包时，打包后的entry.js文件中会包含bb.scss中的语法，简而言之就是scss代码并未与js代码进行分离。
:::

### less分离
修改webpack.config.js，代码如下：
``` js
module = {
  rules: [
    {
      test: /\.scss/,
      // use: ['style-loader', 'css-loader', 'sass-loader'] // 修改之前
      use: [ // 修改之后
          {
            loader: miniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'sass-loader'
        ]
    }
  ]
}
```
修改之后，再次进行打包，发现dist文件夹下的entry.js文件中的css代码分离出来了。

## postcss自动增加CSS属性前缀

1. 安装依赖包
``` js
npm install --save-dev postcss-loader autoprefixer
```
2. 在根目录下新建postcss.config.js，代码如下：
``` js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```
3. 配置webpack.config.js，更改如下：
``` js
modelu: {
  rules: [
    {
      test: /\.css$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader,
            options: {
              // 这里可以指定一个 publicPath
              // 默认使用 webpackOptions.output中的publicPath
              // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
              // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
              publicPath: '../',  
              // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
              hmr: devMode, // 仅dev环境启用HMR功能
            },
          },
          { // 增加的配置如下
            loader: 'css-loader', options: {importLoaders: 1}
          },
          'postcss-loader'
          // 'css-loader' //原有配置
        ]
    }
  ]
}
```
4. 修改css下的index.css，增加会增加前缀的样式，如下：
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
  /* 增加如下两行 */
  transform: rotate(45deg);
  box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.25);
}
```
5. 进行打包，终端输入命令“npm run build”，查看打包后的css文件
``` css
#img {
  background: url(../images/34cd34083dd07fb98a9a06b8ea0c609d.jpg);
  width: 300px;
  height: 300px;
  /* 如下行所示，自动增加webkit前缀 */
  -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
  box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.25);
}
```
附(网址)：  
[webpack postcss-loader配置](https://webpack.js.org/loaders/postcss-loader/#autoprefixing)  
[github postcss-loader配置](https://github.com/postcss/autoprefixer)

## 消除无用的CSS
> 在项目中，我们可能用经常引用其他的组件库，但是我们只是用到其中的一部分，然而很多的css代码就会一同打包到项目上，造成冗余，另外我们在修改样式过程中，可能很多样式右没有去删除掉，导致遗留在项目上，此时我们就可以去掉该无效的css代码。

1. 安装依赖包
``` js
npm install -D purifycss-webpck purify-css // -D是--save-dev的缩写
// 其中purigycss-webpack是依赖于purify-css，所以需要同时安装purify-css
```
2. 在webpakc.config.js中进行引入，同时配置，如下：
``` js
const glob = require('glob');
const purifyCSSPlugin = require('purifycss-webpack');
```
同时，plugins中增加配置：
``` js
plugins: [
  new purifyCSSPlugin({
    paths: glob.sync(path.join(__dirname, 'src/*.html'))
    // 意思是对src下的所有html文件就行同步核查，去掉无效的css
  })
]
```
3. 在index.css增加css代码，如下：
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
  transform: rotate(45deg);
  box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.25);
}
/* 无id为aaa的标签，所以此处的代码为无效的css代码 */
#aaa {
  width: 200px;
  height: 200px;
}
```
4. 在终端输入命令“npm run build”进行打包，查看css文件，发现index.css中无效css代码不存在了。

## 让webpack进行babel转换
> 根据babel-loader的版本号决定安装@babel/core还是babel-core等依赖包。

### webpack.config.js中配置
::: warning 注意
babel-loader和babel-core版本不对应所产生的：  
babel-loader 8.x对应babel-core 7.x  
babel-loader 7.x对应babel-core 6.x  
:::
1. 安装依赖包
``` js
npm install --save-dev babel-loader @babel/core @babel/preset-env
// babel-loader：用于webpack
// @babel/core 对应babel-loader 8.x版本，是babel的核心
// @babel/preset-es2015 用于转换es6的语法
// @babel/preset-react 用于转换react中的jsx语法
```
2. 在webpack中进行配置
``` js
module: {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/, // 去除的文件夹，以免node_modules中的js文件一起进行转换了
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env']
        }
      }
    }
  ]
}
```
3. 更改entry.js文件，使用es6的语法let，如下：
``` js
import './css/index.css';
import './css/ceshi.css';
import './css/gogo.less';
import './css/bb.scss';

let mm = 0; 
mm+=5;
console.log(mm);
document.getElementById("title").innerHTML = "Hello Webpack!";
```
4. 终端输入命令“npm run build”，进行打包查看，结果发现，打包后的let不见了，变成了var变量。

### babel.config.js中配置
1. 在根目录下新建babel.config.js文件，写入如下代码：
``` js
module.exports = {
  presets: ['@babel/preset-react', '@babel/preset-env']
}
```
2. 去除webpack.config.js中的babel的options配置，如下：
``` js
module: {
  rules: [
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        // options: { // 将此处删除或者注释掉
        //   presets: ['@babel/preset-react', '@babel/preset-env']
        // }
      }
    }
  ]
}
```
3. 终端输入命令“npm run build”，进行打包查看，结果发现，打包后的let不见了，变成了var变量。

## 打包后的代码调试
> 对于打包后的文件，如果有错误，可以进行配置，然后再控制台会将错误结果显示出来。

配置过程如下：

在webpack.config.js文件中的对象里进行配置devtool，具体如下：
``` js
module.exports = {
  devtool: "source-map",
  // entry: {},
  // output: {},
  // modules: {},
  // plugins: []
}
```
devtool的值有四种类型：
``` sh
1. source-map: 打包后会生成独立的文件，并提示多少行、多少列发生错误  
2. cheap-moudle-source-map：打包后会生成独立的文件，只提示多少列发生错误，不提示多少行  
3. eval-source-map：打包文件中提示错误，不单独生成文件，会提示多少行、多少列发生错误，该类型会有安全隐患，所以只能在开发阶段使用。  
4. cheap-moudle-eval-source-map：打包文件中提示错误，只提示多少列发生错误，不提示多少行
```

## webpack.config.js完整版
``` js
const path = require('path');
const glob = require('glob');
const htmlPulgin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

const devMode = process.env.NODE_ENV !== 'production';
const purifyCSSPlugin = require('purifycss-webpack');

const config = {
  mode: 'development',
  entry: {
    entry: './src/entry.js',
    home: './src/home.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: miniCssExtractPlugin.loader,
            options: {
              // 这里可以指定一个 publicPath
              // 默认使用 webpackOptions.output中的publicPath
              // publicPath的配置，和plugins中设置的filename和chunkFilename的名字有关
              // 如果打包后，background属性中的图片显示不出来，请检查publicPath的配置是否有误
              publicPath: '../',  
              // publicPath: devMode ? './' : '../',   // 根据不同环境指定不同的publicPath
              hmr: devMode, // 仅dev环境启用HMR功能
            },
          },
          {
            loader: 'css-loader', options: {importLoaders: 1}
          },
          'postcss-loader'
        ]
      }, {
        test: /\.(png|jpg|gif)/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 5000,
            outputPath: 'images'
          }
        }]
      },
      {
        test: /\.(htm|html)$/i,
        use: ['html-withimg-loader']
      },
      {
        test: /\.less/,
        use: [
          {
            loader: miniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.scss/,
        use: [
          {
            loader: miniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          // options: {
          //   presets: ['@babel/preset-react', '@babel/preset-env']
          // }
        }
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
    }),
    new miniCssExtractPlugin({
      // 这里的配置和webpackOptions.output中的配置相似
      // 即可以通过在名字前加路径，来决定打包后的文件存在的路径
      filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
      chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css',
    }),
    // new purifyCSSPlugin({
    //   paths: glob.sync(path.join(__dirname, 'src/*.html'))
    // })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: '192.168.1.3',
    compress: true,
    port: 8082
  }
}

module.exports = config;
```
