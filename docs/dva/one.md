# 快速上手
## 安装 dva-cli
通过 npm 安装 dva-cli 并确保版本是 0.9.1 或以上。
``` js
$ npm install dva-cli -g
$ dva -v
dva-cli version 0.9.1
```

创建新应用
``` js
$ dva new dva-project // dva-project为项目文件名
```

然后我们 cd 进入 dva-quickstart 目录，并启动开发服务器：
``` js
$ cd dva-project // 进入文件夹
$ npm start
```
几秒钟后，你会看到以下输出：
``` sh
Compiled successfully!

The app is running at:

  http://localhost:8000/

Note that the development build is not optimized.
To create a production build, use npm run build.
```
在浏览器里打开 http://localhost:8000 ，你会看到 dva 的欢迎界面。
此时目录结构为：
``` js
|- mock
|- node_modules
|- public
|- src
    |- asserts
    |- components
    |- models
    |- routes
    |- services
    |- utils
    |- router.js
    |- index.js
    |- index.css
|- .editorconfig
|- .eslintrc
|-  package.json
|- .roadhogrc.mock.js
|- .webpackrc
```
## 使用antd
通过 npm 安装 antd 和 babel-plugin-import 。babel-plugin-import 是用来按需加载 antd 的脚本和样式的。
``` js
$ npm install antd babel-plugin-import --save
```

## 使用antd-mobile
通过 npm 安装 antd-mobile 和 postcss-pxtorem 。

## 修改配置文件
> 将“.webpackrc”文件，更换为“.webpackrc.js”文件，并写入：
``` js
import pxtorem from 'postcss-pxtorem';
import config from './src/utils/config.js';
export default {
    entry: "src/index.js",
    disableCSSModules: true,
    browserslist:[
        "iOS >= 8", 
        "Android >= 4"
    ],
    proxy: {
      "/v1": {
        target: 'http://' + config.ipAddr + '/v1/',
        changeOrigin: true,
        pathRewrite: { "^/v1" : "" }
      }
    },
    env: {
      development: {
        extraBabelPlugins: [
          ["import", { style: true, libraryName: "antd-mobile" ,libraryDirectory: "es"}]
        ],
        publicPath: "/",
        theme: {
          '@hd': '2px'
        },
        extraPostCSSPlugins: [
          pxtorem({ rootValue: 32, propWhiteList: [] })
        ]
      },
      production: {
        extraBabelPlugins: [
          ["import", { style: true, libraryName: "antd-mobile" ,libraryDirectory: "es"}]
        ],
        publicPath: "/dist/",
        theme: {
          '@hd': '2px'
        },
        extraPostCSSPlugins: [
          pxtorem({ rootValue: 32, propWhiteList: [] })
        ]
      }
    }
}
```