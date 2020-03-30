# 常用组件
[toc]

看一下最基础的Hello Wold代码。
``` dart
import 'package:flutter/material.dart';

void main () => runApp(MyApp());

class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context ){
      return MaterialApp(
        title:'Text widget',
        home:Scaffold(
          body:Center(
            child:Text('Hello World')
          ),
        ),
      );
  }
}
```
这里我们已经使用了一个最简单的Text组件了，但是我们所有属性都是默认的的，下面我们就来多一点修饰这个Text组件。

## Text Widget文本组件的使用
**TextAlign属性**

TextAlign属性就是文本的对齐方式，它的属性值有如下几个：
``` sh
● center: 文本以居中形式对齐,这个也算比较常用的了。
● left:左对齐，经常使用，让文本居左进行对齐，效果和start一样。
● right :右对齐，使用频率也不算高。
● start:以开始位置进行对齐，类似于左对齐。
● end: 以为本结尾处进行对齐，不常用。有点类似右对齐.
```
总结起来，也就算三个对齐方式，left(左对齐)、center（居中对齐）、right（右对齐）。我们来看一下具体代码：
``` dart
child: Text(
  '开启flutter学习之旅，希望自己能多掌握一门技术，然后学以致用，为高薪加油！',
  textAlign: TextAlign.left,
)
```
**maxLines属性**

设置最多显示的行数，比如我们现在只显示1行，类似一个新闻列表的题目。代码如下：
``` dart
child:Text(
  '开启flutter学习之旅，希望自己能多掌握一门技术，然后学以致用，为高薪加油！',
  textAlign: TextAlign.left,
  maxLines: 1,
)
```
设置好后，文字只能显示出1行了。

**overflow属性**

overflow属性是用来设置文本溢出时，如何处理,它有下面几个常用的值供我们选择。
``` sh
● clip：直接切断，剩下的文字就没有了，感觉不太友好，体验性不好。
● ellipsis:在后边显示省略号，体验性较好，这个在工作中经常使用。
● fade: 溢出的部分会进行一个渐变消失的效果，当然是上线的渐变，不是左右的哦。
```
**style属性**

style属性的内容比较多，具体的你可以查一下API，我这里带作一个效果，方便大家快速学会Style的用法。

我们下面要作的效果为，字体大小为25.0,颜色为粉红色,并且有一个下划线。
``` dart
import 'package:flutter/material.dart';
void main () => runApp(MyApp());

class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context ){
      return MaterialApp(
        title: 'Text widget',
        home: Scaffold(
          body: Center(
            child: Text(
              '开启flutter学习之旅，希望自己能多掌握一门技术，然后学以致用，为高薪加油！',
              textAlign: TextAlign.left,
              overflow: TextOverflow.ellipsis,
              maxLines: 1,
              style: TextStyle(
                fontSize: 25.0, // 需要使用浮点数
                color: Color.fromARGB(255, 255, 150, 150),
                decoration: TextDecoration.underline,
                decorationStyle: TextDecorationStyle.solid,
              ),
            )
          ),
        ),
      );
  }
}
```
更详细的属性资料可以参看这个网址：https://docs.flutter.io/flutter/painting/TextStyle-class.html

## Container容器组件的使用1
> Container（容器控件）在Flutter是经常使用的控件，它就相当于我们HTML里的**div**标签，每个页面或者说每个视图都离不开它。

**Alignment属性**

其实容器的作用就是方便我们进行布局的，Flutter这点也作的很好，我们先来看容器属性中的Alignment。

这个属性针对的是Container内child的对齐方式，也就是容器子内容的对齐方式，并不是容器本身的对齐方式。

先作一个效果：建立一个容器，然后容器内加入一段文字Hello World, 并让它居中对齐。

具体代码如下：
``` dart
import "package:flutter/material.dart";
void main() => runApp(MyApp());

class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "text",
      home: Scaffold(
        body: Center(
          child: Container(
            child: new Text("Hello World", style: TextStyle(fontSize: 25.0)),
            alignment: Alignment.center,
          )
        )
      )
    );
  }
}
```

