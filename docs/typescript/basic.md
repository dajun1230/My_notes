# 基本类型

## 布尔值
最基本的数据类型就是简单的true/false值。
``` ts
let isDone: boolean = false;
```

## 数字
数字类型支持：浮点数、二进制、八进制、十进制、十六进制字面量。
``` ts
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
```

## 字符串
字符串可以使用双引号、单引号以及对象字面量。
``` ts
let name: string = "bob";
let age: number = 26;
let sentence: string = `Hello, my name is ${name}`;
```

## 数组
有两种方式可以定义数组，第一种，可以在元素类型后面接上[]，表示由此类型元素组成的一个数组：
``` ts
let list: number[] = [1, 2, 3];
```
第二种方式是使用数组泛型，Array<元素类型>：
``` ts
let list: Array<number> = [1, 2, 3];
```

## 元组Tuple
元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。
``` ts
// Declare a tuple type
let x: [string, number];
// Initialize it
x = ['hello', 10]; // OK
// Initialize it incorrectly
x = [10, 'hello']; // Error
```

## 枚举
enum类型是对JavaScript标准数据类型的一个补充，使用枚举类型可以为一组数值赋予友好的名字。
``` ts
enum Color {Red, Green, Blue}
let c: Color = Color.Green;
```
默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。
``` ts
enum Color {Red = 1, Green, Blue}
let c: Color = Color.Green;
```
或者，全部都采用手动赋值：
``` ts
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;
```

## 任意值
``` ts
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // okay, definitely a boolean
```

## 空值
某种程度上来说，void类型像是与any类型相反，它表示没有任何类型。 当一个函数没有返回值时，你通常会见到其返回值类型是void：
``` ts
function warnUser(): void {
  alert("This is my warning message");
}
```
声明一个void类型的变量没有什么大用，因为你只能为它赋予undefined和null：
``` ts
let unusable: void = undefined;
```

## Null 和 Undefined
TypeScript里，undefined和null两者各自有自己的类型分别叫做undefined和null。 和void相似，它们的本身的类型用处不是很大：
``` ts
// Not much else we can assign to these variables!
let u: undefined = undefined;
let n: null = null;
```
默认情况下null和undefined是所有类型的子类型。 就是说你可以把null和undefined赋值给number类型的变量。

## Never
never类型表示的是那些永不存在的值的类型。 例如，never类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型； 变量也可能是never类型，当它们被永不为真的类型保护所约束时。

never类型是任何类型的子类型，也可以赋值给任何类型；然而，没有类型是never的子类型或可以赋值给never类型（除了never本身之外）。 即使any也不可以赋值给never。

``` ts
function error(message: string): never {
    throw new Error(message);
}

// 推断的返回值类型为never
function fail() {
    return error("Something failed");
}

// 返回never的函数必须存在无法达到的终点
function infiniteLoop(): never {
    while (true) {
    }
}
```

## 类型断言
有时候你会遇到这样的情况，你会比TypeScript更了解某个值的详细信息。 通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。

通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。 TypeScript会假设你，程序员，已经进行了必须的检查。

类型断言有两种形式。 其一是“尖括号”语法：
``` ts
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```
另一个为as语法：
``` ts
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```
两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在TypeScript里使用JSX时，只有as语法断言是被允许的。
