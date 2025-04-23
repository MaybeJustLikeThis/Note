
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



//手写Pomise.all
function myPromiseAll(promises) {
    return new Promise((resolve, reject) => {
        // 如果传入的不是数组，直接拒绝
        if (!Array.isArray(promises)) {
            return reject(new TypeError('参数必须是数组'));
        }
        
        const results = [];
        let completed = 0;
        
        // 处理空数组的情况
        if (promises.length === 0) {
            return resolve(results);
        }
        
        // 遍历所有promise
        promises.forEach((promise, index) => {
            // 处理非Promise值
            Promise.resolve(promise)
                .then(value => {
                    // 保持结果顺序
                    results[index] = value;
                    completed++;
                    
                    // 所有promise都已完成
                    if (completed === promises.length) {
                        resolve(results);
                    }
                })
                .catch(error => {
                    // 任何一个promise失败，整个myPromiseAll就失败
                    reject(error);
                });
        });
    });
}