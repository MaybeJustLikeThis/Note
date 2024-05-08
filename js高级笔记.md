# js 高级

## 浏览器工作原理

js 代码在浏览器中执行过程

<img src="https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20231225160007441.png" alt="image-20231225160007441" style="zoom: 67%;" />

浏览器渲染过程

<img src="https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20231225160303802.png" alt="image-20231225160303802" style="zoom: 67%;" />

### 布局和绘制

在渲染树（Render tree）上运行布局（Layout）以计算每个节点的几何体。

- 渲染树会表示哪些节点以及其他样式，但是不表示每个节点的尺寸，位置等信息。
- 布局是确定呈现树种所有节点的*宽度，高度*和*位置信息*

将每个节点绘制到（Paint）到屏幕上

- 在绘制阶段，浏览器将布局阶段计算的每个 frame 转为屏幕上实际的*像素点*
- 包括将元素的可见部分进行绘制，比如文本，颜色，边框，阴影，替换元素（比如 img）

#### 回流和重绘

![image-20240121125533345](https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20240121125533345.png)

##### 回流

理解回流（reflow，重排）

- 第一次确定节点的大小和位置，称之为布局(layout)
- 之后对节点大小，位置修改重新计算称之为回流

什么情况下会引起回流

- dom 结构改变（添加新的节点或者移除节点）
- 改变了布局
- 窗口大小改变
- 调用 getComputedStyle 方法获取尺寸，位置信息

##### 重绘

- 第一次渲染内容称为绘制
- 之后渲染内容称为重绘

什么情况下会引起重绘

- 比如修改背景色，文字颜色，边框颜色，样式等。
- **回流一定会引起重绘**

开发中尽量避免重绘：

- 修改样式中尽量一次性修改
- 避免频发操作 dom
- 尽量避免通过 getComputedStyle 获取尺寸，位置等信息
- 对某些元素使用 position 的 absolute 或者 fixed。（并不是不引起回流，而是对其他元素影响较少）

#### 合成图层

绘制的过程，可以使布局后的元素绘制到多个合成图层中

标准模式下，标准流中的内容都是被绘制在同一个图层中的，而一些特殊的属性，会创建一个新的**合成层**，**并且新的图层可以用 Gpu 加速绘制；**

- 因为每个合成层都是单独渲染的

这些元素可以形成新的合成层：

- 3D transforms；
- video，canvas，iframe；
- opacity 动画旋转时；
- position：fixed；
- will-change：一个实验属性，提前告诉浏览器元素可能发生哪些变化；
- animation 或 transition 设置了 opacity，transform；

**分层确实可以提高性能，但是他以内存管理为代价，因此不应该作为 web 性能优化的一部分过度使用。**

### script 元素的处理

- 事实上，浏览器在解析 HTML 代码的过程中，遇到了`script`元素是不能继续构建 DOM 树的；
- 它会继续停止构建，首先下载了 js 代码，并且执行 js 脚本；
- 只有等到 js 脚本执行结束后，才会继续解析 HTMl，构建 DOM 树；

![image-20240121172543173](https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20240121172543173.png)

为了解决这个问题，script 元素给我们提供了两个属性（attribute）：`defer`和`async`；

#### defer 属性

defer 属性告诉浏览器不要等待脚本下载，而继续解析 HTML，构建`DOM Tree`；

- 脚本会由浏览器进行下载，但是不会阻塞`DOM tree`的构建过程；
- 如果脚本提前下载好了，它会等待`DOM tree`构建完成，在`DOMContentLoaded`事件之前先执行 defer 中的代码
- defer 属性仅对外部文件 script 有意义。

**可以将 defer 属性的 script 放到 head 标签里先去执行，因为 defer 不会阻塞。**

#### async 属性

<img src="https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20240121194115846.png" alt="image-20240121194115846" style="zoom: 50%;" />

#### 异同

`defer`通常用于需要在文档解析后操作 Dom 的 js 代码，并且对多个 script 文件有顺序要求的；

`async`通常用于独立的脚本，对其他脚本，甚至 Dom 没有依赖的

### V8 引擎

<img src="https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20231225150308368.png" alt="image-20231225150308368" style="zoom:50%;" />

<img src="https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20231225150512883.png" alt="image-20231225150512883" style="zoom:50%;" /

<img src="https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20231225160640694.png" alt="image-20231225160640694" style="zoom:50%;" />

1. 代码被解析，v8 引擎内部会帮助我们创建一个对象（GlobalObject -> go）

2. 运行代码

   2.1 v8 引擎为了执行代码，v8 引擎内部会有一个执行上下文栈（Execution context Stack，ECStack）（函数调用栈）

   2.2 因为我们执行的是全局代码， 为了全局代码能够正常的执行，需要创建 全局执行上下文（Global Execution context）

   （全局代码需要被执行时才会创建）

   2.3 开始执行代码，如下图：

<img src="https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20231225154800646.png" alt="image-20231225154800646" style="zoom:50%;" />

p.s.概念补充：

一，在 JavaScript 中，"VO" 通常指的是变量对象（Variable Object），它是在执行上下文（Execution Context）中用于保存变量和函数声明的内部对象。

当 JavaScript 代码执行时，会创建执行上下文，其中包括变量对象。**变量对象是一个存储变量和函数声明的容器**，它在执行上下文创建时被创建，并在代码执行期间被访问和使用。

变量对象包含以下内容：

1. 函数参数和函数声明：将函数参数和函数声明作为变量对象的属性存储。
2. 变量声明：将变量声明（使用关键字 `var`、`let` 或 `const` 声明的变量）作为变量对象的属性存储，但不包括赋值操作。
3. 内部函数声明：将函数声明作为变量对象的属性存储。

变量对象在执行上下文中起到重要的角色，它被用于**解析标识符、进行变量和函数查找，并在作用域链（Scope Chain）中起到关键作用。**

需要注意的是，变量对象是 JavaScript 引擎内部的概念，在开发者无法直接访问或操作变量对象。它用于实现 JavaScript 的作用域和变量查找机制。

二，”GO（Global Object）“全局对象是 JavaScript 运行环境提供的顶层对象，包含了全局作用域中定义的变量和函数。而变量对象是执行上下文中用于存储变量和函数声明的内部对象，**每个执行上下文都有自己的变量对象，全局执行上下文的变量对象就是全局对象**。

### 函数执行

1.发现函数 ，创建一块内存来存储函数，并且会存储父级作用域。

2.创建函数调用上下文 FEC，并且入调用栈 ，

<img src="https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20231225161706778.png" alt="image-20231225161706778" style="zoom:67%;" />

p.s.

"AO" 是 Activation Object（激活对象）的缩写，也被称为执行上下文对象（Execution Context Object）。它是在**函数执行过程中创建的一个内部对象**，用于存储函数的参数、变量声明和函数声明等信息。

激活对象是函数执行上下文中的一个特殊对象，它与变量对象（Variable Object）密切相关。在函数执行过程中，创建函数的执行上下文，其中包括激活对象和变量对象。

激活对象包含以下内容：

1. 函数参数：将函数调用时传递的参数作为激活对象的属性存储。
2. 函数声明：将函数声明（使用函数声明语法定义的函数）作为激活对象的属性存储。
3. 变量声明：将变量声明（使用关键字 `var`、`let` 或 `const` 声明的变量）作为激活对象的属性存储，但不包括赋值操作。

激活对象在函数执行过程中起到重要的角色，它**用于解析标识符、进行变量和函数查找，并在作用域链（Scope Chain）中起到关键作用。**

### 作用域链

当 JavaScript 引擎在执行代码时，会创建执行上下文（Execution Context），并为每个执行上下文创建对应的变量对象。**每个变量对象都有一个指向其父级变量对象的引用，这样就形成了作用域链**。

