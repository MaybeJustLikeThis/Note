// let arr = [
//   [1, 2, 3],
//   [2, 3, [1, 2, 3], 5],
//   [2, 6, 8, 3],
//   [3, 5, 8, 2, 4],
// ];

const { ElStep } = require("element-plus");

// function setFlattening(arr) {
//   let newArr = [];
//   function Flattening(arr) {
//     let len = arr.length;
//     for (let i = 0; i < len; i++) {
//       if (arr[i] instanceof Array) {
//         Flattening(arr[i]);
//       } else {
//         newArr.push(arr[i]);
//       } //递归调用，让里面的数组再存入数组
//     }
//     return newArr;
//   }
//   return Flattening(arr);
// }
// console.log(setFlattening(arr));

//进阶
const arr_2 = [2, 3, 4, 5, [2, 34, 45, [666, 7777], 55], 22];

function flattenArray(arr, depth = Infinity) {
  let res = [];
  function _flatten(items, curdepth) {
    if (Array.isArray(items) && curdepth > 0) {
      for (let item of items) {
        _flatten(item, curdepth - 1);
      }
    } else {
      res.push(items);
    }
  }
  _flatten(arr, depth);
  return res
}
console.log(flattenArray(arr_2, 1)); // [2, 3, 4, 5, [2, 34, 45, [666, 7777], 55], 22]
console.log(flattenArray(arr_2, 2)); // [2, 3, 4, 5, 2, 34, 45, [666, 7777], 55, 22]
console.log(flattenArray(arr_2)); // [2, 3, 4, 5, 2, 34, 45, 666, 7777, 55, 22]
