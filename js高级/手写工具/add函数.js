// function add(...args) {
//   // 在内部声明一个函数，利用闭包的特性保存并收集所有的参数值
//   let fn = function (...newArgs) {
//     return add.apply(null, args.concat(newArgs));
//   };

//   // 利用toString隐式转换的特性，当最后执行时隐式转换，并计算最终的值返回
//   fn.toString = function () {
//     return args.reduce((total, curr) => total + curr);
//   };

//   return fn;
// }

// 测试
console.log(add(1, 2)(3).toString())
			// 1
add(1)(2).toString();  	// 3
add(1)(2)(3).toString()// 6
add(1)(2, 3).toString(); // 6

add(1, 2, 3).toString(); // 6



function add(...arg) {
    let fn = function (...newargs) {
        return add.apply(null, arg.concat(newargs))
    }

    fn.toString = function () {
        return arg.reduce((total, curr) => total + curr)
    }
    return fn;
}