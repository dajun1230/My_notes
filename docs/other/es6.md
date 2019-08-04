# ES6
[[toc]]

## let和const命令
> let基本用法

ES6新增了let命令，用来声明变量。它的用法类似于var，但是所声明的变量，只在let命令所在的代码块内有效。<br/>
1. **不存在变量提升**<br/>
let不像var那样会发生“变量提升”现象。所以，变量一定要在声明后使用，否则报错。<br/>
2. **暂时性死区**<br/>
只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。<br/>
3. **不允许重复声明**<br/>
let不允许在相同作用域内，重复声明同一个变量。<br/>
> const命令

1. const声明一个只读的常量。一旦声明，常量的值就不能改变。<br/>
2. const的作用域与let命令相同：只在声明所在的块级作用域内有效。<br/>
3. const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。

## Set
> 基本用法：ES6提供了新的数据结构Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
Set本身是一个构造函数，用来生成Set数据结构。
``` js
var s = new Set();
[2, 3, 5, 4, 5, 2, 2].map(x => s.add(x));
for (let i of s) {
  console.log(i);
}
// 2 3 5 4
```
> Set实例的属性和方法
``` sh
# Set结构的实例有以下属性。

Set.prototype.constructor：构造函数，默认就是Set函数。
● Set.prototype.size：返回Set实例的成员总数。
```
Set实例的方法分为两大类：操作方法（用于操作数据）和遍历方法（用于遍历成员）。下面先介绍四个操作方法。
``` sh
● add(value)：添加某个值，返回Set结构本身。
● delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
● has(value)：返回一个布尔值，表示该值是否为Set的成员。
● clear()：清除所有成员，没有返回值。
```