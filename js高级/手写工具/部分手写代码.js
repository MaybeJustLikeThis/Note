// function removeElements(A, B) {
//   let C = [];
//   for (let a of A) {
//     if (!B.includes(a)) {
//       C.push(a);
//     }
//   }
//   return C;
// }

// // 示例
// let A = [1, 2, 3, 4, 5];
// let B = [2, 4];
// let result = removeElements(A, B);
// console.log(result); // 输出: [1, 3, 5]

//去除a数组中的b数组值
Array.prototype.removeItems = function (arr) {
  // 遍历数组a,当元素不在数组b中时才保留
  return this.filter((item) => arr.indexOf(item) === -1);
};

// 使用示例
let a = [1, 2, 2, 3, 4, 5];
let b = [2, 4, 2];
let result = a.removeItems(b);
console.log(result); // [1, 3, 5]

//URL 分割
const url = "https://example.com?name=John&age=30&city=New%20York";

//手写
function foo(url) {
  const urlParams = url.split("?")[1] || "";
  const res = {};
  urlParams.split("&").forEach((item) => {
    const [key, value] = item.split("=");
    res[decodeURIComponent(key)] = decodeURIComponent(value);
  });

  return res;
}

console.log(foo(url));

//千分位分隔
function format(num) {
    let str = num + '';
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + ',')) + prev;
    });
}



let num = 1234567890;
console.log(format(num)); // 输出: "1,234,567,890" <cite>[19]</cite>


function foo_1() {
  let name = "aaa";
  let age = "aaa";
  function getname() {
    return name;
  }

  return getname;
}

let abc = new foo_1();
console.log(abc());
// foo_1()

//合成函数
function compose(...functions) {
  if (functions.length === 0) {
    return (x) => x; // 返回恒等函数
  }
  if (functions.length === 1) {
    return functions[0];
  }
  const [first, ...rest] = functions;
  return (x) => compose(...rest)(first(x));
}

// 定义一些简单的函数
const addOne = (x) => x + 1;
const double = (x) => x * 2;
const square = (x) => x * x;

// 使用 compose 进行函数合成
const composedFunction = compose(square, double, addOne);

// 测试合成后的函数
console.log(composedFunction(3)); //19



