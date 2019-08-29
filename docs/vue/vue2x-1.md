# Vue 2.0

## 走起我的Vue2.0
下载Vue2.0的两个版本：

[官方网站：](https://cn.vuejs.org/)

● 开发版本：包含完整的警告和调试模式  
● 生产版本：删除了警告，进行了压缩

**live-server 使用**

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

## v-if v-else v-show 指令
**v-if的使用：**

v-if:是vue 的一个内部指令，指令用在我们的html中。v-if用来判断是否加载html的DOM，关键代码如下：
``` js
 <div v-if="isLogin">你好，请登录！</div>
```
完整html代码：
``` js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="../common/js/vue.js"></script>
</head>
<body>
    <div id="app">
        <div>{{message}}</div>
        <hr />
        <div v-if="isLogin">已经登录</div>
        <div v-else="isLogin">您未登录，请登录</div>
        <div v-show="isLogin">未显示</div>
    </div>
    <script>
        var app = new Vue({
            el: "#app",
            data: {
                message: 'Hello World',
                isLogin: true
            }
        })
    </script>
</body>
</html>
```
**v-show的使用:**

调整css中display属性，DOM已经加载，只是CSS控制没有显示出来。

**v-if 和v-show的区别：**

● v-if： 判断是否加载，可以减轻服务器的压力，在需要时加载。
● v-show：调整css dispaly属性，可以使客户端操作更加流畅。

## v-for指令 ：解决模板循环问题
v-for指令是循环渲染一组data中的数组，v-for 指令需要以 item in items 形式的特殊语法，items 是源数据数组并且item是数组元素迭代的别名。

**一、基本用法**
``` js
<ul v-for="item in items">
    <li>数字：{{item}}</li>
</ul>
```
完整代码：
``` js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="../common/js/vue.js"></script>
    <title>v-for</title>
</head>
<body>
    <div id="app">
        <ul v-for="item in items">
            <li>数字：{{item}}</li>
        </ul>
    </div>
    <script type="text/javascript">
        var app = new Vue({
            el: "#app",
            data: {
                items: [31, 25, 50, 65, 10, 80, 75]
            }
        })
    </script>
</body>
</html>
```
**二、排序**

要在输出之前给数组排个序，那我们就用到了Vue的computed:属性。
``` js
computed: {
    sortItems: function(){
          return this.items.sort();
    }
}
```
但是这个在小程序还是有个小Bug的，现在我把数组中的80改为8，则会发现此时的排序并不是我们想要的结果。

我们可以自己编写一个方法sortNumber，然后传给我们的sort函数解决这个Bug。
``` js
function sortNumber(a,b){
    return a-b
}
```
用法：
``` js
computed:{
    sortItems:function(){
    return this.items.sort(sortNumber);
    }
 }
```
完整代码：
``` js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="../common/js/vue.js"></script>
    <title>v-for</title>
</head>
<body>
    <div id="app">
        <ul v-for="item in sortItems">
            <li>数字：{{item}}</li>
        </ul>
    </div>
    <script type="text/javascript">
        var app = new Vue({
            el: "#app",
            data: {
                items: [31, 25, 50, 65, 10, 8, 75]
            },
            computed: {
                sortItems: function() {
                    return this.items.sort(sortNumber);
                }
            }
        })

        function sortNumber(a,b) {
            return a-b;
        }
    </script>
</body>
</html>
```
也可以将方法写在vue中的methods方法中，通过this.sortNumber去调用。

**三、对象循环输出**

我们先定义个数组，数组里边是对象数据：
``` js
sutdents: [
    {name: '小明',mark: '56'},
    {name: '小红',mark: '85'},
    {name: '小杨',mark: '70'},
    {name: '小方',mark: '90'}
]
```
在模板中输出:
``` js
<ul>
   <li v-for="student in students">
       {{student.name}} - {{student.age}}
   </li>
</ul>
```
加入索引序号：
``` js
//数组对象方法排序: （只适合于值为Number类型）
function sortByKey(array,key){
    return array.sort(function(a,b){
      var x=a[key];
      var y=b[key];
      return ((x<y)?-1:((x>y)?1:0));
   });
}
```
有了数组的排序方法，在computed中进行调用排序
``` js
sortStudent:function(){
    return sortByKey(this.students,'mark');
}
```

## v-text & v-html
我们已经会在html中输出data中的值了，我们已经用的是,这种情况是有弊端的，就是当我们网速很慢或者javascript出错时，会暴露我们的。Vue给我们提供的v-text,就是解决这个问题的。我们来看代码：
``` html
<span>{{ message }}</span>
<!-- 等价于 -->
<span v-text="message"></span>
```
如果在javascript中写有html标签，用v-text是输出不出来的，这时候我们就需要用v-html标签了。
``` html
<span v-html="msgHtml"></span>
```
::: danger 注意
需要注意的是：在生产环境中动态渲染HTML是非常危险的，因为容易导致XSS攻击。所以只能在可信的内容上使用v-html，永远不要在用户提交和可操作的网页上使用。
:::

## v-on：绑定事件监听器
> v-on 就是监听事件，可以用v-on指令监听DOM事件来触发一些javascript代码。

一、使用绑定事件监听器，编写一个加分减分的程序。

程序代码:
``` js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script type="text/javascript" src="../assets/js/vue.js"></script>
    <title>v-on事件监听器</title>
</head>
<body>
    <h1>v-on 事件监听器</h1>
    <hr>
    <div id="app">
       本场比赛得分： {{count}}<br/>
       <button v-on:click="jiafen">加分</button>
       <button v-on:click="jianfen">减分</button>
 
    </div>
 
    <script type="text/javascript">
        var app=new Vue({
            el:'#app',
            data:{
                count:1
            },
            methods:{
                jiafen:function(){
                    this.count++;
                },
                jianfen:function(){
                    this.count--;
                }
            }
        })
    </script>
</body>
</html>
```
我们的v-on 还有一种简单的写法，就是用@代替。
``` js
<button @click="jianfen">减分</button>
```

## v-model指令
> v-model指令，我理解为绑定数据源。就是把数据绑定在特定的表单元素上，可以很容易的实现双向数据绑定。

**一、我们来看一个最简单的双向数据绑定代码：**

html文件
``` html
<div id="app">
    <p>原始文本信息：{{message}}</p>
    <h3>文本框</h3>
    <p>v-model:<input type="text" v-model="message"></p>
</div>
```
javascript代码：
``` js
var app=new Vue({
  el:'#app',
  data:{
       message:'hello Vue!'
  }
 })
 ```
**二、修饰符**

● .lazy：取代 imput 监听 change 事件。（当光标移出input框时，页面上才会出现对应内容）
● .number：输入字符串转为数字。
● .trim：输入去掉首尾空格。

**三、文本区域加入数据绑定**
``` html
<textarea cols="30" rows="10" v-model="message"></textarea>
```
**四、多选按钮绑定一个值**
``` html
<h3>多选按钮绑定一个值</h3>
<input type="checkbox" id="isTrue" v-model="isTrue">
<label for='isTrue'>{{isTrue}}</label>
```
**五、多选绑定一个数组**
``` html
<p>多选绑定一个数组</p>
<div>
    <input type="checkbox" id="name1" value="小明" v-model="web_name">
    <label for="name1">小明</label>
    <input type="checkbox" id="name2" value="小红" v-model="web_name">
    <label for="name2">小红</label>
    <input type="checkbox" id="name3" value="小方" v-model="web_name">
    <label for="name3">小方</label>
    <p>{{web_name}}</p>
</div>
```
**六、单选按钮绑定数据**
``` html
<p>单选按钮绑定数据</p>
<div>
    <input type="radio" id="one" value="男" v-model="sex">
    <label for="one">男</label>
    <input type="radio" id="two" value="女" v-model="sex">
    <label for="two">女</label>
    <p>{{sex}}</p>
</div>
```
::: warning 注意
多选绑定一个数组、单选按钮绑定数据**必须**在input标签中把value写上。
:::

## v-bind 指令
> v-bind是处理HTML中的标签属性的

html文件：
``` html
<div id="app">
    <img v-bind:src="imgSrc"  width="200px">
</div>
```
在html中我们用v-bind:src=”imgSrc”的动态绑定了src的值，这个值是在vue构造器里的data属性中找到的。

js文件：
``` js
var app = new Vue({
    el:'#app',
    data:{
          imgSrc:'http://baidu.com/wp-content/uploads/2017/02/vue01-2.jpg'
     }
})
```
我们在data对象在中增加了imgSrc属性来供html调用。

**v-bind 缩写**
``` js
<!-- 完整语法 -->
<a v-bind:href="url"></a>
<!-- 缩写 -->
<a :href="url"></a>
```
**绑定CSS样式**

1. 直接绑定class样式
``` html
<div :class="className">1、绑定classA</div>
```
2. 绑定classA并进行判断，在isOK为true时显示样式，在isOk为false时不显示样式。
``` html
<div :class="{classA:isOk}">2、绑定class中的判断</div>
```
3. 绑定class中的数组
``` html
<div :class="[classA,classB]">3、绑定class中的数组</div>
```
4. 绑定class中使用三元表达式判断
``` html
<div :class="isOk?classA:classB">4、绑定class中的三元表达式判断</div>
```
5. 绑定style
``` html
<div :style="{color:red,fontSize:font}">5、绑定style</div>
```
6. 用对象绑定style样式
``` js
<div :style="styleObject">6、用对象绑定style样式</div>
var app=new Vue({
   el:'#app',
   data:{
       styleObject:{
           fontSize:'24px',
           color:'green'
            }
        }
})
```

## 其他内部指令(v-pre & v-cloak & v-once)
**v-pre指令**

在模板中跳过vue的编译，直接输出原始值。就是在标签中加入v-pre就不会输出vue中的data值了。
``` html
<div v-pre>{{message}}</div>
```
这时网页上直接显示{{message}}

**v-cloak指令**

在vue渲染完指定的整个DOM后才进行显示。它必须和CSS样式一起使用，
``` js
[v-cloak] {
  display: none;
}
<div v-cloak>
  {{ message }}
</div>
```
**v-once指令**

在第一次DOM时进行渲染，渲染完成后视为静态内容，跳出以后的渲染过程。
``` html
<div v-once>第一次绑定的值：{{message}}</div>
<div><input type="text" v-model="message"></div>
```

## Vue.directive 自定义指令
**一、什么是全局API？**

全局API并不在构造器里，而是先声明全局变量或者直接在Vue上定义一些新功能，Vue内置了一些全局API，比如我们今天要学习的指令Vue.directive。说的简单些就是，在构造器外部用Vue提供给我们的API函数来定义新的功能。

**二、Vue.directive自定义指令**

比如我们要定义一个v-order的指令，作用就是让文字变成绿色。
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Vue.directive自定义指令</title>
    <script src="../common/js/vue.js"></script>
</head>
<body>
    <div id="app">
        <div v-order="color">{{num}}</div>
        <button @click="addNum">Add</button>
    </div>
    <script type="text/javascript">
        Vue.directive('order', function( el, binding) {
            console.log(el) // 标签元素，即<div style="color: red">10</div>
            console.log(binding) // 对象
            console.log(binding.name) // order
            console.log(binding.value) // red
            console.log(binding.expression) // color
            el.style = "color:" + binding.value;
        })

        var app = new Vue({
            el: "#app",
            data: {
                num: 10,
                color: "red"
            },
            methods: {
                addNum: function() {
                    this.num++;
                }
            }
        })
    </script>
</body>
</html>
```
**三、自定义指令中传递的三个参数**

● el: 指令所绑定的元素，可以用来直接操作DOM。
● binding: 一个对象，包含指令的很多信息。
● vnode: Vue编译生成的虚拟节点。

**四、自定义指令的生命周期**

自定义指令有五个生命周期（也叫钩子函数），分别是 bind,inserted,update,componentUpdated,unbind。

● bind:只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个绑定时执行一次的初始化动作。
● inserted:被绑定元素插入父节点时调用（父节点存在即可调用，不必存在于document中）。
● update:被绑定于元素所在的模板更新时调用，而无论绑定值是否变化。通过比较更新前后的绑定值，可以忽略不必要的模板更新。
● componentUpdated:被绑定元素所在模板完成一次更新周期时调用。
● unbind:只调用一次，指令与元素解绑时调用。
``` js
bind:function(){//被绑定
     console.log('1 - bind');
},
inserted:function(){//绑定到节点
      console.log('2 - inserted');
},
update:function(){//组件更新
      console.log('3 - update');
},
componentUpdated:function(){//组件更新完成
      console.log('4 - componentUpdated');
},
unbind:function(){//解绑
      console.log('5 - unbind');
}
```
具体用法如下：
``` js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="../common/js/vue.js"></script>
</head>
<body>
    <div id="app">
        <div v-order="color">{{num}}</div>
        <button @click="addNum">Add</button>
    </div>
    <p>
        <!-- 用原生来写 -->
        <button onclick="unbind()">解绑</button>
    </p>
    <script type="text/javascript">
        function unbind() {
            app.$destroy();
        }

        Vue.directive('order', {
            bind:function(el, binding){//被绑定
                console.log('1 - bind');
                el.style = "color:" + binding.value;
            },
            inserted:function(){//绑定到节点
                console.log('2 - inserted');
            },
            update:function(){//组件更新
                console.log('3 - update');
            },
            componentUpdated:function(){//组件更新完成
                console.log('4 - componentUpdated');
            },
            unbind:function(){//解绑
                console.log('5 - unbind');
            }
        })

        var app = new Vue({
            el: "#app",
            data: {
                num: 10,
                color: "red"
            },
            methods: {
                addNum: function() {
                    this.num++;
                }
            }
        })
    </script>
</body>
</html>
```

## Vue.extend构造器的延伸
**一、什么是Vue.extend**

Vue.extend 返回的是一个“扩展实例构造器”,也就是预设了部分选项的Vue实例构造器。经常服务于Vue.component用来生成组件，可以简单理解为当在模板中遇到该组件名称作为标签的自定义元素时，会自动调用“扩展实例构造器”来生产组件实例，并挂载到自定义元素上。

**二、自定义无参数标签**
具体代码如下：
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Vue.extend 构造器的延伸</title>
    <script src="../common/js/vue.js"></script>
</head>
<body>
    <div id="app"></div>
    <author></author>
    <script type="text/javascript">
        var authorUrl = Vue.extend({
            template: "<p><a :href='url'>点击跳转</a></p>",
            data: function() {
                return {
                    url: "https://www.baidu.com"
                }
            }
        })

        new authorUrl().$mount("#app"); // 推荐使用
        new authorUrl().$mount("author"); // 挂载到普通标签上
    </script>
</body>
</html>
```

## Vue.set全局操作
Vue.set 的作用就是在构造器外部操作构造器内部的数据、属性或者方法。

**一、引用构造器外部数据：**

什么是外部数据，就是不在Vue构造器里里的data处声明，而是在构造器外部声明，然后在data处引用就可以了。外部数据的加入让程序更加灵活，我们可以在外部获取任何想要的数据形式，然后让data引用。 看一个简单的代码：
``` js
//在构造器外部声明数据
 var outData={
    count:1,
    goodName:'car'
};
var app=new Vue({
    el:'#app',
    //引用外部数据
    data:outData
})
```
**二、在外部改变数据的三种方法：**

1、用Vue.set改变
``` js
function add(){
    Vue.set(outData,'count',4);
}
```
2、用Vue对象的方法添加
``` js
app.count++;
```
3、直接操作外部数据
``` js
outData.count++;
```
其实这三种方式都可以操作外部的数据，Vue也给我们增加了一种操作外部数据的方法。
**三、为什么要有Vue.set的存在?**

由于Javascript的限制，Vue不能自动检测以下变动的数组。

● 当你利用索引直接设置一个项时，vue不会为我们自动更新。
● 当你修改数组的长度时，vue不会为我们自动更新。

看一段代码：
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="../common/js/vue.js"></script>
    <title>Vue.set 全局操作</title>
</head>
<body>
    <div id="app">
        <div>{{count}}</div>
        <ul v-for="item in arr">
            <li>{{item}}</li>
        </ul>
        <button onclick="add()">新增</button>
    </div>
    <script type="text/javascript">
        var outData = {
            count: 1,
            arr: ['aaa', 'bbb', 'ccc']
        }
        function add() {
            // outData.count++;
            // app.count++;
            // Vue.set(outData, 'count', 4) // 直接赋值
            // app.arr[1]='ddd'; 不可行，
            Vue.set(app.arr, 1, 'ddd' )
        }
        var app = new Vue({
            el: '#app',
            data: outData
        })
    </script>
</body>
</html>
```

## Vue的生命周期（钩子函数）
Vue一共有10个生命周期函数，我们可以利用这些函数在vue的每个阶段都进行操作数据或者改变内容。 
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script type="text/javascript" src="../assets/js/vue.js"></script>
    <title>构造器的声明周期</title>
</head>
<body>
    <h1>构造器的声明周期</h1>
    <hr>
    <div id="app">
        {{message}}
        <p><button @click="jia">加分</button></p>
    </div>
        <button onclick="app.$destroy()">销毁</button>
 
    <script type="text/javascript">
        var app=new Vue({
            el:'#app',
            data:{
                message:1
            },
            methods:{
                jia:function(){
                    this.message ++;
                }
            },
            beforeCreate:function(){
                console.log('1-beforeCreate 初始化之前');
            },
            created:function(){
                console.log('2-created 创建完成');
            },
            beforeMount:function(){
                console.log('3-beforeMount 挂载之前');
            },
            mounted:function(){
                console.log('4-mounted 被创建');
            },
            beforeUpdate:function(){
                console.log('5-beforeUpdate 数据更新前');
            },
            updated:function(){
                console.log('6-updated 被更新后');
            },
            activated:function(){
                console.log('7-activated');
            },
            deactivated:function(){
                console.log('8-deactivated');
            },
            beforeDestroy:function(){
                console.log('9-beforeDestroy 销毁之前');
            },
            destroyed:function(){
                console.log('10-destroyed 销毁之后')
            }
 
        })
    </script>
</body>
</html>
```

## Template 制作模版
**一、直接写在选项里的模板**

直接在构造器里的template选项后边编写。这种写法比较直观，但是如果模板html代码太多，不建议这么写。

**二、写在template标签里的模板**

这种写法更像是在写HTML代码，就算不会写Vue的人，也可以制作页面。

**三、写在script标签里的模板**

这种写模板的方法，可以让模板文件从外部引入。

具体代码如下：
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="../common/js/vue.js" ></script>
    <title>Template</title>
</head>
<body>
    <div id="app">
        <!-- 第二种方法 -->
        <!-- <template id="two">
            <h4 style="color: red">写在template标签里的模板</h4>
        </template> -->
    </div>
    <!-- 第三种写法 -->
    <script type="x-template" id="three">
        <h4 style="color: red">我是script标签模板</h4>
    </script>
    <script type="text/javascript">
        var app = new Vue({
            el: "#app",
            data: {
                massage: "Hello World"
            },
            // template: "#two" // 第二种方法
            template: '#three' // 第三种写法
            // template: ` // 第一种方法，注意` 这个符号
            //     <h4 style="color: red">我是选项模板</h4>
            // `
        })
    </script>
</body>
</html>
```

## Component 初识组件
**一、全局化注册组件**

全局化就是在构造器的外部用Vue.component来注册。

**二、局部注册组件局部**

局部注册组件局部注册组件和全局注册组件是向对应的，局部注册的组件只能在组件注册的作用域里进行使用，其他作用域使用无效。

具体代码如下：
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="../common/js/vue.js" ></script>
    <title>Component 组件初识</title>
</head>
<body>
    <div id="app">
        <total></total>
        <panda></panda>
    </div>
    <script type="text/javascript">
        Vue.component('total', {
            template: `<div style="color:red">我是全局组件</div>`
        })
        var app = new Vue({
            el: "#app",
            data: {
                massage: "Hello World"
            },
            components: {
                "panda": {
                    template: `<div style="color:green">我是局部组件</div>`
                }
            }
        })
    </script>
</body>
</html>
```
## Component 组件props 属性设置
props选项就是设置和获取标签上的属性值的

**一、定义属性并获取属性值**

定义属性我们需要用props选项，加上数组形式的属性名称，例如：props:[‘here’]。在组件的模板里读出属性值只需要用插值的形式，列如：
``` html
<body>
    <div id="app">
        <panda here="China"></panda>
    </div>
    <script type="text/javascript">
        var app = new Vue({
            el: "#app",
            data: {
                massage: "Hello World"
            },
            components: {
                "panda": {
                    template: `<div style="color:green">Panda from {{here}}</div>`,
                    props: ["here"]
                }
            }
        })
    </script>
</body>
```
**二、属性中带'-'的处理方式**
我们在写属性时经常会加入’-‘来进行分词。如下代码中的from-here:
``` html
<body>
    <div id="app">
        <panda from-here="China"></panda>
    </div>
    <script type="text/javascript">
        var app = new Vue({
            el: "#app",
            data: {
                massage: "Hello World"
            },
            components: {
                "panda": {
                    template: `<div style="color:green">Panda from {{here}}</div>`,
                    props: ["fromHere"]
                }
            }
        })
    </script>
</body>
```
