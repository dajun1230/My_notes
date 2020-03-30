# 布局

## 水平布局Row的使用
Flutter中的row控件就是水平控件，它可以让Row里边的子元素进行水平排列。

Row控件可以分为灵活排列和非灵活排列两种，这两种模式都需要熟练掌握，等经验丰富后可根据需求进行使用。
### 不灵活水平布局
从字面上就可以理解到，不灵活就是根据Row子元素的大小，进行布局。如果子元素不足，它会留有空隙，如果子元素超出，它会警告。

比如现在我们要制作三个按钮，并让三个按钮同时在一排。我们写下了如下代码，但你会发现效果并不理想。

``` dart
import 'package:flutter/material.dart';
void main () => runApp(MyApp());

class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context ){
    return MaterialApp(
      title:'ListView widget',
      home: Scaffold(
        appBar: new AppBar(
          title: new Text('水平方向布局'),
        ),
        body: new Row(
          children: <Widget>[
            new RaisedButton(
              onPressed: (){},
              color: Colors.redAccent,
              child: new Text('红色按钮')
            ),
            new RaisedButton(
              onPressed: (){},
              color: Colors.orangeAccent,
              child: new Text('黄色按钮'),
            ),  
            new RaisedButton(
              onPressed: (){,
              color: Colors.pinkAccent,
              child: new Text('粉色按钮')
            )
          ],
        )
      ),
    );
  }
}
```
这时候你会发现的页面已经有了三个按钮，但这三个按钮并没有充满一行，而是出现了空隙。这就是不灵活横向排列造成的。它根据子元素的大小来进行排列。如果我们想实现充满一行的效果，就要使用灵活水平布局了。
### 灵活水平布局
解决上面有空隙的问题，可以使用 Expanded来进行解决，也就是我们说的灵活布局。我们在按钮的外边加入Expanded就可以了，代码如下：
``` dart
import 'package:flutter/material.dart';
void main () => runApp(MyApp());

class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context ){
    return MaterialApp(
      title:'ListView widget',
      home: Scaffold(
        appBar: new AppBar(
          title: new Text('水平方向布局'),
        ),
        body: new Row(
          children: <Widget>[
            new RaisedButton(
              onPressed: (){},
              color: Colors.redAccent,
              child: new Text('红色按钮')
            ),
            Expanded(
              child: new RaisedButton(
                onPressed: (){},
                color: Colors.orangeAccent,
                child: new Text('黄色按钮'),
              ),
            ),
            new RaisedButton(
              onPressed: (){,
              color: Colors.pinkAccent,
              child: new Text('粉色按钮')
            )
          ],
        )
      ),
    );
  }
}
```
## 垂直布局Column组件
Column组件即垂直布局控件，能够将子组件垂直排列。其实你学会了Row组件就基本掌握了Column组件，里边的大部分属性都一样，我们还是以文字为例子，来看看Column布局。
### Column基本用法
写一段代码，在column里加入三行文字，然后看一下效果。
``` dart
import 'package:flutter/material.dart';
void main () => runApp(MyApp());

class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context ){
    return MaterialApp(
      title: 'ListView widget',
      home: Scaffold(
        appBar: new AppBar(
          title: new Text('垂直方向布局'),
        ),
        body: Column(
          children: <Widget>[
            Text('I am Ming'),
            Text('my website is baidu.com'),
            Text('I love coding')
          ],
        )
      ),
    );
  }
}
```
这时候你会发现文字是以最长的一段文字居中对齐的，看起来很别扭。那如果想让文字以左边开始对齐，只需要加入一个对齐属性。

