# 项目搭建

## 构建：create-react-app 快速脚手架
> 基于create-react-app官方脚手架搭建dva模式

creat-react-app优点
``` sh
● 无需配置：官方的配置堪称完美，几乎不用你再配置任何东西，就可以上手开发项目。
● 高集成性：集成了对React，JSX，ES6和Flow的支持。
● 自带服务：集成了开发服务器，你可以实现开发预览一体化。
● 热更新：保存自动更新，让你的开发更简单。
● 全兼容性：自动处理CSS的兼容问题，无需添加-webkit前缀。
● 自动发布：集成好了发布成品功能，编译后直接发布，并且包含了sourcemaps功能。
```
操作步骤：
1. 全局安装react：**npm install create-react-app -g**
::: warning 提示
● windows系统下：npm install -g create-react-app <br/>
● Liunx和Mac电脑下：sudo npm install -g create-react-app
:::
2. 创建项目，目录名为project：**create-react-app project**
3. 基本脚手架搭建完成，目录如下：

``` js
|- node_modules
|- public
|- src
    |- App.css
    |- App.js
    |- App.test.js
    |- index.css
    |- index.js
    |- logo.svg
    |- serviceWorker.js
|- .gitignore
|- package.json
|- README.md
|- yarn.lock
```

> 这就是脚手架目录，我们再来看package.json文件，如下：

``` js
{
  "name": "project",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-scripts": "3.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```
此时，可以通过**npm start**将项目运行起来，默认端口为3000

4. 增加配置
> 注意scripts执行命令中有一个eject，意为弹射暴露出所有配置，其实脚手架还是为我们封装了一些东西的，这里我们就暴露出所有配置吧。<br/>
运行 **npm run eject** ，一旦选择eject，那么所封装的组件依赖和项目结构会有所变化，此时的项目结构如图：
```  js
|- config // 新增
|- node_modules
|- public
|- scripts // 新增
|- src
|- .gitignore
|- package.json
|- README.md
|- yarn.lock
```
而package.json文件内容也发生变化，如图：
```  js
{
  "name": "project",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@babel/core": "7.4.3",
    "@svgr/webpack": "4.1.0",
    "@typescript-eslint/eslint-plugin": "1.6.0",
    "@typescript-eslint/parser": "1.6.0",
    "babel-eslint": "10.0.1",
    "babel-jest": "^24.8.0",
    "babel-loader": "8.0.5",
    "babel-plugin-named-asset-import": "^0.3.2",
    "babel-preset-react-app": "^9.0.0",
    "camelcase": "^5.2.0",
    "case-sensitive-paths-webpack-plugin": "2.2.0",
    "css-loader": "2.1.1",
    "dotenv": "6.2.0",
    "dotenv-expand": "4.2.0",
    "eslint": "^5.16.0",
    "eslint-config-react-app": "^4.0.1",
    "eslint-loader": "2.1.2",
    "eslint-plugin-flowtype": "2.50.1",
    "eslint-plugin-import": "2.16.0",
    "eslint-plugin-jsx-a11y": "6.2.1",
    "eslint-plugin-react": "7.12.4",
    "eslint-plugin-react-hooks": "^1.5.0",
    "file-loader": "3.0.1",
    "fs-extra": "7.0.1",
    "html-webpack-plugin": "4.0.0-beta.5",
    "identity-obj-proxy": "3.0.0",
    "is-wsl": "^1.1.0",
    "jest": "24.7.1",
    "jest-environment-jsdom-fourteen": "0.1.0",
    "jest-resolve": "24.7.1",
    "jest-watch-typeahead": "0.3.0",
    "mini-css-extract-plugin": "0.5.0",
    "optimize-css-assets-webpack-plugin": "5.0.1",
    "pnp-webpack-plugin": "1.2.1",
    "postcss-flexbugs-fixes": "4.1.0",
    "postcss-loader": "3.0.0",
    "postcss-normalize": "7.0.1",
    "postcss-preset-env": "6.6.0",
    "postcss-safe-parser": "4.0.1",
    "react": "^16.8.6",
    "react-app-polyfill": "^1.0.1",
    "react-dev-utils": "^9.0.1",
    "react-dom": "^16.8.6",
    "resolve": "1.10.0",
    "sass-loader": "7.1.0",
    "semver": "6.0.0",
    "style-loader": "0.23.1",
    "terser-webpack-plugin": "1.2.3",
    "ts-pnp": "1.1.2",
    "url-loader": "1.1.2",
    "webpack": "4.29.6",
    "webpack-dev-server": "3.2.1",
    "webpack-manifest-plugin": "2.0.4",
    "workbox-webpack-plugin": "4.2.0"
  },
  "scripts": {
    "start": "node scripts/start.js",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "jest": {
    "collectCoverageFrom": [
      "src/**/*.{js,jsx,ts,tsx}",
      "!src/**/*.d.ts"
    ],
    "setupFiles": [
      "react-app-polyfill/jsdom"
    ],
    "setupFilesAfterEnv": [],
    "testMatch": [
      "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
      "<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}"
    ],
    "testEnvironment": "jest-environment-jsdom-fourteen",
    "transform": {
      "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
      "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
      "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
    },
    "transformIgnorePatterns": [
      "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
      "^.+\\.module\\.(css|sass|scss)$"
    ],
    "modulePaths": [],
    "moduleNameMapper": {
      "^react-native$": "react-native-web",
      "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
    },
    "moduleFileExtensions": [
      "web.js",
      "js",
      "web.ts",
      "ts",
      "web.tsx",
      "tsx",
      "json",
      "web.jsx",
      "jsx",
      "node"
    ],
    "watchPlugins": [
      "jest-watch-typeahead/filename",
      "jest-watch-typeahead/testname"
    ]
  },
  "babel": {
    "presets": [
      "react-app"
    ]
  }
}
```
此处我本地更改下3000端口为9999，避免与其他本地项目冲突，安装cross-env：
```  js
npm install cross-env
// 将package.json中的“scripts”的“start”，修改“start”命令为：
- "start": "node scripts/start.js", // 旧
+ "start": "cross-env PORT=9999 node scripts/start.js", // 新
```
5. 安装Dva库
> dva也有自己的脚手架dva-cli，也可快速构建项目，目前已升至2.x版本，采用react-router@4.x路由版本。
```  
npm install dva --save
```
6. 项目改造为dva模式
``` js
|- config
|- node_modules
|- public
|- scripts
|- src
    |- assets
    |- components
    |- models
    |- router
    |- routes
    |- services
    |- utils
|- .gitignore
|- package.json
|- README.md
|- yarn.lock
``` 

