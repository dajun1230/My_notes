# JS

## 数组

### 检测数组
> 检测value的类型是否为数组

1. 第1种方法
``` js
if (value instanceof Array) {
	// 对数组执行某些操作
}
```
2. 第2种方法
``` js
if (Array.isArray(value)) {
  // 对数组执行某些操作
}
```

### 具体方法
``` js
const _array = new Array(); // const _array = [];
_array.push();
_array.pop();
_array.shift();
_array.unshift();
_array.sort();
_array.reserve();
_array.concat();
_array.slice();
_array.splice();
_array.indexOf();
_array.lastIndexOf();
```
#### 栈方法
> (后进先出 Last-In-First-Out LIFO)
1. push：可以接收任意数量的参数，把它们逐个添加到数组末尾，并**返回修改后数组的长度**。
``` js
var colors = new Array(); // 创建一个数据
var count = colors.push("red", "green"); // 推入两项
alert(count); // 2
```
2. pop：从数组末尾移除最后一项，减少数组的length值，然后**返回移除的项**。
``` js
var item = colors.pop(); // 取得最后一项
alert(item); // "green"
```

#### 队列方法
> (先进先出 First-In-First-Out FIFO)

3. shift：能够移除数组中的第一个项并**返回该项**，同时数组长度减1。
``` js
var colors = new Array(); // 创建一个数据
var count = colors.push("red", "green"); // 推入两项
var item = count.shift(); // "red"
alert(count.length); // 1
```
4. unshift：能在数组前端添加任意个项并**返回新数组的长度**。
``` js
var colors = new Array(); // 创建一个数据
var count = colors.unshift("red", "green"); // 推入两项
alert(count); // 2
```

#### 重排序
5. sort：在默认情况下，sort()方法按升序排列数组项-即最小的值位于最前面，最大的值位于最后面。sort()方法会调用每个数组想的toString()转型方法，然后比较得到的字符串，以确定如何排序。
``` js
var values = [0,1,5,10,15];
values.sort();
alert(values); // 0,1,10,15,5
```
比较函数：比较函数接收两个参数，如果第一个参数应该位于第二个参数之前，则返回一个负数，如果两个参数相等，则返回0，如果第一个参数应该位于第二个参数之后，则返回一个正数。(**此方法适用于大多数数据类型**)
``` js
/* demo */
function compare(value1, value2) { // 升序
  if (value1 < value2) {
    return -1; // 降序 return 1；
  } else if (value1 > value2) {
    return 1; // 降序 return -1；
  } else {
    return 0;
  }
}
```
具体用法：
``` js
var values = [0,1,5,10,15];
values.sort(compare);
alert(values); // 0,1,5,10,15
```
6. reverse：降序。
``` js
var values = [1,2,3,4,5];
values.reverse();
alert(values); // 5,4,3,2,1
```
::: warning 注意
reverse()和sort()方法的返回值是经过排序之后的数组。
:::
对于数值类型或者其valueof()方法会返回数值类型的对象类型，可以使用一个更简单的比较函数。
``` js
function compare(value1, value2) {
  return value2 - value1;
}
```

