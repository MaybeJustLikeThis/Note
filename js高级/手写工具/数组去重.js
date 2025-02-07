const array = [1, 2, 3, 4, 4, 2, 1, 3, 7];
//第一种
const unique = [...new Set(array)];
console.log(unique);

//手写
function unique_arr(arr) {
  arr.filters((item, index) => {
    item == arr[index];
  });

  return arr;
}
const foo_arr = foo(array);
console.log(foo_arr);

//第二种
function foo(arr) {
  return arr.filter((item, index)=> arr.indexOf(item) === index);
}
// const foo_arr = foo(array);
// console.log(foo_arr);