这时候可以看见，我们的文本已经居中显示在手机屏幕上了。当然它的对齐方式还有如下几种：(第一个单词代表纵向，第二个单词代表横向)
``` sh
● bottomCenter:下部居中对齐。
● botomLeft: 下部左对齐。
● bottomRight：下部右对齐。
● center：纵横双向居中对齐。
● centerLeft：纵向居中横向居左对齐。
● centerRight：纵向居中横向居右对齐。
● topLeft：顶部左侧对齐。
● topCenter：顶部居中对齐。
● topRight： 顶部居左对齐。
```

**设置宽、高和颜色属性**

设置宽、高和颜色属性是相对容易的，只要在属性名称后面加入浮点型数字就可以了，比如要设置宽是500，高是400，颜色为亮蓝色。代码如下：
``` dart
child: Container(
  child: new Text('Hello Ming',style: TextStyle(fontSize: 40.0),),
  alignment: Alignment.center,
  width: 500.0,
  height: 400.0,
  color: Colors.lightBlue,
),
```
## Container容器组件的使用2
**padding属性**

padding的属性就是一个内边距，它和你使用的前端技术CSS里的padding表现形式一样，指的是Container边缘和child内容的距离。先来看一个内边距为10的例子。具体代码如下：
``` dart
child: Container(
  child: new Text('Hello Ming',style: TextStyle(fontSize: 40.0),),
  alignment: Alignment.topLeft,
  width: 500.0,
  height: 400.0,
  color: Colors.lightBlue,
  padding: const EdgeInsets.all(10.0),
),
```
上面主要的padding代码就一句。
``` dart
padding: const EdgeInsets.all(10.0),
```
这句的意思是设置Container的内边距是10，左右上下全部为10，这看起来非常容易。那我们再加大一点难度。如果上边距为30，左边距为10，这时候EdgeInsets.all()就满足不了我们了。

**EdgeInsets.fromLTRB(value1,value2,value3,value4)**

我们用EdgeInsets.fromLTRB(value1,value2,value3,value4) 可以满足我们的需求，LTRB分别代表左、上、右、下。

那我们设置上边距为30，左边距为10，就可以用下面的代码来编写。
``` dart
padding: const EdgeInsets.fromLTRB(10.0,30.0,0.0,0.0),
```

**margin属性**

会了padding属性的设置，margin就变的非常容易了，因为方法基本上一样。不过margin是外边距，只的是container和外部元素的距离。

现在要把container的外边距设置为10个单位，代码如下:
``` dart
child: Container(
  child: new Text('Hello Ming',style: TextStyle(fontSize: 40.0),),
  alignment: Alignment.topLeft,
  width: 500.0,
  height: 400.0,
  color: Colors.lightBlue,
  padding: const EdgeInsets.fromLTRB(10.0,30.0,0.0,0.0),
  margin: const EdgeInsets.all(10.0),
),
```
当然你也可以分别设置不同的外边距，方法也是使用fromLTRB。

**decoration属性**

decoration是 container 的修饰器，主要的功能是设置背景和边框。

比如你需要给背景加入一个渐变，这时候需要使用BoxDecoration这个类，代码如下（需要注意的是如果你设置了decoration，就不要再设置color属性了，因为这样会冲突）。
``` dart
child: Container(
  child: new Text('Hello JSPang',style: TextStyle(fontSize: 40.0),),
  alignment: Alignment.topLeft,
  width: 500.0,
  height: 400.0,
  padding: const EdgeInsets.fromLTRB(10.0,30.0,0.0,0.0),
  margin: const EdgeInsets.all(10.0),
  decoration: new BoxDecoration(
    gradient: const LinearGradient(
      colors:[Colors.lightBlue,Colors.greenAccent,Colors.purple]
    )
  ),
),
```
上面的代码去掉了color的设置，这时候container的背景就变成了渐变颜色，如下图。

**设置边框**

