# 承接Vue 2.x

## propsData Option 全局扩展的数据传递
> propsData 不是和属性有关，他用在全局扩展时进行传递数据。

propsData三步解决传值： 1.在全局扩展里加入props进行接收。propsData:{count:12} 2.传递时用propsData进行传递。props:[] 3.用插值的形式写入模板。 完整代码：
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="../common/js/vue.js"></script>
    <title>propsData</title>
</head>
<body>
    <div id="app"></div>
    <header></header>
    <script type="text/javascript">
        var header_a = Vue.extend({
            template: `<p>{{message}}---{{count}}</p>`,
            data: function() {
                return {
                    message: 'Hello World'
                }
            },
            props: ['count']
        })

        new header_a({propsData: {count: 12}}).$mount('header');
    </script>
</body>
</html>
```

## Methods Option 方法选项
**一、methods中参数的传递**

使用方法和正常的javascript传递参数的方法一样，分为两部：

● 在methods的方法中进行声明，比如我们给add方法加上一个num参数，就要写出add:function(num){}.
● 调用方法时直接传递，比如我们要传递2这个参数，我们在button上就直接可以写。@click=”add(2)”.

**二、methods中的$event参数**

传递的$event参数都是关于你点击鼠标的一些事件和属性。我们先看看传递的方法。

传递：
``` html
<button @click=”add(2,$event)”>add</button>
```

## Watch 选项 监控数据
> 监控数据变化
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="../common/js/vue.js"></script>
    <title>watch</title>
</head>
<body>
    <div id="app">
        <p>当前温度：{{wendu}}摄氏度</p>
        <p>适合穿衣：{{chuanyi}}</p>
        <p><button @click="shenggao">升高温度</button><button @click="jiangdi">降低温度</button></p>
    </div>
    <script type="text/javascript">
        var app = new Vue({
            el: '#app',
            data: {
                wendu: 14,
                chuanyi: 'T恤衬衣'
            },
            methods: {
                shenggao: function() {
                    this.wendu+=5;
                },
                jiangdi: function() {
                    this.wendu-=5;
                }
            },
            // watch: { // 第一种写法
            //     wendu: function(newVal, oldVal) {
            //         if (newVal >= 26) {
            //             this.chuanyi = 'T恤衬衣';
            //         } else if ( newVal < 26 && newVal >=0) {
            //             this.chuanyi = '皮夹';
            //         } else {
            //             this.chuanyi = '羽绒服';
            //         }
            //     }
            // }
        })
        // 第二种写法
        app.$watch('wendu', function(newVal, oldVal) {
            if (newVal >= 26) {
                this.chuanyi = 'T恤衬衣';
            } else if ( newVal < 26 && newVal >=0) {
                this.chuanyi = '皮夹';
            } else {
                this.chuanyi = '羽绒服';
            }
        })
    </script>
</body>
</html>
```

## Mixins 混入选项操作
Mixins一般有两种用途：

1. 在你已经写好了构造器后，需要增加方法或者临时的活动时使用的方法，这时用混入会减少源代码的污染。
2. 很多地方都会用到的公用方法，用混入的方法可以减少代码量，实现代码重用。

**一、Mixins的基本用法**

我们现在有个数字点击递增的程序，假设已经完成了，这时我们希望每次数据变化时都能够在控制台打印出提示：“数据发生变化”.

代码实现过程:
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script type="text/javascript" src="../assets/js/vue.js"></script>
    <title>Mixins Option Demo</title>
</head>
<body>
    <h1>Mixins Option Demo</h1>
    <hr>
    <div id="app">
        <p>num:{{ num }}</p>
        <P><button @click="add">增加数量</button></P>
    </div>
 
    <script type="text/javascript">
        //额外临时加入时，用于显示日志
        var addLog={
            updated:function(){
                console.log("数据放生变化,变化成"+this.num+".");
            }
        }
        var app=new Vue({
            el:'#app',
            data:{
                num:1
            },
            methods:{
                add:function(){
                    this.num++;
                }
            },
            mixins:[addLog]//混入
        })
    </script>
