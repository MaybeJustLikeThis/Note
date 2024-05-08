function double(num) {
  return num * 2;
}
function pow(num) {
  return num * 2;
}

// 封装的函数：传入多个参数，自动地将多个函数组合在一起使用
function composeFn(...fns) {
  //1。边界判断
  var length = fns.length;
  for (var i = 0; i < length; i++) {
    var fn = fns[i];
    if (typeof fn !== "function") {
      throw new Error(`index position ${i} must be function`);
    }
  }
  //2.返回的新函数 
  return function (...args) {
    var result = fns[0].apply(this, args);
    //递归嵌套函数 
    for (let i = 1; i < length; i++) {
      var fn = fns[i];
      result = fn.apply(this, [result]);
    }
    return result;
  };
}

var newFn = composeFn(double, pow);
console.log(newFn(100));