设置边框可以在decoration里设置border属性，比如你现在要设置一个红色边框，宽度为2。代码如下：
``` dart
child: Container(
  child: new Text('Hello World',style: TextStyle(fontSize: 40.0),),
  alignment: Alignment.topLeft,
  width: 500.0,
  height: 400.0,
  padding: const EdgeInsets.fromLTRB(10.0,30.0,0.0,0.0),
  margin: const EdgeInsets.all(10.0),
  decoration: new BoxDecoration(
    gradient: const LinearGradient(
      colors:[Colors.lightBlue,Colors.greenAccent,Colors.purple]
    ),
    border: Border.all(width:2.0,color:Colors.red)
    // border: Border(bottom:BorderSide(width: 1,color: Color(0xffe5e5e5)) ) 底部边框颜色、大小
    // borderRadius: BorderRadius.circular(5), 所有圆角大小
    //  borderRadius: new BorderRadius.vertical(top: Radius.elliptical(20, 50)), 可控件一边圆角大小
),
```
关键代码其实就是：
``` dart
border: Border.all(width:2.0, color:Colors.red)
```
完整代码如下：
``` dart
import 'package:flutter/material.dart';
void main () => runApp(MyApp());

class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context ){
      return MaterialApp(
        title: 'Text widget',
        home: Scaffold(
          body: Center(
          child: Container(
            child: new Text('Hello World',style: TextStyle(fontSize: 40.0),),
            alignment: Alignment.topLeft,
            width:500.0,
            height:400.0,
            padding:const EdgeInsets.fromLTRB(10.0,30.0,0.0,0.0),
            margin: const EdgeInsets.all(10.0),
            decoration:new BoxDecoration(
              gradient:const LinearGradient(
                colors:[Colors.lightBlue,Colors.greenAccent,Colors.purple]
              ),
              border:Border.all(width:2.0,color:Colors.red)
            ),
          ),
          ),
        ),
      );
  }
}
```
## Image图片组件的使用
**加入图片的几种方式**
``` sh
● Image.network:网络资源图片，意思就是你需要加入一段http://xxxx.xxx的这样的网络路径地址。
● Image.asset:加载资源图片，就是加载项目资源目录中的图片,加入图片后会增大打包的包体体积，用的是相对路径。
● Image.file:加载本地图片，就是加载本地文件中的图片，这个是一个绝对路径，跟包体无关。
● Image.memory: 加载Uint8List资源图片,这个我目前用的不是很多，所以没什么发言权。
```
我们现在就以加入网络图片为例子，在Container里加入一张图片，代码如下：
``` dart
import 'package:flutter/material.dart';
void main () => runApp(MyApp());

class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context ){
    return MaterialApp(
      title:'Text widget',
      home: Scaffold(
        body: Center(
          child: Container(
            child: new Image.network(
              'http://jspang.com/static/myimg/blogtouxiang.jpg',
              scale:1.0,
            ),
            width:300.0,
            height:200.0,
            color: Colors.lightBlue,
          ),
        ),
      ),
    );
  }
}
```
这时候就可以看到图片被加入进来了，当然我们还顺便设置了容器的宽和高。

**fit属性的设置**

fit属性可以控制图片的拉伸和挤压，这些都是根据图片的父级容器来的，我们先来看看这些属性。
``` sh
● BoxFit.fill:全图显示，图片会被拉伸，并充满父容器。
● BoxFit.contain:全图显示，显示原比例，可能会有空隙。
● BoxFit.cover：显示可能拉伸，可能裁切，充满（图片要充满整个容器，还不变形）。
● BoxFit.fitWidth：宽度充满（横向充满），显示可能拉伸，可能裁切。
● BoxFit.fitHeight ：高度充满（竖向充满）,显示可能拉伸，可能裁切。
● BoxFit.scaleDown：效果和contain差不多，但是此属性不允许显示超过源图片大小，可小不可大。
```
建议抽时间练习，查看各种效果。

**图片的混合模式**

图片混合模式（colorBlendMode）和color属性配合使用，能让图片改变颜色，里边的模式非常的多，产生的效果也是非常丰富的。在这里作几个简单的例子，让大家看一下效果，剩下的留给小伙伴自己探索。
``` dart
child: new Image.network(
  'http://jspang.com/static/myimg/blogtouxiang.jpg',
  color: Colors.greenAccent,
  colorBlendMode: BlendMode.darken,
),
```
``` sh
● color：是要混合的颜色，如果你只设置color是没有意义的。
● colorBlendMode:是混合模式，相当于我们如何混合。
```