左对齐只要在column组件下加入下面的代码，就可以让文字左对齐。
``` sh
● crossAxisAlignment: CrossAxisAlignment.start, 
● CrossAxisAlignment.star：居左对齐。 
● CrossAxisAlignment.end：居右对齐。 
● CrossAxisAlignment.center：居中对齐。
```
### 主轴和副轴的辨识
在设置对齐方式的时候你会发现右mainAxisAlignment属性，意思就是主轴对齐方式，那什么是主轴，什么又是副轴？。
``` sh
● main轴：如果你用column组件，那垂直就是主轴，如果你用Row组件，那水平就是主轴。 
● cross轴：cross轴我们称为副轴，是和主轴垂直的方向。比如Row组件，那垂直就是副轴，Column组件的副轴就是水平方向的。
```
主轴和幅轴我们搞清楚，才能在实际工作中随心所欲的进行布局。

比如现在我们要把上面的代码，改成垂直方向居中。因为用的是Column组件，所以就是主轴方向，这时候你要用的就是主轴对齐了。
``` dart
mainAxisAlignment: MainAxisAlignment.center,
```
现在全部的代码如下：
``` dart
import 'package:flutter/material.dart';
void main () => runApp(MyApp());

class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context ){
    return MaterialApp(
      title: 'ListView widget',
      home: Scaffold(
        appBar: new AppBar(
          title:new Text('垂直方向布局'),
        ),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text('I am Ming'),
            Text('my website is baidu.com'),
            Text('I love coding')
          ],
        )
      ),
    );
  }
}
```
### 水平方向相对屏幕居中
让文字相对于水平方向居中，我们如何处理？其实只要加入Center组件就可以轻松解决。
``` dart
import 'package:flutter/material.dart';
void main () => runApp(MyApp());

class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context ){
    return MaterialApp(
      title:'ListView widget',
      home: Scaffold(
        appBar: new AppBar(
          title: new Text('垂直方向布局'),
        ),
        body: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Center(child:Text('I am Ming')),
            Center(child:Text('my website is baidu.com')),
            Center(child:Text('I love coding'))
          ],
        )
      ),
    );
  }
}
```
### Expanded属性的使用
其实在学习水平布局的时候我们对Expanded有了深刻的理解，它就是灵活布局。比如我们想让中间区域变大，而头部区域和底部根据文字所占空间进行显示。
``` dart
body: Column(
  mainAxisAlignment: MainAxisAlignment.center,
  children: <Widget>[
    Center(child:Text('I am Ming')),
    Expanded(child:Center(child:Text('my website is baidu.com'))),
    Center(child:Text('I love coding'))
  ],
)
```
## Stack层叠布局
水平布局和垂直布局确实很好用，但是有一种情况是无法完成的，比如放入一个图片，图片上再写一些字或者放入容器，这时候Row和Column就力不从心了，Flutter为这种情况准备了Stack层叠布局。

在头像上方再放入一个容器，容器里边写上字，这时候我们就可以使用Stack布局。

### 层叠布局的alignment属性
alignment属性是控制层叠的位置的，建议在两个内容进行层叠时使用。它有两个值X轴距离和Y轴距离，值是从0到1的，都是从上层容器的左上角开始算起的。

### CircleAvatar组件的使用
CircleAvatar这个经常用来作头像的，组件里边有个radius的值可以设置图片的弧度。

现在我们准备放入一个图像，然后把弧度设置成100，形成一个漂亮的圆形，代码如下：
``` dart
new CircleAvatar(
  backgroundImage: new NetworkImage('http://jspang.com/static//myimg/blogtouxiang.jpg'),
  radius: 100.0,
),
```
### 效果代码
想布局出这个效果还是比较容易的，代码如下：
``` dart
import 'package:flutter/material.dart';
void main () => runApp(MyApp());

class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context ){
    var stack = new Stack(
      alignment: const FractionalOffset(0.5, 0.8),
      children: <Widget>[
        new CircleAvatar(
          backgroundImage: new NetworkImage('http://jspang.com/static//myimg/blogtouxiang.jpg'),
          radius: 100.0,
        ),
        new Container(
          decoration: new BoxDecoration(
            color: Colors.lightBlue,
          ),
          padding: EdgeInsets.all(5.0),
          child: new Text('前端技术人才'),
        )
      ],
    );
    return MaterialApp(
      title:'ListView widget',
      home:Scaffold(
        appBar:new AppBar(
          title:new Text('垂直方向布局'),
        ),
        body:Center(child:stack),
      ),
    );
  }
}
```