#### 操作方法
7. concat：基于当前数组中的所有项创建一个新数组。(具体来说，这个方法会先创建当前数组的一个副本，然后将接收到参数添加到这个副本的末尾，最后返回新构建的数组。在没有给concat()方法传递参数的情况下，他只是复制当前数组并返回副本；如果传递给concat()方法的是一个或多个数组，则该方法会将这些数组中的每一项都添加到结果数组中；如果传递的值不是数组，这些值就会被简单的添加到结果数组的末尾。)
``` js
var colors = ["red", "green", "blue"];
var colors2 = colors.concat("yellow", ["black", "brown"]);
alert(colors); // red,green,blue
alert(colors2); // red,green,blue,yellow,black,brown
```
8. slice：能够基于当前数组中的一或多个项创建一个新数组，接收一或两个参数：即要返回项的起始和结束位置。(在只有一个参数的情况下，slice()方法返回从该参数指定位置开始到当前数组末尾的所有项；如果有两个参数，该方法返回起始和结束位置之间的项——但**不包括结束位置的项**。)
``` js
var colors = ["red", "green", "blue", "yellow", "purple"];
var colors2 = colors.slice(1);
var colors3 = colors.slice(1, 4);
alert(colors2); // green,blue,yellow,purple
alert(colors3); // green,blue,yellow
```
::: warning 注意
如果slice()方法中的参数中有一个负数，则用该数组长度加上该数来确定相应的位置。例如，在一个包含5项的数组上调用slice(-1, -2)与调用slice(3,4)得到的结果相同。**如果结束位置小于起始位置，则返回空数组**。
:::
9. splice：主要用途是向数组的中部插入项，返回一个数组，该数组中包含从原始数组中删除的项（如果没有删除任何项，则返回一个空数组）。
``` sh
● 删除：可以删除任意数量的项，只需指定2个参数：要删除的第一项的位置和要删除的项数。例如，splice(0,2)会删除数组中的前两项。
● 插入：可以向指定位置插入任意数量的项，只需提供3个参数：起始位置、0（要删除的项数）和要插入的项。如果要插入多个项，可以再传入第四、第五，以至任意多个项。例如，splice(2,0,"red","green")会从当前数组的位置2开始插入字符串 "red" 和 "green" 。  
● 替换：可以向指定位置插入任意数量的项，且同时删除任意数量的项，只需指定3个参数：起始位置、要删除的项数和要插入的任意数量的项。插入的项数不必与删除的项数相等。例如，splice (2,1,"red","green") 会删除当前数组位置 2 的项，然后再从位置 2 开始插入字符串"red" 和 "green" 。
```
demo:
``` js
var colors = ["red", "green", "blue"];
var removed = colors.splice(0, 1); // 删除第一项
alert(colors); // green,blue
alert(removed); // red,返回的数组中只包含一项

removed = colors.splice(1, 0, "yellow", "orange"); // 从位置1开始插入两项
alert(colors); // green,yellow,orange,blue
alert(removed); // [],返回一个空数组

removed = colors.splice(1, 1, "red", "purple"); // 插入两项，删除一项
alert(colors); // green,red,purple,orange,blue
alert(removed); // yellow,返回的数组中只包含一项
```

#### 位置方法
> indexOf()和lastIndexOf()，这两个方法都接收两个参数：要查找的项和（可选的）表示查找起点位置的索引。这两个方法都**返回要查找的项在数组中的位置，或者在没找到的情况下返回-1**。在比较第一个参数
与数组中的每一项时，会**使用全等操作符**；也就是说，要求查找的项必须严格相等（就像使用===一样）。

10. indexOf：从数组的开头（位置 0）开始向后查找。
``` js
var numbers = [1,2,3,4,5,4,3,2,1];
alert(numbers.indexOf(4)); // 3,从前往后查找第一个4所处的下标
alert(numbers.indexOf(4, 4)); // 5,从下标为4开始查找，找“4”所处的下标
```
11. lastIndexOf：从数组的末尾开始向前查找。
``` js
var numbers = [1,2,3,4,5,4,3,2,1];
alert(numbers.lastIndexOf(4)); // 5,从后往前查找第一个4所处的下标
```

#### 迭代方法
> 5个迭代方法，每个方法都接收两个参数：要在每一项上运行的函数和（可选的）运行该函数的作用域对象——影响this的值。传入这些方法中的函数会接收三个参数：数组项的值、该项在数组中的位置和数组对象本身。
``` sh
● every()：对数组中的每一项运行给定函数，如果该函数对每一项都返回 true ，则返回 true 。  
● filter()：对数组中的每一项运行给定函数，返回该函数会返回 true 的项组成的数组。  
● forEach()：对数组中的每一项运行给定函数。这个方法没有返回值。  
● map()：对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。  
● some()：对数组中的每一项运行给定函数，如果该函数对任一项返回 true ，则返回 true 。  
以上方法都不会修改数组中的包含的值。
```
12. every：传入的函数必须对每一项都返回true，这个方法才返回true；否则，它就返回false。
``` js
var numbers = [1,2,3,4,5,4,3,2,1];
var everyResult = numbers.every(function(item, index, array) {
  return (item > 2);
});
alert(everyResult); // false
```
13. some: 只要传入的函数对数组中的某一项返回true，就会返回true。
``` js
var numbers = [1,2,3,4,5,4,3,2,1];
var someResult = numbers.some(function(item, index, array) {
  return (item > 2);
});
alert(someResult); // true
```
14. filter：利用指定的函数确定是否在返回的数组中包含某一项。
``` js
var numbers = [1,2,3,4,5,4,3,2,1];
var filterResult = numbers.some(function(item, index, array) {
  return (item > 2);
});
alert(filterResult); // [3,4,5,4,3]
```
15. map：返回一个数组，而这个数组的每一项都是在原始数组中的对应项上运行传入函数的结果。
``` js
var numbers = [1,2,3,4,5,4,3,2,1];
var mapResult = numbers.some(function(item, index, array) {
  return item * 2;
});
alert(mapResult); // [2,4,6,8,10,8,6,4,2]
```
16. forEach：只是对数组中的每一项运行传入的函数。这个方法**没有返回值**，本质上与使用 for 循环迭代数组一样。
``` js
var numbers = [1,2,3,4,5,4,3,2,1];
numbers.forEach(function(item, index, array) {
  // 执行某些操作
});
```

