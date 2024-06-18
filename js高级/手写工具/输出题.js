var a = 10;
var foo = {
  a: 20,
  bar: function () {
    var a = 40;
    return this.a;
  },
};
console.log(foo.bar());
console.log(foo.bar());
console.log((foo.bar = foo.bar)());
console.log((foo.bar,foo.bar)())