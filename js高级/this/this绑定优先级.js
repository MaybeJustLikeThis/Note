function foo() {
    console.log("foo:",this)
}


// 比较优先级
//显示绑定优先级高于隐式绑定

// var obj = { foo: foo };
// obj.foo.apply("abc");
// obj.foo.call("abc");


//bind 高于默认绑定
// var bar = foo.bind("aaa");
// var obj = {
//     name: "why",
//     baz:bar,
// }
// obj.baz();

//new绑定优先级高于隐式绑定
// var obj = {
//     name: "why",
//     foo: function () {
//         console.log("foo:",this)
//     }
// }
// new obj.foo()

//new/显式 
// function foo() {
//   console.log("foo:", this);
// }
// var bindFn = foo.bind("aaa")
// new bindFn();

//bind/apply 优先级
function foo() {
  console.log("foo:", this);
}
var bindFn = foo.bind("aaa");
// bindFn();
bindFn.call("bbb")