作用域链的顶端是**当前执行上下文的变量对象**，而链的**末端是全局对象**（Global Object）。当引擎在执行代码时，如果需要访问一个变量，它会首先在当前执行上下文的变量对象中查找，如果找不到，就会沿着作用域链向上查找，直到找到该变量或到达全局对象为止。

这种作用域链的机制使得变量在不同的作用域中具有不同的可访问性。内部函数可以访问外部函数的变量，因为它们共享同一个作用域链。这也是 JavaScript 中闭包（Closure）的概念所依赖的基础。

需要注意的是，当执行上下文被销毁时，相应的变量对象也会被销毁，因此作用域链也会相应更新。

总结来说，JavaScript 的作用域链是一种用于解析变量标识符的机制，它由多个执行上下文的变量对象组成的链式结构，可以实现变量的作用域查找和访问。

**对象没有作用域**

**函数的作用域和定义位置有关，和调用位置无关。**

![image-20231225181117261](https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20231225181117261.png)

---

**以上内容都是 ECMA5 以前的内容，可以不看。**

前文的 VO 变为了 VE（variable environment），变量和函数的声明作为了环境记录（内容形式更加灵活）；

<img src="https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20231227143946002.png" alt="image-20231227143946002" style="zoom:150%;" />

### 作用域提升

```js
{
  var n = 111;
  function foo() {
    n = 222;
  }
  foo();
  console.log(n);
}

{
  function foo1() {
    console.log(n);
    var n = 200;
    console.log(n);
  }
  var n = 200;
  foo1();
}

{
  var n = 300;
  function foo1() {
    console.log(n);
  }
  function foo2() {
    var n = 400;
    console.log(n);
    foo1();
  }
  foo2(2);
  console.log(n);
}

{
  var a = 111;
  function foo3() {
    console.log(a);
    return;
    var a = 222;
  }
  foo3();
}
{
  function foo4() {
    var a = (b = 888);
    //var a=888;
    //b=888;
  }
  foo4();
  console.log(a);
  console.log(b);
}
```

### 新的 ECMA 代码执行描述

在执行学习 JavaScript 代码执行过程中，我们学习了很多 ECMA 文档的术语:
执行上下文栈:Execution Context Stack，用于执行上下文的栈结构;
执行上下文: Execution Context，代码在执行之前会先创建对应的执行上下文
变量对象:Variable Object，上下文关联的 VO 对象，用于记录函数和变量声明
全局对象: Global Object，全局执行上下文关联的 VO 对象;
激活对象: Activation Object，函数执行上下文关联的 VO 对象;
作用域链:scope chain，作用域链，用于关联指向上下文的变量查找

#### 新 ECMA 描述内存图

<img src="https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20240207113812292.png" alt="image-20240207113812292" style="zoom: 50%;" />

`Environment Record` 又被分为两份，其中一份是`ObjectRecord`（就是 window），还有`DeclarationRecord`，后者就是存放`let`和`const`的位置，**二者合一生成全局环境记录**

## 内存管理

代码：磁盘到内存，再由 cpu 执行代码

![image-20231227164340934](https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20231227164340934.png)

### js 的内存管理

![image-20231227170025085](https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20231227170025085.png)

#### 垃圾回收

1. 引用计数 缺点：循环引用，内存会泄露

   ![ ](https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20231227172045099.png)

2. **标记清除（js 大体上使用）**

   **从根开始，引用不到的对象就是需要清除的垃圾。**

   <img src="https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20231227172333169.png" alt="image-20231227172333169" style="zoom: 50%;" />

## 函数的闭包

### 闭包的定义

这里先来看一下闭包的定义，分成两个: 在**计算机科学**中和在**JavaScript**中.

- 在计算机科学中对闭包的定义 (维基百科):
  闭包(英语: Closure)，又称词法闭包 (Lexical Closure) 或函数包 (function closures);
  是在支持 头等函数的编程语言中，实现词法绑定的一种技术;
- 闭包在实现上是一个结构体，它存储了一个函数和一个关联的环境 (相当于一个符号查找表);
  闭包跟函数最大的区别在于，当捕捉闭包的时候，它的 自由变量 会在捕捉时被确定，这样即使脱离了捕捉时的上下文，它也能照常运行:
- 我们再来看一下 MDN 对 JavaScript 闭包的解释:
  一个函数和对其周围状态(exical environment,词法环境)的用捆绑在-起(或者说函被用包围)，这样的组合就是闭包(closure);也就是说，闭包让你可以 在一个内层函数中访问到其外层函数的作用域，
- 在 JavaScript 中，每当创建一个函数，闭包就会在函数创建的同时被创建出来;

**那么我的理解和总结:**

- 一个普通的函数 function，如果它可以访问外层作用域的自由变量，那么这个函数和周围环境就是一个闭包
- 从广义的角度来说: JavaScript 中的函数都是闭包;
- 从狭义的角度来说: JavaScript 中一个函数，如果访问了外层作用于的变量，那么它是一个闭包；

### 闭包的过程

#### 闭包的内存泄露

对于永远不会用到的对象，但是对于 GC 来说，它不知道要进行释放的对应内存会依然保留。

在存在很多闭包的情况下很容易出现。

```js
function = null//释放内存
```

## this 的使用

```js
function foo() {
  console.log(this);
}
//调用方式一：直接调用
foo(); //window
//调用方式二：将foo放到一个对象中，再调用。
var obj = {
  name: "why",
  foo: foo,
};
obj.foo(); //obj对象

//调用方式三：通过call/apply调用
foo.call("abc"); //String{ "abc"}对象
```

1. 函数在调用时，js 会默认给 this 绑一个值；
2. **this 的绑定和定义的位置（编写的位置）没有关系；**
3. **this 的绑定和调用方式以及*调用的位置*有关系；**
4. this 是在运行时被绑定的；

常规函数的使用 this 是 基于 **执行上下文** 在 函数调用时 确认指向的

箭头函数的使用 this 是 基于 **闭包** 来使用的 ，this 指向外层。 **闭包** 又基于 **词法作用域** 是在 **预编译阶段** 进行的。所以 箭头函数的 this 是在定义时就能确定的

### 绑定规则

1. 默认绑定

   只要是独立函数调用都是 Window；

   严格模式下，独立调用的函数中的 this 指向是 undefined;

   ```js
   "use strict";
   function foo() {
     console.log(this);
   }
   foo(); //undefined
   ```

2. 隐式绑定

   ```js
   function foo(){
   	console.log ("foo函数”，this);
   }
   var obj = {
      bar:foo
    }
   obj.bar();
   ```

3. 显式绑定

   不在对象内部包含这个函数的引用，同时又希望在这个对象上进行强制调用，就应该使用 call 和 apply 方法。

   ```js
   var obj = {
     name: "why ",
   };
   function foo() {
     console.log("foo函数", this);
   }
   //执行函数并且函数中的this指向obj对象
   //obj.foo = foo
   //obj.foo()

   //执行函数，强制this就是obj对象；
   //call  第一个参数：绑定this；后面是参数列表。
   foo.call();
   //apply 第一个参数：绑定this；第二个参数：传入额外的实参，以数组的形式
   foo.apply();
   ```

4. new 绑定

   **js 中的函数可以当做一个类的构造函数来使用，也就是使用 new 关键字**

   ```js
   //new关键字
   1.创建新的空对象
   2.新对象被执行prototype连接，将this指向这个空对象
   3.将函数的显式原型赋值给这个对象作为它的隐式原型
   	obj.__proto__ = Person.protoytpe;
   4.执行函数体中的代码
   5.没有显示返回其他对象时，默认返回这个对象。

   function foo(){
     console.log ("foo函数",this);
     this.name  = "why";
   }
   new foo();
   ```

#### 规则优先级

1. 默认优先级最低
2. 显式绑定优先级高于隐式绑定
3. new 绑定优先级高于隐式绑定
4. new 绑定优先级高于 bind，new 不能和 call，apply 一起使用

### bind 方法

使用 bind 方法，bind（）方法创建一个新的绑定函数（exotic function object 怪异函数对象，ECMA2015）

