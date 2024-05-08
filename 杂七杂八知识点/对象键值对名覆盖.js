{
  const obj = {
    //在 JavaScript 中，对象的键名必须是唯一的，如果出现重复的键名，后面的键值会覆盖前面的键值。
    //    a: 1,
    a: function () {
      console.log(2);
      return 0; //无论是箭头函数还是普通函数，在没有显式返回值的情况下，默认返回值都是 undefined。
    },
  };
  console.log(obj.a()); //2 0
}
{
  const obj = {
    //在 JavaScript 中，对象的键名必须是唯一的，如果出现重复的键名，后面的键值会覆盖前面的键值。
    a: 1,
    a: () => {
      console.log(2);
    },
  };
  console.log(obj.a()); //2 undefined
  //代码会执行箭头函数，并在控制台打印出 2，因为箭头函数的主体是输出 2。

  //请注意，由于箭头函数没有返回值，所以 obj.a() 的结果是 undefined。因此，执行 console.log(obj.a()) 会打印出 2 和 undefined。
}