## 构建：generator-react-webpack
优点介绍：
``` sh
● 基于webpack构建，可以很容易的配置自己需要的webpack。
● 支持ES6，集成了Babel-Loader。
● 支持不同风格的CSS（sass，less，stylus）。
● 支持PostCSS转换样式。
● 集成了esLint功能。
● 可以轻松配置单元测试，比如Karma和Mocha
```
安装

装还是在命令行用npm进行安装，不过在全局安装generator-react-webpack之前，你可以先安装yeoman。命令如下：
``` js
npm install -g yo
npm install -g generator-react-webpack
```
创建目录

我们先用命令自行创建一个文件：new-react-demo
``` js
mkdir new-react-demo
```
进入这个文件夹
``` js 
cd new-react-demo
```
用生成器生成我们的项目目录
``` js
yo react-webpack
```
用npm start就可以查看效果了。
::: tip 总结
generator-react-webpack更容易配置webpack，让你适应你的实际项目，并且有很强的扩展功能，但也有缺点，就是要依靠yeoman来生成。
:::

## 构建：webpack一步一步构建01
安装webpack

在安装webpack之前，我们先建立一个文件夹并进入，当然你可以用其他方法，我这里就用命令了。
``` js
mkdir react-webpack
cd react-webpack
```
进入文件夹后对我们的webpack项目进行初始化，命令如下：
``` js
npm n init
```
初始化成功后可以在项目根目录下看到package.json文件。如果你一路按回车感觉有些麻烦，你可以直接加一个-y参数，这样npm就直接给我们生成了。
``` js
npm n init -y
```
package.json文件建立好以后，你可以安装webpack了
``` js
npm install --save-dev webpack
```
建议使用cnpm来进行安装，这样速度会快很多。安装好后，你会在package.json里看到你安装的版本号。这样我们webpack就安装好了。

配置webpack.config.js