<img src="https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20231229170729452.png" alt="image-20231229170729452" style="zoom:67%;" />

### 手写 apply-call 函数

## 箭头函数

箭头函数是 ES6 之后增加的一种编写函数的方法，并且它比函数表达式更加简洁。

- 箭头函数不会绑定 this，arguments 属性
- 箭头函数不能作构造函数来使用（不能和 new 一起使用，会报错）
- 只有一行代码时，这行代码的表达式结果会作为函数的返回值默认返回的
- 如果默认返回值是一个对象，那么这个对象必须加（）

```js
var arrFn = () => ({ name: "why" });
console.log(arrFn());
```

### 写法

```js
var foo3 = （name,age) =>{
console.log("箭头函数的函数体")
console.log(name ,age)
}
```

#### 箭头函数中不存在 this

![image-20231230172813595](https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20231230172813595.png)

**打印出的 this 指向 window。**

### 箭头函数中 this 的应用

**网络请求的箭头函数的运用**

<img src="https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20231230180751428.png" alt="image-20231230180751428" style="zoom: 67%;" /> <img src="https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20231230200133378.png" alt="image-20231230200133378" style="zoom:67%;" />

---

## 浏览器的渲染原理

### 输入 URL 后资源的加载过程

![浏览器的解析过程](https://yunding-ljt.oss-cn-beijing.aliyuncs.com/%E6%B5%8F%E8%A7%88%E5%99%A8%E7%9A%84%E8%A7%A3%E6%9E%90%E8%BF%87%E7%A8%8B.png)

**服务器返回之后：**

![image-20240105200745195](https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20240105200745195.png)

## 函数增强

### 函数对象的属性

默认函数中已经有自己的属性

1. name 属性

   特殊情况下区分函数

   <img src="https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20240122172600004.png" alt="image-20240122172600004" style="zoom:50%;" />

2. length 属性

   参数的个数

   在计算时不会讲剩余参数算在里边

   e.g.

   function（`...参数名`）{}

### 函数的 arguments

会放入所有的参数，是一个类数组对象，如果参数是可迭代的对象，就可以用 arguments 来迭代

但 arguments 不是一个数组对象，不可以调用 filter 函数；

```js
function foo(m, n) {
  console.log(arguments);

  //遍历
  for (let i = 0; i < arguments.length; i++) {
    console.log(arguments[i]);
  }
  //获取所有参数中的偶数
  //数组filter;
  for (let arg of arguments) {
    if (arg % 2 === 0) {
      console.log(arg);
    }
  }
  // var evenNums = arguments.filter(item =>  item % 2 === 0 );//arguments不是一个数组对象，不可以调用filter
  // console.log(evenNums);
}
foo(10, 25, 32, 42);
//[Arguments] { '0': 10, '1': 25, '2': 32, '3': 42 }
10;
25;
32;
42;
10;
32;
42;
```

#### 将 arguments 转成数组

常规方法：

1. 暴力遍历之后`push`；
2. ES6 中方法：`Array.from（arguments）；`
3. `var newArgs = [...arguments];`
4. slice 方法 `slice.apply(arguments);`

**箭头函数没有 arguments**

### 纯函数

<img src="C:\Users\cherry\AppData\Roaming\Typora\typora-user-images\image-20240123115938950.png" alt="image-20240123115938950" style="zoom:150%;" />

定义：

- 确定的输入，一定会产生确定的输出
- 函数在执行过程中，不能产生副作用（副作用：表示在执行一个函数的过程中，除了返回函数值之外，还对调用函数产生了附加的影响，比如**修改了全局变量**，**修改参数**或者**改变外部的存储**

#### 纯函数的意义

- 在写的时候保证了函数的纯度，只是单纯实现自己的业务逻辑，**不需要关心传入的内容是如何获得**或者**依赖的什么变量发生了改变**

#### 数组 splice 和 slice

1. slice：纯函数

   ```js
   var name = ["acb", "cba", "nba", "mba"];
   var newNames = [].slice.aplly(names, [1, 3]);
   ```

2. splice:操作数组，非纯函数

   ```js
   var name = ["acb", "cba", "nba", "mba"];
   names.splice(0, 2);
   ```

### 函数的柯里化

概念：只传递给函数一部分参数来调用它，让它返回一个函数去处理剩余的参数；这个过程就被称为柯里化。

柯里化是一种函数的转化，将一个函数从可调用的 f（a，b，c）转化为可调用的 f(a)(b)(c)

柯里化不会调用函数，它只是对函数进行转化

### `with`语句

主要用于扩展作用域链，**一般不建议使用**，可能会是混淆错误和兼容性问题的根源

```js
var obj = {
  message: "hello world",
};
with (obj) {
  console.log(message);
}
```

### `eval`函数

内建函数`eval`允许执行一个代码字符串

- `eval`函数是一个特殊的函数，它可以将传入的字符串当做 js 代码来执行；
- `eval`会将最后一句执行语句的结果，作为返回值

**不建议在开发过程中使用`eval`**

- `eval`代码可读性非常差
- `eval`是一个字符串，可能在执行过程中被篡改，造成被攻击的风险
- `eval`的执行必须经过 js 解释器，不能被 js 引擎优化。

### getter 和 setter 函数

#### get 函数

**`get`** 语法将对象属性绑定到查询该属性时将被调用的函数。

```js
const obj = {
  log: ["a", "b", "c"],
  get latest() {
    return this.log[this.log.length - 1];
  },
};

console.log(obj.latest);
// Expected output: "c"
```

##### `get` vs.`defineProperty`

当使用 `get` 关键字时，属性将被定义在实例的原型上，当使用[`Object.defineProperty()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)时，属性将被定义在实例自身上。

#### `set`函数

当尝试设置属性时，**`set`** 语法将对象属性绑定到要调用的函数。它还可以在[类](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes)中应用。

```js
const language = {
  set current(name) {
    this.log.push(name);
  },
  log: [],
};

language.current = "EN";
console.log(language.log); // ['EN']

language.current = "FA";
console.log(language.log); // ['EN', 'FA']
```

## 对属性操作的控制（`Object.defineProperty`）

一般来说，我们的属性都是直接定义在**对象内部**，或者直接**添加到对象内部**；

- 但是这样我们就**无法**对这个属性**做一些限制**：比如这个属性是否可以通过 delete 删除？这个属性是否在 for-in 遍历的时候被遍历出来呢？
- 如果我们想要对一个属性进行**比较精准的操作控制**，那我们就可以**使用属性描述符**
  - 通过属性描述符可以精确的添加或修改对象的属性
  - 属性描述符需要使用`Object.defineProperty`来对属性进行添加或修改

### `Object.defineProperty`

`Object.defineProperty`方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。

```js
Object.defineProperty（obj，prop，descriptor）；
```

- obj：要定义属性的对象
- prop：要定义或修改的属性的名称或 Symbol
- descriptor：要定义或修改的属性描述符

返回值：被传递给函数的对象。

#### 属性描述符

- 数据属性（Data Properies）描述符；
- 存储属性（Accessor 访问器 Properies）描述符；

|                | configurable | enumerable | value  | writable | get    | set    |
| -------------- | ------------ | ---------- | ------ | -------- | ------ | ------ |
| 数据属性描述符 | 可以         | 可以       | 可以   | 可以     | 不可以 | 不可以 |
| 存储属性描述符 | 可以         | 可以       | 不可以 | 不可以   | 可以   | 可以   |

1.  configurable：表示可否通过 delete 删除属性，是否可以修改它的特性，或者是否可以将它修改为存储属性描述符

- 当我们**直接在一个对象上定义**某个属性的时候，这个属性的[`configurable`]为 true
- 当我们**通过属性描述符定义**一个属性时，这个属性的[`configurable`]默认为 false

2. enumerable：可枚举属性，表示是否可以通过`for-in`或者`Object.key()`返回该属性

   - 当我们**直接在一个对象上定义**某个属性的时候，这个属性的[`enumerable`]为 true
   - 当我们**通过属性描述符定义**一个属性时，这个属性的[`enumerable`]默认为 false

3. writable：表示是否可以修改属性的值（read—only）

   - 当我们**直接在一个对象上定义**某个属性的时候，这个属性的[`writable`]为 true
   - 当我们**通过属性描述符定义**一个属性时，这个属性的[`writable`]默认为 false

4. value：属性的 value 值，读取属性时会返回该值，修改属性时，会对其进行修改

   - 默认情况下这个值是`undefined`

5. get:获取属性时会执行的函数。用作属性 getter 的函数，如果没有 getter 则为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)。当访问该属性时，将不带参地调用此函数，并将 `this` 设置为通过该属性访问的对象（因为可能存在继承关系，这可能不是定义该属性的对象）。**返回值将被用作该属性的值**。**默认值为 [`undefined`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/undefined)**
6. set：设置属性时会执行的函数。默认为 undefined；

**存取属性描述符示例:**

```js
Object.defineProperty（obj，prop，{
configurable：ture,
enumerable：false,
set：function(value){
  consloe.log("set");
}
get：function(){
  consloe.log("get");
}
}）
```

## 原型和原型链

### ES5

#### 原型

当我们通过[[get]]方式获取一个属性对应的 value 时，它会优先在自己的对象中查找，如果找到直接返回，如果没找到，那么会在原型对象中查找。

对象都有**隐式原型**，且**显式原型**总是赋值给对应的隐式原型，**构造函数上有`prototype`**，主要原型链就是这三者之间的关系。

##### 获取原型的方法

- `obj.__proto__`非正式方法（隐式原型）
- `Object.getPrototypeOf(obj)`比较正式，比较标准的方法。

#### 函数对象的原型

将函数看成是一个函数时，它是具备`prototype`（指向显式原型的属性，并非显式原型本身）的

**作用：在通过 new 构建对象时，将这个显示原型赋值给创建出来对象的隐式原型。**

**普通对象是没有`prototype`的**

##### 将方法放在原型上面

```js
function Student(name, age, sno) {
  this.name = name;
  this.age = age;
  this.sno = sno;
}

Student.prototype.running = function () {
  console.log(this.name + " running");
};
```

##### 构造函数的类方法

```js
var names = ['xxx','yyy','zzz']
Person.randomPerson = function(){
 var randomName = names.[Math.floor(Math.random()*names.length)];
  return new Person(random,Math.floor(Math.random()*100))
}
```

类方法直接定义在原型对象上，不需要实例就可调用。

##### 重写函数原型对象

需要添加`constructor`函数，不然`constructor`会消失

```js
Person.prototype = {
message:"hello world"
constructor:Person;//比较不好的形式,这样写浏览器中可以遍历到constructor
}
Object.defineProperty（Person.prototype,"constructor",{
  enumerable:false;
  configurable:true;
  writable:true;
  value:Person
}
```

##### 内存图

<img src="https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20240201195204449.png" alt="image-20240201195204449" style="zoom: 50%;" />

#### 面向对象

##### 继承

- 继承是面向对象中非常重要的，不仅仅可以减少重复代码的数量，也是多态前提(纯面向对象中);
- 继承可以帮助我们将重复的代码和逻辑抽取到父类中，子类只需要直接继承过来使用即可;
- 在很多编程语言中，继承也是多态的前提

##### 封装

我们前面将属性和方法封装到一个类中，可以称之为封装的过程

##### 多态

不同的对象在执行时表现出不同的形态

#### 对象的原型链

##### {}的本质

```js
var info = {};
var info = new Object();
console.log(info.__proto__ === Object.prototype); // 二者效果一致
```

##### 自定义原型链

```js
var obj = {
  name: "xxx",
  age: 18,
};
console.log(obj.message);
```

此时内存图：

<img src="https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20240201223637231.png" style="zoom:50%;" />

此时的查找顺序：

1. `obj`上面找到
2. `obj.__proto__`上面查找
3. `obj.__proto__.__proto__`-->null 结束

自定义原型链后：

```js
//改造原型链
obj.__proto__ = {
  // message:"hello"
};

obj.__proto__.__proto__ = {
  message: "hello",
};
```

这样就成功改造了原型链，查找到了 message。

##### 利用原型链实现继承

一.创建一个父类的实例对象 new Person ，用这个实例对象来作为子类的原型对象

```js
var p = new Perosn("xxx", 18);
Student.prototype = p;
```

内存图如下：

<img src="https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20240202122738889.png" alt="image-20240202122738889" style="zoom:50%;" />

这种实现的**弊端**：

- 直接打印看不到 student 上的某些属性，因为它保存在了 p 对象上面；
- 这个属性会被多个对象共享，如果这个对象是一个引用类型，那么就会造成问题；
- 不能给 Person 传递参数（让每个 stu 都有自己的属性），因为这个对象是一次性创建的，没办法定制；

##### 改进方案：借用构造函数继承

借用继承的做法非常简单:在子类型构造函数的内部调用父类型构造函数

- 因为函数可以在**任意**的时刻被调用
- 因此通过`apply()`和`call()`方法也可以在新创建的对象上执行构造函数

```js
function Perosn(name, age) {
  this.name = name;
  this.age = age;
}
Perosn.prototype.running = function () {
  console.log("running");
};

function Student(name, age, sno, score) {
  //重点：借用构造函数
  Perosn.call(this, name, age);
  this.sno = sno;
  this.score = score;
}
```

借用构造函数继承依然不够完美

**缺点：**

组合继承最大的问题就是无论在什么情况下，都会调用两次父类构造函数。

- 一次在创建子类原型的时候;
- 另一次在子类构造函数内部(也就是每次创建子类实例的时候);

另外，如果你仔细按照我的流程走了上面的每一个步骤，你会发现:**所有的子类实例事实上会拥有两份父类的属性**

- 一份在当前的实例自己里面(也就是 person 本身的)，另一份在子类对应的原型对象中(也就是`person. __proto__`里面)
  当然，这两份属性我们无需担心访问出现问题，因为默认一定是访问实例本身这一部分的:

#### 最终继承方案

```js
//用到了原型链/借用构造函数/原型式（对象之间）/寄生式函数
//寄生式函数
function inherit(subtype, supertype) {
  subtype.prototype = Object.create(supertype.prototype);
  Object.defineProperty(subtype.prototype, "constructor", {
    enumerable: false, //构造器函数最好不要遍历
    configurable: true,
    writable: true,
    value: subtype,
  });
}
//父类
function Perosn(name, age) {
  this.name = name;
  this.age = age;
}

Perosn.prototype.running = function () {
  console.log("running");
};
//子类
function Student(name, age, sno, score) {
  //重点：借用构造函数
  Perosn.call(this, name, age);
  this.sno = sno;
  this.score = score;
}

inherit(Student, Perosn);

//子类方法必须在更改子类原型链之后定义
Student.prototype.studying = function () {
  console.log("studying");
};

var stu1 = new Student("why", 18, 1.8, 111);
console.log(stu1);

stu1.running();
stu1.studying();
```

##### 对象判断方法的补充

1. `hasOwnProperty()` **只判断当前对象**是否拥有这个属性
2. `in` 沿着原型链寻找是否拥有这个属性
3. `instanceof` 用于检测构造函数 (Person、Student 类)的 pototype，是否出现在某个实例对象的原型链上
4. `isPrototypeOf` 用于检测某个对象，是否出现在某个实例对象的原型链上（用于判断对象之间的继承）

```js
var obj = {
  name: "why",
  age: 18,
};
var info = createObject(obj);
info.address = "china";
//hasOwnProperty()  只判断当前对象
console.log(info.address);
console.log(info.hasOwnProperty("name")); //false\

//in  操作符     沿着原型链寻找
console.log("name" in info); //true

//instanceof 用于检测构造函数 (Person、Student类)的pototype，是否出现在某个实例对象的原型链上
function Student() {}
var stu = new Student();
console.log(stu instanceof Student);

//isPrototypeOf 用于检测某个对象，是否出现在某个实例对象的原型链上
//用于判断对象之间的继承
console.log(Student.prototype.isPrototypeOf(stu)); //true
```

### ES6

#### class 定义类

类本质上依然式前面所讲的构造函数，原型链的语法糖。

#### class 类中的内容

`constructor`只能有一个，不能函数重载

当我们通过 new 关键字调用一个 Person 类时，默认调用 class 中的`constructor`方法

```js
class Person {
	constructor（name,age）{

	}
}
```

##### class 类和 function 构造函数的不同点

class 定义的类，不能作为一个普通函数去调用，因为 ES6 里有**专门检查调用方法的函数**，如果直接调用就会报错。

#### class 定义访问器方法

直接在对象中添加,但是可读性比较差。建议还是使用`Object.defineProperty`；

一般在类中添加，封装返回一个对象，一次返回多个数据

```js
var obj = {
_name:'why',
	set name(value){
	this._name = value
  },

	get name(value){
	return this._name
	}
}
```

#### 类的静态方法编写

```js
class Person {
	constructor（name,age）{
  this.name = name;
  this.age =age;
	};
	static REage(){
  return this.age;
	}
 }
```

#### 类的继承

直接使用`extends`关键字，需要父类参数时，调用`super（） `来获取父类参数。

##### super 关键字

使用场景：子类的构造方法，实例方法，静态方法

子类如果对父类继承的方法不满意，可以在子类内再实现一遍（父类方法重写）

```js
class dog extends animal{
	running（）{
		console.log('xxx');
		super.running（）//父类方法
	}
}
```

#### 多态

多态英语: （polymorphism）指为不同数据类型的实体提供统一的接口，或使用一个单一的符号
来表示多个不同的类型
个人的总结: 不同的数据类型进行同一个操作，表现出不同的行为，就是多态的体现。

**继承是多态的前提**

#### 对象字面量的增强

##### 属性的增强

```js
var name = 'why';
var age = 18;
var obj = {
name;//name:name
age;//age:age
}
```

##### 方法的增强

```js
var obj = {
name;//name:name
age;//age:age

running（）=>{
	clg;
	}
}
obj.running()//通过箭头函数this直接指向


```

##### 计算的增强

```js
var key = ’address‘ + ’city‘；

var obj = {
name;//name:name
age;//age:age

[key]:'中国'；
}
clg（obj）
//计算属性名
// address city：'中国'
```

#### 解构（Destructuring）

ES6 中新增了一个从数组或对象中方便获取数据的方法，称之为解构 Destructuring.

- 解构赋值 是一种特殊的语法，它使我们可以将数组或对象“拆包”至一系列变量中。

基本划分为**数组的解构**和**对象的解构**

##### **数组的解构**

基本使用

```js
var names = ["abc", "cba", "nba", "mba"];

var [name1, name2, name3] = names;
console.log(name1, name2, name3);
```

顺序问题（严格）

```js
var [name1, , name3] = names;
console.log(name1, name3);
```

解构出数组

```js
var [name1，name2,...newNames]=names
console.Log(name1，name2，newNames)
```

解构的默认值

```js
var [name1, name2, name3 = "default"] = names; //对应位置没有值时生效
console.log(name1, name2, name3);
```

##### 对象的解构

基本使用

```js
var obj = { name: "why", age: 18, height: 1.88 };

var [name, age, sheight] = obj;
console.Log(name, age, height);
```

顺序问题（根据 key 来获取，没有顺序）

```js
var {height,name，age }= obj
console.log(name, age,height)
```

变量进行重命名

```js
var { height: wHeight, name: wName , age : wAge ] = obj
console.log(wName，wAge，wHeight)
```

默认值

```js
var [
height: wHeight,
name : wName
age : wAge,
address:WAddress ="中国"
= obj
console.log(wName ，wAge，wHeight，wAddress)
```

#### 对类的显示原型添加函数，可以被所有该类获取到

```js
//Array.prototype和从空数组的显示原型获取结果是一样的，因为slice是在Array.prototype下放的
Array.prototype.slice.apply(arguments);
[].slice.apply(arguments)

//在Function.prototype 中添加的属性和方法，可以被所有的函数获取
Function.prototype .info = . "hello why
console.log(test.info)
console.log(foo.info)
Function.prototype .bar = function() {
console.log("bar function execution"
test.bar()
foo .bar()
```

## let/const 使用

### let

直观的角度来说，let 和 var 是没有太大的区别的，都是用于声明一个变量

**let 和 const 不允许重复声明变量**

### const

- const 关键字是 constant 的单词的缩写，表示常量、衡量的意思
- 它表示保存的数据一旦被赋值，就**不能被修改**
- 但是**如果赋值的是引用类型**，那么可以**通过引用找到对应的对象**修改对象的内容

**let 和 const 不允许重复声明变量**

### let 和 const 与 var 辨析

- let 和 const 变量会被创建在包含他们的词法环境被实例化时，但是是不可以访问它们的，直到词法绑定被求值;

- let 和 const 属性不会被添加到 window 上,添加到了`声明环境记录`（`DeclarationRecord`）上面，而 var 定义的会默认添加到 window 上

#### TDZ 暂行性死区

从块作用域的顶部一直到变量声明完成之前，这个变量处在**TDZ**下，和定义位置无关，和执行顺序有关。

## Proxy-Relect

### Proxy

#### 监听对象操作

##### 监听属性的操作

```js
const obj ={
  name:"why",
  age:18,
  height:1.88
}
1.针对一个属性
let _name =obj.name
Object.defineProperty(obj, "name"，{
set: function(newValue)
console.Log("监听:给name 设置了新的值:"，newValue)
_name = newValue
}，
get: function(){
console.Log("监昕: 获取name的值” );
return _name;
  }
}）
2.多个属性
const keys = Object.keys(obj)
for(const key of keys){
  let value = obj[key];
 Object.denfineProperty(obj,key,{
   set:function(newValue){
		console.Log(`监听:给${key}设置了新的值:`，newValue)
    value =newValue;
   },
   get:function(){
     console.Log(`监昕: 获取${key}的值`  );
     return value
   }
 })
}
```

但是这样做有什么缺点呢?

- 首先，Object.defineProperty 设计的初衷，不是为了去监听截止一个对象中
  所有的属性的。 - 我们在定义某些属性的时候，初衷其实是定义普通的属性，但是后面我们强
  行将它变成了数据属性描述符
- 其次，如果我们想监听更加丰富的操作，比如新增属性、删除属性，那么
  Object.defineProperty 是无能为力的。

所以我们要知道，存储数据描述符设计的初衷并不是为了去监听一个完整的对象

##### Proxy 监听

在 ES6 中，新增了一个 Proxy 类，这个类从名字就可以看出来，是用于帮助我们创建一个代理的:

- 也就是说，如果我们希望**监听一个对象的相关操作**，那么我们可以先**创建一个代理对象** (Proxy 对象)
- 之后对该对象的**所有操作**都通过代理对象来完成，代理对象可以监听我们想要对原对象进行哪些操作

我们可以将上面的案例用 Proxy 来实现一次:

- 首先，我们需要 new Proxy 对象，并且传入需要侦听的对象以及一个处理对象，可以称之为 handler
  - `const p = new Proxy(target,handler)`
- 其次，我们之后的操作都是直接对 Proxy 的操作，而不是原有的对象，因为我们需要在 handler 里面进行侦听:

```js
const obi ={
	name:"why",
	age:18
}
const objProxy = new Proxy(obj，)
```

#### Proxy 的 set 和 get 捕获器

如果我们想要侦听某些具体的操作，那么就可以在`handler`中添加对应的捕捉器
set 和 get 分别对应的是函数类型

- set 函数有四个参数
  - target:目标对象(侦听的对象)
  - property:将被设置的属性 key
  - value:新属性值:
  - receiver: 调用的代理对象
- get 函数有三个参数
  - target:目标对象(侦听的对象)
  - property:被获取的属性 key;
  - receiver:调用的代理对象;

### Reflect

Es6 新增的 api，它是**一个对象**，不能使用`new`关键字

那么这个 Reflect 有什么用呢?

- 它主要提供了很多操作 JavaScript 对象的方法有点像`Obiect`中操作对象的方法
- 比如`Reflect.getPrototypeOf(target)`类似于 `Object.getPrototypeOf（）`;
- 比如`Reflect.defineProperty(target, propertyKey, attributes)`类似于`Object.defineProperty（）`

如果我们有 Object 可以做这些操作，那么为什么还需要有 Reflect 这样的新增对象呢?

- 这是因为在早期的 ECMA 规范中没有考虑到这种对 **对象本身** 的操作如何设计会更加规范，所以将这些 API 放到了 Object 上面
- 但是 Obiect 作为一个构造函数，这些操作实际上放到它身上并不合适
- 另外还包含一些类似于 in、delete 操作符，让 JS 看起来是会有一些奇怪的
- 所以在 ES6 中新增了 Reflect，让我们这些操作都**集中到了 Reflect 对象**上;
- 另外在使用 Proxy 时，可以**做到不操作原对象**

#### 优点

```js
const obj = {
  name: "why",
};
Object.defineProperty(obj, "name", {
  configurable: false,
}); //无法确定是否设置成功

//1.用以前的方法
delete obj.name;
if (obj.name) {
  console.log("存在");
}

//2.Reflect
if (Reflect.deleteProperty(obj, name)) {
  //返回布尔值，100%确定成功与否
  console.log("删除成功");
}
```

#### Relect 的使用

和 Proxy 共同完成代理

好处&例子：

```js
const obj = {
  name: "why",
};

const objProxy = new Proxy(obj, {
  set: function (target, key, newValue, receiver) {
    //target[key] = newValue;

    //好处一,代理对象的目的:不再直接操作原对象
    //好处二：可以更加明确的判断这次操作是否成功，原来则会没有提示
    const isSuccess = Reflect.set(target, key, newValue);
    if (!isSuccess) {
      throw new Error(`set${key}failure`);
    }
  },
  get: function () {},
});

objProxy.name = "kobe";
console.log(obj);
```

#### Receiver 的作用

我们发现在使用 getter、setter 的时候有一个`receiver`的参数
它的作用是什么呢?

- 如果我们的源对象 (obj) 有 setter、getter 的访问器属性，那么可以**通过 receiver 来改变里面的 this**

## Promise

ES5 之前,处理异步的代码就是都是这样的：

```js
function exeCode(counter, success, failure) {
  //异步任务
  setTimeout(() => {
    if (counter > 0) {
      console.log("hello");
      //在某一个时刻只需要回调传入的函数
      success();
    } else {
      failure();
    }
  }, 3000);
}

//ES5之前,处理异步的代码就是都是这样的
exeCode(
  100,
  (value) => {
    console.log("回调函数执行完毕 ");
  },
  (err) => {
    console.log("执行失败");
  }
);
```

在上面的解决方案中，我们确确实实可以解决请求函数得到结果之后，获取到对应的回调，但是它存在两个主要的问题:

- 第一，我们**需要自己来设计回调函数、回调函数的名称、回调函数的使用**等,
- 第二，对于不同的人、不同的框架设计出来的方案是不同的，那么我们**必须耐心去看别人的源码或者文档**，以便可以理解它这个函数到底怎么用;

##### 我们来看一下 Promise 的 API 是怎么样的:

- Promise 是一个**类**，可以翻译成 承诺、许诺、期约
- 当我们需要的时候，给予调用者一个承诺: **待会儿我会给你回调数据时，就可以创建一个 Promise 的对象**
- 在通过 new 创建 Promise 对象时，我们需要传入一个回调函数，我们称之为`executor`
  - 这个回调函数会被立即执行，并且给传入另外两个回调函数`resolve`、 `reject`;
  - 当我们调用**resolve**回调函数时，会执行 Promise 对象的**then 方法**传入的回调函数
  - 当我们调用**reject**回调函数时，会执行 Promise 对象的**catch 方法**传入的回调函数

### Promise 各个状态区分

Promise 使用过程，我们可以将它划分成三个状态

- **待定 (pending)**:初始状态，既没有被兑现，也没有被拒绝
  当执行 executor 中的代码时，处于该状态;
- **已兑现 (fulfilled)**: 意味着操作成功完成
  执行了 resolve 时，处于该状态，Promise 已经被兑现
- **已拒绝 (rejected)** : 意味着操作失败
  执行了 reject 时，处于该状态，Promise 已经被拒绝

**Promise 的状态一旦改变，无法更改，只能实现一次**

### Executor

Executor 是在创建 Promise 时需要传入的一个回调函数，这个回调函数会被立即执行，并且传入**两个参数**

```js
new Promise((resolve,reject)=>{
  console.log("executor代码")
}
```

- 通常我们会在`Executor`中确定我们的 Promise 状态:

通过`resolve`，可以兑现 (fulfilled) Promise 的状态，我们也可以称之为已决议 (resolved);

通过`reject`，可以拒绝 (reject) Promise 的状态;

### resolve

#### 传值类型

1. 普通值

2. 传入一个新 resolve,那么当前的 Promise 的状态的值由传入的 Promise 来决定

3. `thenable`值 如果 resolve 传入一个对象,并且这个对象有实现 then 方法,那么会执行该 then 方法,并且根据 then 方法的结果来决定 Promise 的状态

e.g.

```js
   promise.then(res => {
   console.log("第一个Promise的then方法:"，res)
   //·1.普通值
   //-return“bbbbbbb"
   //-2.新的Promise
   //returnnewPromise
   //3.thenable值
   return {
   	then: function(resolve) {
   	resolve("thenable")
   						}
   				}
   }
```

### then 的链式调用

```js
promise .then(res =>{
console.log("第一个then方法:"，res)
 }).then(res=> {
console.log("第二个then方法:"，res
}).then(res => {
console.log("第三个then方法:"，res)
}).then(res => {
console.log("第四个then方法:"，res)
}).catch(err => {
```

只有第一次 then 是在决议，后面的 then 是**获取第一次 then 的结果执行**

`then()`方法是`返回一个新的Promise`，**链式中的 then 是在等待这个新的 Promise 有决议之后执行的**

### catch

catch 会调用第一个 promise 的拒绝状态

中断函数继续执行：

方式一：return

方式二：throw new Error

方式三：yield 暂停，不完全中断

### finally

`finally`是在 ES9 (ES2018)中新增的一个特性: 表示无论 Promise 对象无论变成 fulfilled 还是 reiected 状态，最终都会被执行的代码。
`finally`方法是不接收参数的，因为无论前面是 fulfilled 状态，还是 rejected 状态，它都会执行

### 类方法

#### resolve-reject

有时候我们已经有一个现成的内容了，希望将其转成 Promise 来使用，这个时候我们可以使用 `Promise.resolve()` 方法来完成
`Promise.resolve`的用法相当于`new Promise`，并且执行`resolve`操作:

resolve 有传值的区分

1.普通值
`-return“bbbbbbb"` 2.新的 Promise
`-returnnewPromise`
3.thenable 值

reject 没有

#### all 方法

另外一个类方法是 Promise.all:

- 它的作用是将多个 Promise 包裹在一起形成一个新的 Promise
- 新的 Promise 状态由包裹的所有 Promise 共同决定
- 当所有的 Promise 状态变成`fulfilled`状态时，新的 Promise 状态为`fulfilled`，并且会将所有 Promise 的返回值组成一**数组**
- 当有一个 Promise 状态为`reject`时，新的 Promise 状态为`reject`，并且会将**第一个 reject 的返回值**作为参数

## Iterator-Generator

迭代器 生成器

### 迭代器

迭代器(iterator)，使用户在**容器对象(container，例如链表或数组)上遍访的对象**，使用该接口**无需关心对象的内部实现细节**

- 其行为像数据库中的光标，迭代器最早出现在 1974 年设计的 CLU 编程语言中;
- 在各种编程语言的实现中,迭代器的实现方式各不相同，但是基本都有迭代器，比如 Java、Pvthon 等

从迭代器的定义我们可以看出来，**迭代器是帮助我们对某个数据结构进行遍历的对象。**

- 在 JavaScript 中，迭代器也是一个具体的对象，这个对象需要符合迭代器协议 (iterator protocol)
- 迭代器协议定义了**产生一系列值 (无论是有限还是无限个)的标准方式**
- 在 JavaScript 中这个标准就是一个**特定的 next 方法**

next 方法有如下的要求

- 一个无参数或者一个参数的函数，返回一个应当拥有以下**两个属性的对象**
  - done (boolean)
    - 如果迭代器可以产生序列中的下一个值，则为 false。(这等价于没有指定 done 这个属性。)
    - 如果迭代器已将序列迭代完毕，则为 true。这种情况下，value 是可选的,如果它依然存在，即为选代结束之后的默认返回值.
  - value
    - 迭代器返回的任何 JavaScript 值。done 为 true 时可省略

### 可迭代对象

什么又是可迭代对象呢?

它和迭代器是不同的概念

- 当一个对象实现了**iterable protocol**协议时，它就是一个可迭代对象
- 这个对象的要求是必须实现 `@ @iterator` 方法，在代码中我们使用 `Symbol.iterator` 访问该属性
-

将 infos 变成一个可迭代对象 :

​ 1.必须实现一个特定的函数:[Symbol.iterator];

​ 2.这个函数需要返回一个迭代器(这个迭代器用于迭代当前的对象);

```js
const infos = {
  friends: ["kobe", "james", "curry"],
  [Symbol.iterator]: function () {
    let index = 0;
    const infosIterator = {
      next: function () {
        if (index < infos.friends.length) {
          return { done: false, value: infos.friends[index++] };
        } else {
          return { done: true };
        }
      },
    };
    return infosIterator;
  },
};
```

**可迭代对象必然有下面的特点:**

```js
const iterator = infos[Symbol.iterator]();
console.log(iterator.next()); //{done: false, value: 'kobe'}
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
//可迭代对象可以使用for of
for (const item of infos) {
  console.log(item); //kobe,james,curry
}

//可迭代对象必然有一个[Symbol.iterator]
//数组是一个可迭代对象
const stus = ["张三", "李四", "王五"];
console.log(stus[Symbol.iterator]); //ƒ values() { [native code] }
const stusIterator = stus[Symbol.iterator]();
console.log(stusIterator.next()); //{value: '张三', done: false}
console.log(stusIterator.next());
console.log(stusIterator.next());
console.log(stusIterator.next());
```

#### 可迭代对象的应用

- JavaScript 中语法: **for...of、展开语法 (spread syntax)** 、yield\* (后面讲) 、**解构赋值 (Destructuring assignment)**
- 创建一些对象时: **new Map(lterablel)**、 new WeakMap(literablel)、**new Set(iterable)**，new WeakSet(literablel)
- 一些方法的调用: **Promise.all(iterable)**、**Promise.race(iterable)**、**Array.from(iterable)**；

可以迭代对象

#### 迭代器的中断

<img src="C:\Users\cherry\AppData\Roaming\Typora\typora-user-images\image-20240316174328627.png" alt="image-20240316174328627" style="zoom:67%;" />

##### 加上 return 方法可以监听迭代器的中断

```js
const infos = {
  name: "why",
  age: 18,
  height: 1.88,
  [Symbol.iterator]: function () {
    // const keys = Object.keys(this); 键
    // const values = Object.values(this); 值
    const entries = Object.entries(this); //键值对
    let index = 0;
    const Iterator = {
      next: () => {
        if (index < entries.length) {
          return { done: false, value: entries[index++] };
        } else {
          return { done: true };
        }
      },
      //迭代器中断
      return: () => {
        console.log("中断");
        return { done: true };
      },
    };
    return Iterator;
  },
};
```

### 生成器

生成器是 ES6 中新增的一种函数控制、使用的方案，它可以让我们更加灵活的控制函数什么时候**继续执行**、**暂停执行**等

- 平时我们会编写很多的函数，这些函数终止的条件通常是返回值或者发生了异常。

生成器函数也是一个函数，但是和普通的函数有一些区别:

- 首先，生成器函数需要在`function`的后面加一个符号:\*
- 其次，生成器函数可以通过`yield`关键字来控制函数的执行流程
- 最后，生成器函数的返回值是一个`Generator` (生成器)
  - 生成器事实上是一种特殊的迭代器
  - MDN: Instead, they return a special type of iterator, called a **Generator**

**那么我们如何可以让它执行函数中的东西呢?** 调用`next`即可

我们之前学习迭代器时，知道迭代器的 next 是会有返回值的

但是我们很多时候不希望 next 返回的是一个`undefined`，这个时候我们可以通过 yield 来返回结果

#### yield

yield**后面**的代码是随着本次 yield**前面的代码**执行的

yield**前面**的代码是随着本次 yield**后面的代码**执行的

```js
const name = yield "aaaa"
```

#### 生成器函数的提前结束

`generator.return();`

`generator.throw(new Error("error"));`

除了给生成器函数内部传递参数之外，也可以给生成器函数内部抛出异常:

- 抛出异常后我们可以在生成器函数中捕获异常
  但是可以在 catch 语句外使用 vield 继续中断函数的执行
- 但是在 catch 语句中不能继续 yield 新的值了

### yield 的语法糖

**`yield*` 表达式**用于委托给另一个 生成器 或 可迭代对象。

```js
//替换之前的方案
const names = ["abc", "cba", "nba"];
const nums = [111, 222, 333, 4444];

function* createArrayIterator(arr) {
  yield* arr;
}

const namesIterator = createArrayIterator(names);
console.log(namesIterator.next());
```

## 异步

异步请求代码结构

```js
//异步函数
async function foo() {}
```

异步函数的内部代码执行过程和普通的函数是一致的，默认情况下也是会被同步执行。
异步函数有返回值时，和普通函数会有区别:

- 情况一:
  异步函数也可以有返回值，但是异步函数的返回值相当于被包裹到`Promise.resolve`中;
- 情况二:
  如果我们的异步函数的返回值是`Promise`，状态由会由`Promise`决定
- 情况三:
  如果我们的异步函数的返回值是一个对象并且实现了`thenable`，那么会由对象的`then`方法来决定

### 异步函数处理异常

如果异步函数中有抛出异常（产生了错误），这个异常不会立即被浏览器处理，而是作为 Promise 的 reject 来传递

处理

```js
async function foo() {
  //-> Promise.resolve(321)
  "abc".filter();
  return 321;
}
foo()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    // 处理错误
    console.log(err);
    // 继续执行其他操作
  });
```

### await

必须异步函数中使用

如果 await 之后返回一个 Promise，那么会等待 Promise 有结果之后再执行

## 进程和线程

进程 (Process): 计算机已经运行的程序，是操作系统管理程序的一种方式。它是操作系统中管理和调度程序的基本单位。一个进程可以包含多个线程，以实现并行执行多个任务。每个进程都有自己的地址空间、内存、文件描述符等资源，并且相互独立地运行在操作系统的环境中。。

线程 (Thread): 操作系统能够运行运算调度的最小单位，通常情况下它被包含在进程中

线程是在进程内部创建和管理的，多个线程共享同一个进程的地址空间和资源。线程之间可以并发执行，每个线程都有自己的指令流、栈和局部变量，但共享进程的全局变量和堆内存。线程的创建、销毁和切换开销较小，因此多线程编程常用于提高程序的并发性和响应性。

### js 中的进程

浏览器中的 JavaScript 线程
我们经常会说 JavaScript 是**单线程**(可以开启 workers)的，但是 JavaScript 的线程应该有自己的容器进程:浏览器或者 Node.
浏览器是一个进程吗，它里面只有一个线程吗?

- 目前多数的浏览器其实都是**多进程**的，当我们打开一个 tab 页面时就会开启一个**新的进程**，这是为了防止一个页面卡死而造成所有页面无法响应，整个浏览器需要强制退出;
- 每个**进程中又有很多的线程**，其中包括执行**JavaScript 代码的线程**;

JavaScript 的代码执行是在一个单独的线程中执行的:

- 这就意味着 JavaScript 的代码，在同一个时刻只能做一件事
- 如果这件事是非常耗时的，就意味着当前的线程就会被阻塞

所以**真正耗时的操作**，实际上**并不是由 JavaScript 线程**在执行的:

- 浏览器的每个进程是**多线程**的，那么**其他线程可以来完成这个耗时的操作**
- 比如**网络请求**、**定时器**，我们只需要在特性的时候执行应该有的回调即可

### 浏览器的事件循环

如果在执行 JavaScript 代码的过程中，有异步操作呢?

- 中间我们插入了一个 setTimeout 的函数调用;
- 这个函数被放到入调用栈中，执行会立即结束，并不会阻塞后续代码的执行，

![image-20240321112807110](https://yunding-ljt.oss-cn-beijing.aliyuncs.com/image-20240321112807110.png)

1. JavaScript 引擎首先会执行全局的同步代码。
2. 之后会查看执行栈是否为空，如果为空，就开始走事件循环；如果不为空，就继续执行同步代码。
3. 在事件循环中，首先查看微任务队列中是否有任务，如果有，就不断地取出并执行微任务，直到微任务队列为空；
4. 然后渲染 UI，进行页面更新；
5. 最后查看宏任务队列中是否有任务，如果有，取出一个宏任务放到执行栈中执行，然后再次开始新的一轮事件循环。

### 宏任务和微任务

- 宏任务队列(macrotask queue):ajax、setTimeout、setInterval、DOM 监听、Ul Rendering 等
- 微任务队列(microtask queue):Promise 的 then 回调、Mutation Observer APl、queueMicrotask()等

顶层 js 代码先执行，然后再先执行微任务，再执行宏任务，每次执行完宏任务后确保微任务队列清空

**Promise 函数是直接执行**

## 错误处理方案

开发中我们会封装一些工具函数，封装之后给别人使用:

- 在其他人使用的过程中，可能会传递一些参数;
- 对于函数来说，需要对这些参数进行验证，否则可能得到的是我们不想要的结果;
  很多时候我们可能验证到不是希望得到的参数时，就会直接 return:
- 但是 return 存在很大的弊端:调用者不知道是因为函数内部没有正常执行，还是执行结果就是一个 undefined
- 事实上，正确的做法应该是如果没有通过某些验证，那么应该让外界知道函数内部报错了；

如何可以让一个函数告知外界自己内部出现了错误呢?

- throw 关键字，抛出一个异常;

throw 语句:

- row 语句用于抛出一个用户自定义的异常
- 到 throw 语句时，当前的函数执行会被停止(throw 后面的语句不会执行)

try-catch 语句

## Storage

WebStorage 主要提供了一种机制，可以让浏览器提供一种比 cookie 更直观的 key、value 存储方式:

- `localStorage`:本地存储，提供的是一种永久性的存储方法，在关闭掉网页重新打开时，存储的内容依然保留会话存储
- `sessionStorage`:提供的是本次会话的存储，在关闭掉会话时，存储的内容会被清除;

storage 常见的属性：

1. storage.length:有几个数据
2. storage.key(索引)
3. storage.removeItem(key)
4. storage.clear()清空所有 key

### 工具封装

```js
class Catch {
  constructor(islocal = true) {
    this.storage = islocal ? localStorage : sessionStorage;
  }
  setCache(key, value) {
    if (!value) {
      throw new Error("value error: value必须有值!");
    }
    this.storage.setItem(key, JSON.stringify(value));
  }
  getCache(key) {
    const result = this.storage.getItem(key);
    if (result) {
      return JSON.parse(result);
    }
  }
  removeCache(key) {
    this.storage.removeItem(key);
  }
  clear() {
    this.storage.clear();
  }
}
const localCache = new Catch();
const sessionCache = new Catch(false); //类封装的好处
```

## 手写工具

### 防抖和节流

**防抖和节流**的概念其实最早并不是出现在软件工程中，防抖是出现在电子元件中，节流出现在流体流动中

- 而 JavaScript 是事件驱动的，大量的操作会触发事件，加入到事件队列中处理。
- 而对于某些频繁的事件处理会造成性能的损耗，我们就可以通过防抖和节流来限制事件频繁的发生

防抖和节流函数目前已经是前端实际开发中两个非常重要的函数，也是面试经常被问到的面试题。

#### 重点:

1. 区分防抖和节流
2. 应用
3. 内部原理,编写

#### 防抖

当事件触发时,相应的函数并不会立即触发,而是会等待一定的时间;

当事件密集触发时,函数的触发会被频发地推迟;

只有等待了一段时间也没有事件触发,才会真正地执行响应函数;

##### 应用场景

> 输入框中频繁的输入内容，搜索或者提交信息
> 频繁的点击按钮，触发某个事件;
> 监听浏览器滚动事件，完成某些特定操作;
> 用户缩放浏览器的 resize 事件

#### 节流

节流（Throttling）是一种限制函数执行频率的技术，它确保在一定时间间隔内，函数不会被连续调用超过指定的频率。通过节流，可以控制函数的执行次数，防止频繁触发函数造成性能问题。

通常情况下，当一个事件被触发时，节流函数会在指定的时间间隔内执行一次，并忽略在此时间间隔内的其他触发。如果在时间间隔内再次触发事件，节流函数会等待时间间隔结束后再执行，并重置等待时间。

节流常用于处理频繁触发的事件，例如窗口滚动、鼠标移动、输入框输入等，以减少事件处理函数的执行次数，提高性能和响应速度。

##### 应用场景

> 很多人都玩过类似于飞机大战的游戏
> 在飞机大战的游戏中，我们按下空格会发射一个子弹:
> 很多飞机大战的游戏中会有这样的设定，即使按下的频率非常快，子弹也会保持一定的频率来发射;口 比如 1 秒钟只能发射一次，即使用户在这 1 秒钟按下了 10 次，子弹会保持发射一颗的频率来发射;口 但是事件是触发了 10 次的，响应的函数只触发了一次;

### 深拷贝和浅拷贝

前面我们已经学习了对象相互赋值的一些关系，分别包括：

- 引入的赋值:指向同一个对象，相互之间会影响;
- 对象的浅拷贝:只是浅层的拷贝，**内部引入对象时**，依然会相互影响，
- 对象的深拷贝:两个对象不再有任何关系，不会相互影响:前面我们已经可以通过一种方法来实现深拷贝了:JSON.parse()
- 这种深拷贝的方式其实对于函数、Symbol 等是无法处理的
- 并且如果存在对象的循环引用，也会报错的;

```js
const map = new WeakMap();

function deepCopy(originValue) {
  if (!isObject(originValue)) {
    return originValue;
  }
  debugger;

  if (map.get(originValue)) {
    return map.get(originValue);
  }
  //对数组类型的处理
  const newObj = Array.isArray(originValue) ? [] : {};

  map.set(originValue, newObj);

  for (const key in originValue) {
    newObj[key] = deepCopy(originValue[key]);
  }
  return newObj;
}

function isObject(value) {
  const valueType = typeof value;
  return value !== null && (valueType === "object" || valueType === "function");
}
```
