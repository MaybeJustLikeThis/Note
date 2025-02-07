const { da } = require("element-plus/es/locales.mjs");

//手写promise.all
Promise.myAll = function (porms) {
  let res, rej;
  const p = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  let count = 0; //所有promise的数量
  const result = []; //返回的结果
  let i = 0; //promise里内容的索引
  let fulfilledCount = 0; //已完成的promise数量
  for (const prom of porms) {
    const index = i;
    i++;
    count++;
    Promise.resolve(prom).then((data) => {
      //这段代码的主要功能是确保 porm 被转换为一个 Promise 对象，并且在 Promise 成功解析时，处理解析的值
      result[index] = data;
      //完成最终的promise
      fulfilledCount++;
      if (fulfilledCount === count) {
        res(result);
      }
    }, rej);
  }
  if (count === 0) {
    res(result);
  }
  return p;
};

Promise.myAll = function (proms) {
  let res, rej;
  const p = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  let count = 0;
  const result = [];
  let fulfilledCount = 0;
  let i = 0;
  for (const prom of proms) {
    const index = i;
    i++;
    count++;
    Promise.resolve(prom).then((data) => {
      result[index] = data;
      fulfilledCount++;
      if (fulfilledCount == count) {
        res(result);
      }
    }, rej);
  }
  if (count == 0) {
    res(result);
  }
  return p;
};
Promise.myAll([1, 2, 34, Promise.resolve(222)]).then(
  (datas) => {
    console.log(datas);
  },
  (err) => {
    console.log(err);
  }
);

Promise.myall = function (proms) {
  let res, rej;
  const p = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });
  const result = [];
  let count = 0;
  let i = 0;
  let fulfilledCount = 0;
  for (const prom of proms) {
    const index = i;
    i++;
    count++;
    Promise.resolve(prom).then((data) => {
      result[index] = data;
      fulfilledCount++;
      if (fulfilledCount === count) {
        res(result);
      }
    }, rej);
  }
  if (count === 0) {
    res(result);
  }
  return p;
};

Promise.myall([1, 2, 34, Promise.resolve(222)]).then(
  (datas) => {
    console.log(datas);
  },
  (err) => {
    console.log(err);
  }
);
