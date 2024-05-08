// var y = 20;
// function foo() {
//   if (true) {
//     let x = 10;
//     var y =50
//   }
//   console.log(y);
// }
// foo();

// console.log(y);

// console.log(y);
// 在您提供的示例中，var 关键字用于在 if 语句块内部声明变量 y，而 let 关键字用于声明变量 x。根据 JavaScript 的变量作用域规则：

// 变量 x 使用 let 声明，其作用域仅限于 if 语句块内。因此，在 console.log(x) 的代码行中，尝试访问变量 x 会导致 ReferenceError，因为 x 超出了其作用域。

// 变量 y 使用 var 声明，其作用域是整个函数作用域。虽然 var y = 20 是在 if 语句块内部声明的，但由于使用的是 var，变量 y 的作用域会提升到函数作用域顶部。因此，在 console.log(y) 的代码行中，可以成功访问并打印变量 y 的值，即 20。

// 最后，请注意在函数外部的 console.log(y) 代码行。由于变量 y 是在函数作用域内声明的，因此在函数外部无法直接访问这个变量。如果尝试访问它，会导致 ReferenceError。因此，在函数外部的 console.log(y) 的代码行中，也会引发 ReferenceError。

// 总结来说，使用 let 声明的变量 x 的作用域是 if 语句块内，而使用 var 声明的变量 y 的作用域是整个函数作用域，但在函数外部是不可访问的。


function foo() {
  console.log(x);
  var x = 1;
  console.log(x);
}
foo();

// console.log(y);
