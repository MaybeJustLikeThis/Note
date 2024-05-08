//将函数作为另一个函数的参数

function foo(aaaaaa) {
    aaaaaa()
}
function bar() {
    console.log("bar");
}
foo(bar);

//函数作为参数的使用 案例
function calc(num1, num2, calcFn) {
    console.log(calcFn(num1, num2));
    
}
function add(num1, num2) {
    return num1 + num2;
}
function sub(num1, num2) {
    return num1 * num2;
}
calc (20 ,10 ,add)