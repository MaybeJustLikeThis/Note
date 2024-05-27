// 自定义 Promise 类
class MyPromise {
  // 构造函数，初始化 Promise 实例
  constructor(executor) {
    this.value = undefined; // 保存成功的值
    this.error = undefined; // 保存失败的原因
    this.status = "pending"; // 初始状态为 pending
    this.onResolveCallbacks = []; // 存储成功态的回调函数
    this.onRejectCallbacks = []; // 存储失败态的回调函数

    // 成功态方法
    const resolve = (value) => {
      if (this.status === "pending") {
        // 只有在状态为 pending 时才能变为 fulfilled
        this.status = "fulfilled"; // 修改状态为 fulfilled
        this.value = value; // 保存成功的值
        this.onResolveCallbacks.forEach((callback) => {
          callback(this.value); // 触发所有成功态的回调函数
        });
      }
    };
   
    // 失败态方法
    const reject = (error) => {
      if (this.status === "pending") {
        // 只有在状态为 pending 时才能变为 rejected
        this.status = "rejected"; // 修改状态为 rejected
        this.error = error; // 保存失败的原因
        this.onRejectCallbacks.forEach((callback) => {
          callback(this.error); // 触发所有失败态的回调函数
        });
      }
    };

    try {
      executor(resolve, reject); // 执行传入的 executor 函数，并传入 resolve 和 reject 方法
    } catch (error) {
      reject(error); // 如果执行 executor 函数出错，则直接执行 reject 方法
    }
  }

  // then 方法，处理 Promise 的状态变化
  async then(onFulfilled, onRejected) {
    //首先，我们对 onFulfilled 和 onRejected 参数进行类型检查，确保它们是可调用的函数。如果参数不是函数，则使用默认的函数来处理。
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (error) => {
            throw error;
          };

    const newPromise = new MyPromise((resolve, reject) => {
      //这个函数负责执行回调函数并处理回调函数的返回值。
      const executeCallback = () => {
        try {
          //根据当前 Promise 对象的状态，我们判断是执行 onFulfilled 还是 onRejected，并将对应的值传递给回调函数。
          //在这段代码中，x代表了在Promise链式调用中上一个Promise回调函数的返回值，它可能是一个Promise对象，也可能是一个普通对象或函数。
          const x =
            this.status === "fulfilled"
              ? onFulfilled(this.value)
              : onRejected(this.error);
          //然后，调用 resolvePromise 函数来处理回调函数的返回值和新的 Promise 对象的状态。
          resolvePromise(newPromise, x, resolve, reject);
        } catch (error) {
          reject(error);
        }
      };
      //如果当前 Promise 对象的状态是已经 fulfilled 或 rejected，我们使用 queueMicrotask 函数将 executeCallback 推入微任务队列，以确保回调函数在异步执行。这样可以保证链式调用中的回调函数按顺序执行。
      if (this.status === "fulfilled" || this.status === "rejected") {
        // 使用微任务确保回调的异步执行
        queueMicrotask(executeCallback);
      } else if (this.status === "pending") {
        // 如果当前 Promise 对象的状态是 pending，说明回调函数还不能立即执行，我们将 executeCallback 添加到对应的回调数组中，待状态变更时再执行。
        this.onResolveCallbacks.push(executeCallback);
        this.onRejectCallbacks.push(executeCallback);
      }
    });

    return newPromise;
  }
}

// 处理 Promise 对象的状态变化
function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    // 如果 promise 和 x 指向同一对象，抛出循环引用错误
    reject(new TypeError("Chaining cycle detected for promise"));
  }

  if (x instanceof MyPromise) {
    // 如果 x 是一个 Promise 对象，需要等待其状态变化
    x.then(
      (value) => {
        resolvePromise(promise, value, resolve, reject);
      },
      (error) => {
        reject(error);
      }
    );
  } else if (typeof x === "object" || typeof x === "function") {
    // 如果 x 是一个对象或函数
    if (x === null) {
      // 如果 x 是 null，直接将 x 作为结果传递给下一个 Promise
      resolve(x);
    } else {
      let then;
      try {
        then = x.then; // 尝试获取 then 方法
      } catch (error) {
        reject(error); // 如果获取 then 方法出错，则将错误传递给下一个 Promise
      }

      if (typeof then === "function") {
        // 如果 then 是一个函数
        let called = false; // 标记是否已经调用过 resolve 或 reject

        try {
          then.call(
            x,
            (y) => {
              if (!called) {
                called = true;
                resolvePromise(promise, y, resolve, reject);
              }
            },
            (r) => {
              if (!called) {
                called = true;
                reject(r);
              }
            }
          );
        } catch (error) {
          if (!called) {
            reject(error);
          }
        }
      } else {
        // 如果 then 不是一个函数，将 x 作为结果传递给下一个 Promise
        resolve(x);
      }
    }
  } else {
    // 如果 x 是一个原始值，将 x 作为结果传递给下一个 Promise
    resolve(x);
  }
}
