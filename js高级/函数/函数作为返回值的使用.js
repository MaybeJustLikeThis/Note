//js允许函数内部再定义函数
function foo() {
  function bar() {
    console.log("bar");
  }
  return bar;
}
var fn = foo();
fn();

//案例 
function makeadder(count) {
  function add(num) {
    return count + num;
  }
  return add;
}
var add5 = makeadder(5);
console.log(add5(10));
console.log(add5(100));

//高阶函数: 把一个函数如果接收另外一个函数作为参数，或则该函数会返回另外一个函数作为返回值的函数，那么这个函数就是一个高阶函数；