**repeat图片重复**
``` sh
● ImageRepeat.repeat : 横向和纵向都进行重复，直到铺满整个画布。
● ImageRepeat.repeatX: 横向重复，纵向不重复。
● ImageRepeat.repeatY：纵向重复，横向不重复。
```

来个全部重复的代码。
``` dart
child: new Image.network(
  'http://jspang.com/static/myimg/blogtouxiang.jpg',
  repeat: ImageRepeat.repeat,
),
```
## ListView列表组件简介
先重温一下基本结构，如下：
``` dart
import 'package:flutter/material.dart';
void main() => runApp(MyApp());
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: "flutter demo",
      home: Scaffold(
        appBar: new AppBar(
          title: new Text("ViewList")
        ),
        body: new Text("viewlist")
      )
    )
  }
}
```
有了最基本的结构后，就可以加入ListView组件，在body代码处加入下面的代码：
``` dart
body: new ListView(
  children: <Widget>[
    new ListTile(
      leading: new Icon(Icons.access_time),
      title: new Text('access_time')
    )
  ]
),
```
我们使用了ListView，然后在他的内部children中，使用了widget数组，因为是一个列表，所以它接受一个数组，然后有使用了listTite组件（列表瓦片），在组件中放置了图标和文字。

当然我们还可以多加入几行列表，比如我们再加入一行，代码如下。
``` dart
body: new ListView(
  children: <Widget>[
    new ListTile(
      leading: new Icon(Icons.access_time),
      title: new Text('access_time')
    ),
    new ListTile(
      leading: new Icon(Icons.account_balance),
      title: new Text('account_balance')
    ),
  ]
),
```
这时候已经有两行列表了（具体效果视频中查看）。

### 图片列表的使用
前面我们学些了Image Widget，在这里我们就在列表中加入图片来试一下。我们插入4幅图片，然后看一下效果，代码如下：
``` dart
body: new ListView(
  children: <Widget>[
   new Image.network(
      'http://jspang.com/static/upload/20181111/G-wj-ZQuocWlYOHM6MT2Hbh5.jpg'
    ),
     new Image.network(
      'http://jspang.com/static/upload/20181109/1bHNoNGpZjyriCNcvqdKo3s6.jpg'
    ),
     new Image.network(
      'http://jspang.com/static/myimg/typescript_banner.jpg'
    ),new Image.network(
      'http://jspang.com/static/myimg/smile-vue.jpg'
    )
  ]
),
```
我们使用了网络的方式，插入了4张图片，并且这4张图片形成了一个列表。

## 横向列表的使用
已经对ListView有了清楚的认识，也做出了普通的纵向（竖向列表）。这节课我们看看横向列表如何使用。其实还是使用我们的ListView组件，只是在ListView组件里加一个ScrollDirection属性。

### 制作横向列表
这个我们先来看效果，然后再具体讲解使用方法:
``` dart
import 'package:flutter/material.dart';
void main () => runApp(MyApp());

class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context ){
    return MaterialApp(
      title:'Text widget',
      home: Scaffold(
        body: Center(
        child: Container(
          height:200.0,
          child: new ListView(
            scrollDirection: Axis.horizontal,
            children: <Widget>[
              new Container(
                width:180.0,
                color: Colors.lightBlue,
              ), new Container(
                width:180.0,
                color: Colors.amber,
              ), new Container(
                width:180.0,
                color: Colors.deepOrange,
              ),new Container(
                width:180.0,
                color: Colors.deepPurpleAccent,
              ),
            ],
          )
        ),
        ),
      ),
    );
  }
}
```
我们先是加入了Center组件，作用是让我们的横向列表可以居中到屏幕的中间位置，然后在center组件的下面加入了Container容器组件，并设置了容器组件的高是200，在容器组件里我们加入了ListView组件，然后设置了组件的scrollDirection属性。然后再ListView的子组件里加入了Container容器组件，然后设置了不同颜色。

