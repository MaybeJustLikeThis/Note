{
   var n = 111;
   function foo() {
      n = 222;
   }
   foo();
   console.log(n);
}

{
   function foo1() {
      console.log(n);
      var n = 200;
      console.log(n);
   }
   var n = 200;
   foo1();
}

{
   var n = 300;
   function foo1() {
      console.log(n);
   }
   function foo2() {
      var n = 400;
      console.log(n);
      foo1();
   }
   foo2(2);
   console.log(n);
}

{
   var a = 111;
   function foo3() {
      console.log(a);
      return
      var a = 222;
      
   }
   foo3();
}
{
   function foo4() {
      var a = b = 888;
      //var a=888;
      //b=888;
   }
   foo4();
   console.log(a);
   console.log(b);
}