# ts

## 标识符的类型推导

let 进行类型推导,推导出来的通用类型
const 进行类型推导,推导出来的字面量类型

```js
let message = "aaaa";
//message 已经被推断为了 字符串类型
```

## ts 的数据类型

### 数组

明确的指定 数组的 类型注解

在 ts 中 数组中一般存放**相同类型**的数据

1. 第一种写法 string[ ];
2. 第二种 Array<T> 泛型

### 函数

函数 要求传入值最好确定类型 返回值可以进行类型推断

```js
function sum(num1: number, num2: number): number {
  return num1 + num2;
}
```

在 TypeScript 中，你可以使用函数类型来定义函数的类型和结构。函数类型可以很灵活地定义参数和返回值的类型，这对于编写类型安全的代码非常有用。

以下是一些函数类型的示例：

定义函数类型

```js
// 定义一个函数类型，接受两个参数并返回一个 number 类型的值
type MyFunctionType = (a: number, b: number) => number;

// 使用定义好的函数类型来声明一个变量
let myFunction: MyFunctionType = (x, y) => x + y;
```

函数类型作为参数

```js
// 定义一个接受函数类型作为参数的函数
function executeOperation(operation: (a: number, b: number) => number, x: number, y: number): number {
return operation(x, y);
}

// 调用函数，传入具体的函数作为参数
let result = executeOperation((a, b) => a \* b, 3, 4); // result 的值为 12
```

可选参数和默认参数
函数类型也可以包含可选参数和默认参数：

```js
type ConcatenateStrings = (a: string, b?: string) => string;

let concat: ConcatenateStrings = (str1, str2 = " World") => str1 + str2;

console.log(concat("Hello")); // 输出 "Hello World"
console.log(concat("Hello", " Fitten")); // 输出 "Hello Fitten"
```

剩余参数
函数类型还可以使用剩余参数：

```js
type JoinStrings = (...str: string[]) => string;

let join: JoinStrings = (...str) => str.join(" ");

console.log(join("Hello", "Fitten", "Code")); // 输出 "Hello Fitten Code"
```

### unknown 类型

在 TypeScript 或 JavaScript 中，"unknown" 是一种类型，它表示一个值可以是任何类型。与 "any" 类型不同的是，"unknown" 类型更为严格，因为它会强制你在使用它之前进行类型检查或类型断言。

以下是一个简单的示例，展示了如何使用 "unknown" 类型：

```js
function doSomething(value: unknown) {
  if (typeof value === "string") {
    //类型缩小
    console.log(value.toUpperCase());
  } else if (typeof value === "number") {
    console.log(value.toFixed(2));
  } else {
    console.log("Unsupported type");
  }
}

let myVar: unknown = "Hello";
doSomething(myVar); // 输出 "HELLO"

myVar = 42;
doSomething(myVar); // 输出 "42.00"
```

### void 类型

在 TypeScript 或 JavaScript 中，"void" 是一种特殊的类型，用来表示函数没有返回值。如果一个函数不返回任何值，它的返回类型通常会被标记为 "void"。

以下是一个简单的示例，展示了如何使用 "void" 类型：

```js
function greet(): void {
  console.log("Hello there!");
}

function calculateSum(a: number, b: number): void {
  let result = a + b;
  console.log("The sum is: " + result);
}
```

在这个示例中，我们定义了两个函数 greet 和 calculateSum，它们的返回类型都被标记为 "void"，因为它们并不返回任何值。