### scrollDirection属性
ListView组件的scrollDirection属性只有两个值，一个是横向滚动，一个是纵向滚动。默认的就是垂直滚动，所以如果是垂直滚动，我们一般都不进行设置。
``` sh
Axis.horizontal:横向滚动或者叫水平方向滚动。 
Axis.vertical:纵向滚动或者叫垂直方向滚动。 
```
### 优化代码简介
现在把列表组件独立定义成一个类，然后我们再加入到主组件中。再工作中会把组件分的很细，这样既能很好的复用有便于维护，还有利于分工，我个人是非常喜欢Flutter这种万物皆组件的形式的。

我们声明一个MyList的类，然后把嵌套的代码放到这个类里,代码如下。
``` dart
class MyList extends StatelessWidget{
  @override
  Widget build(BuildContext context){
    return ListView(
        scrollDirection: Axis.horizontal,
        children: <Widget>[
          new Container(
            width:180.0,
            color: Colors.lightBlue,
          ), new Container(
            width:180.0,
            color: Colors.amber,
          ), new Container(
            width:180.0,
            color: Colors.deepOrange,
          ),new Container(
            width:180.0,
            color: Colors.deepPurpleAccent,
          ),
        ],
    );
  }
}
```
然后再MyAPP类里直接使用这个类，这样就减少了嵌套。全部代码如下，详细的讲解看视频吧。
``` dart
import 'package:flutter/material.dart';
void main () => runApp(MyApp());

class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context ){
    return MaterialApp(
      title: 'ListView widget',
      home: Scaffold(
        body: Center(
        child: Container(
          height: 200.0,
          child: MyList()
          ),
        ),
      ),
    );
  }
}
```
``` dart
class MyList extends StatelessWidget{
  @override
  Widget build(BuildContext context){
    return ListView(
      scrollDirection: Axis.horizontal,
      children: <Widget>[
        new Container(
          width:180.0,
          color: Colors.lightBlue,
        ), new Container(
          width:180.0,
          color: Colors.amber,
        ), new Container(
          width:180.0,
          color: Colors.deepOrange,
        ),new Container(
          width:180.0,
          color: Colors.deepPurpleAccent,
        ),
      ],
    );
  }
}
```

## 动态列表的使用
我们常用的是动态列表，比如我们的数据从后台读取过来，然后存入一个变量数组里，然后以数组的内容循环出一个列表。

### List的使用
List是Dart的集合类型之一,其实你可以把它简单理解为数组（反正我是这么认为的），其他语言也都有这个类型。它的声明有几种方式：
``` js
var myList = List(): 非固定长度的声明。
var myList = List(2): 固定长度的声明。
var myList= List<String>():固定类型的声明方式。
var myList = [1,2,3]: 对List直接赋值。
```
那我们这里使用的是一个List传递，然后直接用List中的generate方法进行生产List里的元素。最后的结果是生产了一个带值的List变量。代码如下：
``` dart
void main () => runApp(MyApp(
  items: new List<String>.generate(1000, (i)=> "Item $i")
));
```
说明:再main函数的runApp中调用了MyApp类，再使用类的使用传递了一个items参数,并使用generate生成器对items进行赋值。

generate方法传递两个参数，第一个参数是生成的个数，第二个是方法。

### 接收参数
我们已经传递了参数，那MyApp这个类是需要接收的。
``` dart
final List<String> items;
  MyApp({Key key, @required this.items}):super(key:key);
```
这是一个构造函数，除了Key，我们增加了一个必传参数，这里的@required意思就必传。:super如果父类没有无名无参数的默认构造函数，则子类必须手动调用一个父类构造函数。

