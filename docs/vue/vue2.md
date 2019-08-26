# Vue 2.0

## 走起我的Vue2.0
下载Vue2.0的两个版本：

[官方网站：](https://cn.vuejs.org/)

● 开发版本：包含完整的警告和调试模式
● 生产版本：删除了警告，进行了压缩

**live-server使用**
用npm进行全局安装
``` js
npm install live-server -g
```
在项目目录中打开
``` js
live-server
```
编写第一个HelloWorld代码：
``` js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script type="text/javascript" src="../assets/js/vue.js"></script>
    <title>Vue 2.0</title>
</head>
<body>
    <div id="app">
        {{message}}
    </div>
    <script type="text/javascript">
        var app = new Vue({
            el: '#app',
            data: {
                message: 'Hello World'
            }
        })
    </script>
</body>
</html>
```