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