</body>
</html>
```
**二、mixins的调用顺序**

从执行的先后顺序来说，都是混入的先执行，然后构造器里的再执行，需要注意的是，这并不是方法的覆盖，而是被执行了两遍。

在上边的代码的构造器里我们也加入了updated的钩子函数：
``` js
updated:function(){
    console.log("构造器里的updated方法。")
},
```
这时控制台输出的顺序是：
``` sh
mixins数据放生变化,变化成2.
构造器里的updated方法。
```
PS：当混入方法和构造器的方法重名时，混入的方法无法展现，也就是不起作用。

**三、全局API混入方式**

我们也可以定义全局的混入，这样在需要这段代码的地方直接引入js，就可以拥有这个功能了。我们来看一下全局混入的方法：
``` js
Vue.mixin({
    updated:function(){
        console.log('我是全局被混入的');
    }
})
```
PS：全局混入的执行顺序要前于混入和构造器里的方法。

##　Extends Option 扩展选项
通过外部增加对象的形式，对构造器进行扩展。

**一、extends我们来看一个扩展的实例。**
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script type="text/javascript" src="../assets/js/vue.js"></script>
    <title>Extends Optin Demo</title>
</head>
<body>
    <h1>Extends Optin Demo</h1>
    <hr>
    <div id="app">
        {{message}}
        <p><button @click="add">add</button></p>
    </div>
 
    <script type="text/javascript">
        var bbb={
            updated:function(){
                console.log("我是被扩展出来的");
            },
            methods:{ // 这个方法是不会执行的
                add:function(){
                    console.log('我是被扩展出来的方法！');
                }
            }
        };
        var app=new Vue({
            el:'#app',
            data:{
                message:'hello Vue!'
            },
            methods:{
                add:function(){
                    console.log('我是原生方法');
                }
            },
            extends:bbb
            // delimiters: ['${','}']
        })
    </script>
</body>
</html>
```
**二、delimiters 选项**

因为这节课内容比较少，所以我们把要讲的最后一个选项一起讲了。delimiters的作用是改变我们插值的符号。Vue默认的插值是双大括号{{}}。但有时我们会有需求更改这个插值的形式。
``` js
delimiters:['${','}']
```
现在我们的插值形式就变成了${}。

## Vue实例方法
**一、$mount方法**

$mount方法是用来挂载我们的扩展的，我们先来复习一下扩展的写法。

这里我们作了jspang的扩展，然后用$mount的方法把jspang挂载到DOM上，我们也生成了一个Vue的实例，直接看代码。
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script type="text/javascript" src="../assets/js/vue.js"></script>
    <title>Examples Method Demo</title>
</head>
<body>
    <h1>Examples Method Demo</h1>
    <hr>
    <div id="app">
        {{message}}
    </div>
    
    <script type="text/javascript">
      var jspang = Vue.extend({
          template:`<p>{{message}}</p>`,
          data:function(){
              return {
                  message:'Hello ,I am JSPang'
              }
          }
      })
      var vm = new jspang().$mount("#app")
    </script>
</body>
</html>
```
这段代码我们在学习extends的时候已经写过一次，这里就不作过多解释了。

**二、$destroy() 卸载方法**

用$destroy()进行卸载。

我写了一个button按钮，点击后卸载整个挂载。

html：
``` html
<p><button onclick="destroy()">卸载</button></p>
```
javascript
``` js
function destroy(){
   vm.$destroy();
}
```
PS:$destroy()后边必须要有括号，没有括号是无用的。

**三、$forceUpdate() 更新方法**
``` js
vm.$forceUpdate()
```
**四、$nextTick() 数据修改方法**

当Vue构造器里的data值被修改完成后会调用这个方法，也相当于一个钩子函数吧，和构造器里的updated生命周期很像。
``` js
function tick(){
    vm.message="update message info ";
    vm.$nextTick(function(){
        console.log('message更新完后我被调用了');
    })
}
```
完整代码如下：
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="../common/js/vue.js"></script>
    <title>M实例方法</title>
</head>
<body>
    <div id="app">
        <!-- 当下的内容不会显示在页面上 -->
        不会显示的内容
    </div>
    <button onclick="destroy()">销毁</button>
    <button onclick="forceUpdate()">刷新</button>
    <button onclick="updated()">更新</button>
    <script type="text/javascript">
        var appDemo = Vue.extend({
            template: '<div>{{message}}</div>',
            data: function() {
                return {
                    message: 'Hello World'
                }
            },
            destroyed: function() {
                console.log('已经销毁')
            },
            updated: function() {
                console.log('刷新完成')
            }
        })
        var vm = new appDemo().$mount('#app');
        function destroy() {
            vm.$destroy();
        }
        function forceUpdate() {
            vm.$forceUpdate();
        }
        function updated() {
            vm.message = "更新后的内容"
            vm.$nextTick(function() {
                console.log('已经更新完成')
            })
        }
    </script>
</body>
</html>
```