#### 归并方法
>  reduce() 和 reduceRight() 。这两个方法都会迭代数组的所有项，然后构建一个最终返回的值。这两个方法都接收两个参数：一个在每一项上调用的函数和（可选的）作为归并基础的初始值。传给reduce()和reduceRight()的函数接收**4个参数：前一个值、当前值、项的索引和数组对象**。这个函数返回的任何值都会作为第一个参数自动传给下一项。第一次迭代发生在数组的第二项上，因此第一个参数是数组的第一项，第二个参数就是数组的第二项。

17. reduce：从数组的第一项开始，逐个遍历到最后。
``` js
var values = [1,2,3,4,5];
var sum = values.reduce(function(prev, cur, index, array) {
  return prev + cur;
});
alert(sum);
```
18. reduceRight：从数组的最后一项开始，向前遍历到第一项。
``` js
var values = [1,2,3,4,5];
var sum = values.reduceRight(function(prev, cur, index, array) {
  return prev + cur;
});
alert(sum);
```
说明：使用 reduce() 还是 reduceRight() ，主要取决于要从哪头开始遍历数组。除此之外，它们完全相同。

## Date类型

### Date构造函数
``` js
var now = new Data();
console.log(now); // Sun Dec 08 2019 14:07:53 GMT+0800 (中国标准时间)
```
在调用Date构造函数而不传递参数的情况下，新创建的对象自动获得当前日期和时间。如果想根
据特定的日期和时间创建日期对象，必须传入表示该日期的毫秒数（即从UTC时间1970年1月1日午夜起至该日期止经过的毫秒数）。为了简化这一计算过程，ECMAScript提供了两个方法：Date.parse()和Date.UTC()。

#### Date.parse()
> Date.parse()方法接收一个表示日期的字符串参数，然后尝试根据这个字符串返回相应日期的毫秒数。
``` js
var someDate = new Date(Date.parse("May 25, 2004"));
console.log(someDate); // Tue May 25 2004 00:00:00 GMT+0800 (中国标准时间)
```
如果传入 Date.parse() 方法的字符串不能表示日期，那么它会返回NaN。实际上，如果直接将表示日期的字符串传递给Date构造函数，也会在后台调用Date.parse()。换句话说，下面的代码与前面的例子是等价的：
``` js
var someDate = new Date("May 25, 2004");
```
这行代码将会得到与前面相同的日期对象。

#### Date.UTC()
> Date.UTC()方法同样也返回表示日期的毫秒数，但它与Date.parse()在构建值时使用不同的信息。Date.UTC()的参数分别是年份、基于0的月份（一月是0，二月是1，以此类推）、月中的哪一天（1到31）、小时数（0到23）、分钟、秒以及毫秒数。在这些参数中，只有前两个参数（年和月）是必需的。如果没有提供月中的天数，则假设天数为 1；如果省略其他参数，则统统假设为 0。
``` js
// GMT 时间 2000 年 1 月 1 日午夜零时
var y2k = new Date(Date.UTC(2000, 0));
// GMT 时间 2005 年 5 月 5 日下午 5:55:55
var allFives = new Date(Date.UTC(2005, 4, 5, 17, 55, 55));
```
Date 构造函数也会模仿 Date.UTC():
``` js
// 本地时间 2000 年 1 月 1 日午夜零时
var y2k = new Date(2000, 0);
// 本地时间 2005 年 5 月 5 日下午 5:55:55
var allFives = new Date(2005, 4, 5, 17, 55, 55);
```
### 日期格式化方法
| 方法       | 说明    |
| --------   | -----:  |
| getTime()           | 返回表示日期的毫秒数；与 valueOf() 方法返回的值相同      |
| setTime(毫秒)       | $以毫秒数设置日期，会改变整个日期      |
| getFullYear()       | $取得4位数的年份（如2007而非仅07）      |


  

