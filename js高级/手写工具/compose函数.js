function compose(...functions) {
  if (functions.length === 0) {
    return (x) => x; // 返回恒等函数
  }
  if (functions.length === 1) {
    return functions[0];
  }
  const [first, ...rest] = functions;
  return (x) => compose(...rest)(first(x));
}

// 定义一些简单的函数
const addOne = (x) => x + 1;
const double = (x) => x * 2;
const square = (x) => x * x;

// 使用 compose 进行函数合成
const composedFunction = compose(square, double, addOne);

// 测试合成后的函数
console.log(composedFunction(3)); // 输出  19 
