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

//字符中间加",'
const qbc = "123456789";
function formatNumber(input) {
  return input.split("").reduce((acc, curr, i) => {
    if (i > 0 && i % 3 === 0) {
      acc = acc + ",";
    }
    return acc + curr;
  }, "");
}

const res = formatNumber(qbc);
console.log(res);

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
