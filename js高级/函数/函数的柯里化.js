// 普通函数调用
function foo(x, y, z) {
  console.log(x + y + z);
}
foo(1, 2, 3);

// 手动柯里化
function foo(x) {
  return function (y) {
    return function (z) {
      console.log(x + y + z);
    };
  };
}
foo(10)(20)(30);

// 箭头函数的写法

// {
//   var foo3 = (x) => (y) => (z) => {
//     console.log(x + y + z);
//   };
//   foo3(10)(20)(30);
// }

//自动柯里化函数
function hyCurrying(fn) {
  //两类操作
  //第一类操作：继续返回一个新的函数，继续接受参数
  //第二类操作：直接执行fn函数
  function Curryfn(...args) {
    if (args.length >= fn.length) {
      // return fn(...args);
      // console.log(this)
      return fn.apply(this, args);
    } else {
      return (...newArgs) => {
        //Curryfn(...args.concat(newArgs))
        Curryfn.apply(this, args.concat(newArgs));
      };
    }
  }
  return Curryfn;
}
var fooCurry = hyCurrying(foo);

fooCurry(30)(20)(30);