这样我们就可以接收一个传递过来的参数了，当然我们要事先进行声明。
### 动态列表 ListView.builder()
接受了值之后，就可以直接调用动态列表进行生成了。具体代码如下：
``` dart
import 'package:flutter/material.dart';
void main () => runApp(MyApp(
  items: new List<String>.generate(1000, (i)=> "Item $i")
));

class MyApp extends StatelessWidget{
  final List<String> items;
  MyApp({Key key, @required this.items}):super(key:key);

  @override
  Widget build(BuildContext context ){
    return MaterialApp(
      title:'ListView widget',
      home:Scaffold(
        body:new ListView.builder(
          itemCount:items.length,
          itemBuilder:(context,index){
            return new ListTile(
              title:new Text('${items[index]}'),
            );
          }
        )
      ),
    );
  }
}
```
现在我们可以启动虚拟机来查看，我们的列表的效果了。这个就是工作中我们常使用的列表的方式，当然我们也可以重新做一个列表类，把组件作的美美的。
## GridView网格列表组件
### 简单例子演示
我们先不做一个相册的应用，而是使用文字，作一个最简单的网格列表，目的是先熟悉一下GridView的基本语法，代码如下，视频中会进行详细讲解：
``` dart
import 'package:flutter/material.dart';
void main () => runApp(MyApp());

class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context ){
      return MaterialApp(
        title:'ListView widget',
        home: Scaffold(
          body: GridView.count(
            padding: const EdgeInsets.all(20.0),
            crossAxisSpacing: 10.0,
            crossAxisCount: 3,
            children: <Widget>[
              const Text('I am ming'),
              const Text('I love Web'),
              const Text('baidu.com'),
              const Text('我喜欢玩游戏'),
              const Text('我喜欢看书'),
              const Text('我喜欢吃火锅')
            ],
          )
        ),
      );
  }
}
```
我们在body属性中加入了网格组件，然后给了一些常用属性:
``` sh
padding:表示内边距，这个小伙伴们应该很熟悉。 
crossAxisSpacing:网格间的空当，相当于每个网格之间的间距。 
crossAxisCount:网格的列数，相当于一行放置的网格数量。 
```
图片网格列表
加入文字作网格列表总是怪怪的，也不是很直观，我们利用图片来作一些网格列表。当然我们用一种更原生的方法，现在官方已经不鼓励使用这种方法了，但是为了你碰到时，不至于不知道怎么回事，所以我们作一下这种形式，但主要是为了作图片布局。

代码如下：
``` dart
import 'package:flutter/material.dart';
void main () => runApp(MyApp());

class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context ){
      return MaterialApp(
        title:'ListView widget',
        home:Scaffold(
          body:GridView(
            gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 3,
              mainAxisSpacing: 2.0,
              crossAxisSpacing: 2.0,
              childAspectRatio: 0.7
            ),
            children: <Widget>[
             new Image.network('http://img5.mtime.cn/mt/2018/10/22/104316.77318635_180X260X4.jpg',fit: BoxFit.cover),
             new Image.network('http://img5.mtime.cn/mt/2018/10/10/112514.30587089_180X260X4.jpg',fit: BoxFit.cover),
             new Image.network('http://img5.mtime.cn/mt/2018/11/13/093605.61422332_180X260X4.jpg',fit: BoxFit.cover),
             new Image.network('http://img5.mtime.cn/mt/2018/11/07/092515.55805319_180X260X4.jpg',fit: BoxFit.cover),
             new Image.network('http://img5.mtime.cn/mt/2018/11/21/090246.16772408_135X190X4.jpg',fit: BoxFit.cover),
             new Image.network('http://img5.mtime.cn/mt/2018/11/17/162028.94879602_135X190X4.jpg',fit: BoxFit.cover),
             new Image.network('http://img5.mtime.cn/mt/2018/11/19/165350.52237320_135X190X4.jpg',fit: BoxFit.cover),
             new Image.network('http://img5.mtime.cn/mt/2018/11/16/115256.24365160_180X260X4.jpg',fit: BoxFit.cover),
             new Image.network('http://img5.mtime.cn/mt/2018/11/20/141608.71613590_135X190X4.jpg',fit: BoxFit.cover),

            ],
          )
        ),
      );
  }
}
```
childAspectRatio:宽高比，这个值的意思是宽是高的多少倍，如果宽是高的2倍，那我们就写2.0，如果高是宽的2倍，我们就写0.5。希望小伙伴们理解一下。