## Vue实例事件
实例事件就是在构造器外部写一个调用构造器内部的方法。这样写的好处是可以通过这种写法在构造器外部调用构造器内部的数据。 

**一、$on 在构造器外部添加事件。**
``` js
app.$on('reduce',function(){
    console.log('执行了reduce()');
    this.num--;
});
```
$on接收两个参数，第一个参数是调用时的事件名称，第二个参数是一个匿名方法。

如果按钮在作用域外部，可以利用$emit来执行。
``` js
//外部调用内部事件
function reduce(){
    app.$emit('reduce');
}
```
**二、$once执行一次的事件**
``` js
app.$once('reduceOnce',function(){
    console.log('只执行一次的方法');
    this.num--;
 
});
```
**三、$off关闭事件**
``` js
//关闭事件
function off(){
   app.$off('reduce');
}
```
完整代码如下：
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="../common/js/vue.js"></script>
    <title>实例事件</title>
</head>
<body>
    <div id="app">
        <p>{{count}}</p>
        <p><button @click="add">增加</button></p>
    </div>
    <p><button onclick="reduce()">减少</button></p>
    <p><button onclick="reduceonce()">减少一次</button></p>
    <p><button onclick="off()">关闭</button></p>
    <script type="text/javascript">
        var app = new Vue({
            el: '#app',
            data: {
                count: 1
            },
            methods: {
                add: function() {
                    this.count++;
                }
            }
        })
        app.$on('reduce', function() {
            this.count--;
        })
        app.$once('reduceonce', function() {
            this.count--;
        })
        function reduce() {
            app.$emit('reduce');
        }
        function reduceonce() {
            app.$emit('reduceonce');
        }
        function off() {
            app.$off('reduce');
        }
    </script>
</body>
</html>
```

## 内置组件 -slot讲解
slot是标签的内容扩展，也就是说你用slot就可以在自定义组件时传递给组件内容，组件接收内容并输出。 

我们在Vue 构造器里的data中给出了信息，信息如下：
``` js
data: {
    message:{
        name: '小明',
        course: '数学',
        mark: 90
    }
},
```
我们用<template></template>标签的方式定义了组件：
``` html
<template id="tmp">
    <div>
        <p>姓名：</p>
        <p>科目：</p>
        <p>分数：</p>
    </div>
</template>
```
我们现在就可以用slot功能让组件接收传递过来的值，并在模板中接收显示。

slot的使用需要两步： 1、在HTML的组件中用slot属性传递值。
``` html
<messinfo>
    <span slot="name">{{message.name}}</span>
    <span slot="course">{{message.course}}</span>
    <span slot="mark">{{message.mark}}</span>
</messinfo>
```
2、在组件模板中用标签接收值。
``` html
<template id="tmp">
    <div>
        <p>姓名：<slot name="name"></slot></p>
        <p>科目：<slot name="course"></slot></p>
        <p>分数：<slot name="mark"></slot></p>
    </div>
</template>
```
我们贴出这个案例的全部代码：
``` html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="../common/js/vue.js"></script>
    <title>实例事件</title>
</head>
<body>
    <div id="app">
        <messinfo>
            <span slot="name">{{message.name}}</span>
            <span slot="course">{{message.course}}</span>
            <span slot="mark">{{message.mark}}</span>
        </messinfo>
    </div>
    <template id="tmp">
        <div>
            <p>姓名：<slot name="name"></slot></p>
            <p>科目：<slot name="course"></slot></p>
            <p>分数：<slot name="mark"></slot></p>
        </div>
    </template>
    <script type="text/javascript">
        var messinfo = {
            template: '#tmp'
        }
        var app = new Vue({
            el:'#app',
            data: {
                message:{
                    name: '小明',
                    course: '数学',
                    mark: 90
                }
            },
            components: {
                'messinfo': messinfo
            }
        })
    </script>
</body>
</html>
```