{
  function foo() {
    console.log(this);
  }
  //调用方式一：直接调用
  foo(); //window
  //调用方式二：将foo放到一个对象中，再调用。
  var obj = {
    name: "why",
    foo: foo,
  };
  obj.foo(); //obj对象

  //调用方式三：通过call/apply调用
  foo.call("abc"); //String{ "abc"}对象
}