在项目根目录建立webpack.config.js文件，这个文件是进行webpack配置的，先建立基本的入口和出口文件。
``` js
var path =require('path');
module.exports = {
    //入口文件
    entry:'./app/index.js',
    //出口文件
    output:{
        filename:'index.js',
        path:path.resolve(__dirname,'dist')
    }
}
```
上边的代码只定义了入口文件和出口文件，如果你对这些还看不懂，那请学习我的《webpack3.x版 成神之路》 。文件配置好后，我们要根据文件的结构改造我们的项目目录，我们在根目录下新建app和dist文件夹，然后进入app文件夹，新建一个index.js文件。
新建index.html文件

在根目录新建index.html文件，并引入webpack设置中的出口文件，代码如下。
``` js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>React全家桶</title>
</head>
<body>
    
</body>
<!--引入出口文件-->
<script src="./dist/index.js"></script>
</html>
```
测试webpack配置

通过上面的步骤，配置好了wbpack，现在可以测试一下我们webpack配置是否有问题。在路口文件中写入下面的代码，并进行打包测试。

/app/index.js文件
``` js
function component(){
    var element = document.createElement('div');
    element.innerHTML = ('Hello World');
    return element;
}

document.body.appendChild(component());
```

加入打包命令

打开package.json文件，在scripts属性中加入build命令。
``` js
"scripts": {
    "build": "webpack"
  },
```
在终端中输入npm run build ，就可以看到打包结果了。如果没有出现错误，在浏览器中打开，可以看到我们的编写结果。到这部为止，我们正确安装了webpack，并进行了出入口的配置，也看到了webpack的输出结果。
::: warning 注意
如果打包不成功，需要安装npm install --save-dev webpack-cli，然后在重新打包。
:::
开发服务器配置

你会很容易的发现，我们现在缺少一个实时更新的服务，那动手马上配置一个。

在命令行安装webpack-dev-server,在终端中输入下面的命令。
``` js
cnpm install --save-dev webpack-dev-server
```
安装完成后，配置webpack.config.js文件。
``` js
devServer:{
    contentBase:'./',
    host:'localhost',
    compress:true,
    port:1717
}
```
配置好后再packeage.json里增加一个scripts命令，我们起名叫server。
``` js
"scripts": {
    "build": "webpack",
    "server": "webpack-dev-server --open"
  },
```
这里的–open是直接打开浏览器的意思。这些都配置完成后，就可以在终端输入npm run server 看到结果了。

自动刷新浏览器

在我们修改代码时，现在并不能自动刷新浏览器，不会立即呈现我们编写的代码结果，而时要再次npm run build才可以。其实只要在出口文件配置中加一个publicPath:’temp/’,然后在index.html引入JS时写这个temp地址就可以实时预览了。
``` js
output:{
    filename:'index.js',
    path:path.resolve(__dirname,'dist'),
    publicPath:'temp/'
},
```
index.html文件引入JS
``` js
<script src="./temp/index.js"></script>
```
总结：这节课主要是先设置好webpack的基本配置，这些配置其实在以前的课程中都已经讲过，但是我们还是需要重新配置一遍，因为如果你不配置，你下面的课程将没办法继续操作。

## 生命周期
> 挂载
``` js
当组件实例被创建并插入 DOM 中时，其生命周期调用顺序如下：

● constructor()
● static getDerivedStateFromProps()
● render()
● componentDidMount()

注意:
下述生命周期方法即将过时，在新代码中应该避免使用它们：
UNSAFE_componentWillMount()
``` 
> 更新
``` js
当组件的 props 或 state 发生变化时会触发更新。组件更新的生命周期调用顺序如下：

● static getDerivedStateFromProps()
● shouldComponentUpdate() // 如果 shouldComponentUpdate() 返回值为 false，则不会调用 componentDidUpdate()。
● render()
● getSnapshotBeforeUpdate() // 不常用
● componentDidUpdate(prevProps, prevState, snapshot)  // 会在更新后会被立即调用。首次渲染不会执行此方法。

注意:
下述方法即将过时，在新代码中应该避免使用它们：
UNSAFE_componentWillUpdate()
UNSAFE_componentWillReceiveProps()
```
> 卸载
``` js
当组件从 DOM 中移除时会调用如下方法：
● componentWillUnmount() // 会在组件卸载及销毁之前直接调用
```