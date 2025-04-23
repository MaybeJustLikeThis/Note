// function throttle(fn, interval, leading = true) {
//   let timer = 0;
//   function _throttle(...paylaod) {
//     const nowTime = new Date().getTime();
//     if (leading === false && timer === 0) {
//       timer = nowTime;
//     }
//     let delay = interval - (nowTime - timer);
//     if (delay <= 0) {
//       fn.apply(this, paylaod);
//       timer = nowTime
//     }
//   }
//   return _throttle
// }


// function debounece(fn, delay) {
//   let timer = null;
//   function _debounece(...args) {
//     if (timer) clearTimeout(timer);

//     timer = setTimeout(() => {
//       fn.apply(this, args);
//       timer = null;
//     }, delay);
//   }
//   return _debounece;
// }

// function deepCopy(originValue, map = new WeakMap()) {
//   if (originValue == null || typeof originValue !== "object") {
//     return originValue
//   }

//   if (map.has(originValue)) {
//     return map.get(originValue);
//   }

//   const newobj = Array.isArray(originValue) ? [] : {};

//   map.set(originValue, newobj);

//   for (const key in originValue) {
//     newobj[key] = deepCopy(originValue[key], map);
//   }

//   return newobj;
// }

//  Function.prototype.hybind = function (thisArg, ...otherArgs) {
//    thisArg =
//      thisArg === null || thisArg === undefined ? window : Object(thisArg);

//    Object.defineProperty(thisArg, "fn", {
//      // configurable: true,
//      // enumerable: false,
//      // writable: false,
//      value: this, //把值绑定 foo
//    });

//    return (...newargs) => {
//      var allArgs = otherArgs.concat(newargs);
//      const result = thisArg.fn(...allArgs);
//      delete thisArg.fn;
//      return result;
//    };
//  };

// const obj = {};
// const b = { key: "b" };
// const c = { key: "c" };
// obj[b] = 123;
// obj[c] = 456;
// console.log(obj[b]);

// console.log(1 < 2 < 3); // true
// console.log(3 > 2 > 1); // false

// const os = require("os");

// console.log(os.cpus());

// 宏任务和微任务的执行顺序
// setTimeout(() => {
//   console.log("0");
// }, 0);
// new Promise((resolve, reject) => {
//   console.log("1");
//   resolve("wuwuwu");
// }).then((res) => {
//     console.log(res, "2");
      
//     new Promise((resolve, reject) => {
//       console.log("3");
//       resolve("hahaha");
//     })
//       .then((res) => {
//         console.log(res, "4");
//       })
//       .then((res) => {
//         console.log(res, "5");
//       });
// }).then((res) => {
//     console.log(res,"6");
//   });

// new Promise((resolve, reject) => {
//   console.log("7");
//   resolve();
// }).then(() => {
//   console.log("8");
// });


//promise.all的实践
// function runAsync(x) {
//   const p = new Promise((r) => setTimeout(() => r(x, console.log(x)), 1000));
//   return p;
// }
// function runReject(x) {
//   const p = new Promise((res, rej) =>
//     setTimeout(() => rej(`Error: ${x}`, console.log(x)), 1000 * x)
//   );
//   return p;
// }
// Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
//   .then((res) => console.log(res))
//   .catch((err) => console.log(err));


//async await的实践
// async function async1() {
//   console.log("async1 start");
//   await new Promise((resolve) => {
//     console.log("promise1");
//     resolve("promise resolve");
//   });
//   console.log("async1 success");
//   return "async1 end";
// }
// console.log("srcipt start");
// async1().then((res) => {
//   console.log("res: ", res);
// });
// new Promise((resolve) => {
//   console.log("promise2");
//   setTimeout(() => {
//     console.log("timer");
//   });
// });


// const p = new Promise((err) => {
//   err(1);
// })
//   .catch((err) => {
//     console.log(err);
//   })
//   .then(
//     () => {
//       console.log(2);
//     },
//     () => {
//       console.log(3);
//     }
//   );
// console.log(p);


// const a = 20;
// let test = {
//   a: 10,
//   init: () => {
//     console.log(a);
//     function go() {
//       this.a = 60;
//       console.log(a);
//     }
//     go.prototype.a = 80;
//     return go;
//   }
// }
// const p1 = test.init();

// p1();


// setTimeout(() => {
//   console.log(1);
// }, 20);
// console.log(2);
// setTimeout(() => {
//   console.log(3);
// }, 10);
// console.log(4);
// for (let i = 0; i < 199999990; i++) {
//   // do something
// } // => AA: 80ms左右
// console.log(5);
// setTimeout(() => {
//   console.log(6);
// }, 8);
// console.log(7);
// setTimeout(() => {
//   console.log(8);
// }, 15);
// console.log(9);


// setTimeout(function () {
//   console.log(1);
// }, 0);
// new Promise(function executor(resolve) {
//   console.log(2);
//   for (var i = 0; i < 10000; i++) {
//     resolve(i);
//   }
//   console.log(3);
// }).then(function (i) {
//   console.log(i);
// });
// new Promise(function (resolve) {
//   console.log(4);
//   for (var i = 0; i < 10; i++) {
//     function a() {
//       resolve(i);
//     }
//   }
//   a();
// }).then(function (i) {
//   console.log("",i);
// });
// console.log(5);


// let name = 'wqew';
// let name2 = new String("wqeqweqw")
// name.age = 11;
// name2.age = 22;
// console.log(name.age);
// console.log(name2.age);

