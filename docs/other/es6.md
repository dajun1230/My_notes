# ES6
[[toc]]

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