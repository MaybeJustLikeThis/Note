function curry(fn) {
  // 获取原函数的参数长度
  const lens = fn.length;

  // 返回一个闭包函数
  return function curried(...args) {
    // 如果传入的参数数量已经达到原函数的参数数量
    if (args.length >= lens) {
      return fn(...args);
    } else {
      // 否则返回一个新的函数，继续接收剩余的参数
      return function (...nextArgs) {
        return curried(...args, ...nextArgs);
      };
    }
  };
}

// 示例函数
function add(a, b, c, d) {
  return a + b + c + d;
}

// 柯里化 add 函数
const curriedAdd = curry(add);

// 测试柯里化函数
console.log(curriedAdd(1)(2)(3)(4)); // 输出 10
console.log(curriedAdd(1, 2)(3, 4)); // 输出 10
console.log(curriedAdd(1, 2, 3)(4)); // 输出 10
console.log(curriedAdd(1, 2, 3, 4)); // 输出 10


function curry(fn) {

    const len = fn.length;
    return function curried(...args) {
        if (args.length >= len) {
            return fn(...args)
        } else {
            return function (...newArgs) {
                return curried(...args, ...newArgs);
            }
        }
    }
 }
