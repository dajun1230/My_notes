# 8/26 笔记
## Fragment标签讲解

加上最外层的DIV，组件就是完全正常的，但是你的布局就偏不需要这个最外层的标签怎么办?比如我们在作Flex布局的时候,外层还真的不能有包裹元素。这种矛盾其实React16已经有所考虑了，为我们准备了<Fragment>标签。

要想使用<Fragment>，需要先进行引入。
``` js
import React,{Component,Fragment } from 'react';
```
加上最外层的DIV，组件就是完全正常的，但是你的布局就偏不需要这个最外层的标签怎么办?比如我们在作Flex布局的时候,外层还真的不能有包裹元素。这种矛盾其实React16已经有所考虑了，为我们准备了<Fragment>标签。
``` js
import React,{Component,Fragment } from 'react'

class Example extends Component{
    render(){
        return  (
            <Fragment>
               <div><input /> <button> 增加课程 </button></div>
               <ul>
                   <li>数学</li>
                   <li>英语</li>
               </ul> 
            </Fragment>
        )
    }
}
export default Example;
```
要想使用<Fragment>，需要先进行引入。

## JSX代码注释
``` js
<Fragment>
    {/* 正确注释的写法 */}
    <div>
        <input value={this.state.inputValue} onChange={this.inputChange.bind(this)} />
        <button onClick={this.addList.bind(this)}> 增加服务 </button>
    </div>
```
## JSX中的class陷阱
JSX中的class需要换成className，它是为了防止和js中的class类名冲突，所以要求换掉。示例代码如下：
``` js
<input className="input" />
```

## JSX中的html解析问题
如果想在文本框里输入一个<h1>标签，并进行渲染。默认是不会生效的，只会把<h1>标签打印到页面上，这并不是我想要的。如果工作中有这种需求，可以使用**dangerouslySetInnerHTML**属性解决。具体代码如下：
``` js
<ul>
    {
        this.state.list.map((item,index)=>{
            return (
                <li 
                    key={index+item}
                    onClick={this.deleteItem.bind(this,index)}
                    dangerouslySetInnerHTML={{__html:item}}
                >
                </li>
            )
        })
    }
</ul> 
```
## JSX中<label>标签的坑
label是html中的一个辅助标签，也是非常有用的一个标签。react的JSX中的lable标签不能使用for，它容易和javascript里的for循环混淆，会提示你使用htmlFor。代码如下：
``` js
<div>
    <label htmlFor="inputText">加入服务：</label>
    <input id="inputText" className="input" value={this.state.inputValue} onChange={this.inputChange.bind(this)} />
    <button onClick={this.addList.bind(this)}> 增加服务 </button>
</div>
```

## React 快速生成代码插件
Vs Code中的React快速生成代码插件：Simple React Snippets。

## React高级-调试工具的安装及使用
在使用React进行开发中经常使用console.log这种很二的形式来调试程序。其实React在浏览器端是有一个调试工具的，这就是React developer tools，这个是React人必下的一个调试工具。

**下载React developer tools**
::: warning 注意
需要进行科学上网
:::
打开谷歌浏览器，点击浏览器地址栏最右边的...，然后选择更多工具,然后选择扩展程序。

点击打开chrome网上应用店,直接在搜索框里搜索React，出现的第一个就是。

点击添加至Chrome,然后就是等待了..........

**React developer tools的三种状态**

React developer tools有三种颜色，三种颜色代表三种状态：

● 灰色： 这种就是不可以使用，说明页面不是又React编写的。
● 黑色: 说明页面是用React编写的，并且处于生成环境当中。
● 红色： 说明页面是用React编写的，并且处于调试环境当中。

**React developer tools使用**

打开浏览器，然后按F12,打开开发者工具，然后在面板的最后一个，你会返现一个React,这个就是安装的插件了。

在这里你可以清晰的看到React的结构，让自己写的代码更加清晰，你还可以看到组间距的数据传递，再也不用写console.log来测试程序了。

## React高级-PropTypes校验传递值
在父组件向子组件传递数据时，使用了属性的方式，也就是props，但值并没有任何的限制。这在工作中时完全不允许的，因为大型项目，如果你不校验，后期会变的异常混乱，业务逻辑也没办法保证。

**PropTypes的简单应用**

我们在Xiaojiejie.js组件里传递了4个值，有字符串，有数字，有方法，这些都是可以使用PropTypes限制的。在使用需要先引入PropTypes。
```js
import PropTypes from 'prop-types';
```
引入后，就可以在组件的下方进行引用了，需要注意的是子组件的最下面（不是类里边），写入下面的代码：
``` js
XiaojiejieItem.propTypes={
    content:PropTypes.string,
    deleteItem:PropTypes.func,
    index:PropTypes.number
}
```

具体意思，我会在视频中进行讲解，请观看视频。为了防止你的为止写错，我这里给出这个XiaojiejieItem.JS文件的代码。
``` js
import React, { Component } from 'react'; //imrc
import PropTypes from 'prop-types'

class XiaojiejieItem  extends Component { //cc
   
   constructor(props){
       super(props)
       this.handleClick=this.handleClick.bind(this)
   }
   
    render() { 
        return ( 
            <div onClick={this.handleClick}>
                {this.props.content}
            </div>
        );
    }

    handleClick(){
        
        this.props.deleteItem(this.props.index)
    }
    
}
 //--------------主要代码--------start
XiaojiejieItem.propTypes={
    content: PropTypes.string.isRequired, //是字符串类型，并且要必填，具体去官网查看更多类型验证
    deleteItem: PropTypes.func,
    index: PropTypes.number
}
XiaojiejieItem.defaultProps = {
    name: '小小'
}
 //--------------主要代码--------end
export default XiaojiejieItem;
```
这时候你在浏览器中查看效果，是什么都看不出来的，你需要修改一个错误的校验。比如我们把index改为必须是字符串。

index:PorpTypes.string