## Stack的Positioned属性
已经学习了Stack组件，并且进行了两个组件的层叠布局，但是如果是超过两个组件的层叠该如何进行定位那?这就是我们加今天要学的主角Positioned组件了，这个组件也叫做**层叠定位组件**。
### Positioned组件的属性
``` sh
● bottom: 距离层叠组件下边的距离 
● left：距离层叠组件左边的距离 
● top：距离层叠组件上边的距离 
● right：距离层叠组件右边的距离 
● width: 层叠定位组件的宽度 
● height: 层叠定位组件的高度 
```
### Demo实例
修改上节课的例子，文字不在放入到container组件里，而是直接放入到Positioned里，并且不再是两个组件，而是三个子组件，我们先来看要实现的效果。
实现图片中的布局，代码如下：
``` dart
import 'package:flutter/material.dart';
void main () => runApp(MyApp());

class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context ){
    var stack = new Stack(
      children: <Widget>[
        new CircleAvatar(
          backgroundImage: new NetworkImage('http://jspang.com/static//myimg/blogtouxiang.jpg'),
          radius: 100.0,
        ),
        new Positioned(
          top:10.0,
          left:10.0,
          child: new Text('前端高端人才'),
        ),
        new Positioned(
          bottom:10.0,
          right:10.0,
          child: new Text('人文'),
        )
      ],
    );
    return MaterialApp(
      title:'ListView widget',
      home:Scaffold(
        appBar:new AppBar(
          title:new Text('层叠布局'),
        ),
        body:Center(child:stack),
      ),
    );
  }
}
```
是不是觉的有了层叠布局，我们在Flutter中的布局就更加灵活了那。

## 卡片组件布局

Flutter还有一种比较比较酷炫的布局方式，我称 它为卡片式布局。这种布局类似ViewList，但是列表会以物理卡片的形态进行展示。
比如我们现在要开发一个类似收获地址的列表，并且列表外部使用一个卡片式布局。

卡片式布局默认是撑满整个外部容器的，如果你想设置卡片的宽高，需要在外部容器就进行制定。制作的效果如图。

代码中使用了一个垂直布局组件Column组件，然后利用了ListTile实现内部列表，这里需要说明的是ListTile不光可以使用在ListView组件中，然后容器组件其实都可以使用。代码如下.
``` dart
import 'package:flutter/material.dart';
void main () => runApp(MyApp());

class MyApp extends StatelessWidget{
  @override
  Widget build(BuildContext context ){
    var card = new Card(
        child: Column(
          children: <Widget>[
            ListTile(
              title:new Text('四川省成都市双流区',style: TextStyle(fontWeight: FontWeight.w500),),
              subtitle: new Text('werwer'),
              leading: new Icon(Icons.account_box,color: Colors.lightBlue,),
            ),
            new Divider(),
            ListTile(
              title:new Text('北京市海淀区中国科技大学',style: TextStyle(fontWeight: FontWeight.w500),),
              subtitle: new Text('dsdfsff'),
              leading: new Icon(Icons.account_box,color: Colors.lightBlue,),
            ),
            new Divider(),
            ListTile(
              title:new Text('河南省濮阳市百姓办公楼',style: TextStyle(fontWeight: FontWeight.w500),),
              subtitle: new Text('sdfsddfs'),
              leading: new Icon(Icons.account_box,color: Colors.lightBlue,),
            ),
            new Divider(),

          ],
        ),
    );
    return MaterialApp(
      title:'ListView widget',
      home:Scaffold(
        appBar:new AppBar(
          title:new Text('卡片布局'),
        ),
        body:Center(child:card),
      ),
    );
  }
}
```