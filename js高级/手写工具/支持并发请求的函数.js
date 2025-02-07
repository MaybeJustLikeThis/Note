class ConcurrentManager {
  constructor(maxConcurrent) {
    this.maxConcurrent = maxConcurrent;
    this.currentConcurrent = 0;
    this.queue = [];
  }

  async execute(task) {
    if (this.currentConcurrent < this.maxConcurrent) {
      this.currentConcurrent++;
      try {
        await task();
      } finally {
        this.currentConcurrent--;
        this.processQueue();
      }
    } else {
      await new Promise((resolve) => {
        this.queue.push(resolve);
        this.processQueue();
      });
      await this.execute(task);
    }
  }

  processQueue() {
    while (
      this.queue.length > 0 &&
      this.currentConcurrent < this.maxConcurrent
    ) {
      this.queue.shift()();
    }
  }
}

// 使用示例
const manager = new ConcurrentManager(3);

const fetchData = async () => {
  // 模拟异步请求
  await new Promise((resolve) => setTimeout(resolve, Math.random() * 2000));
  console.log("Fetch data done");
};

manager.execute(fetchData);
manager.execute(fetchData);
manager.execute(fetchData);
manager.execute(fetchData);
manager.execute(fetchData);

// 在构造函数中,接受一个 maxConcurrent 参数,用于设置最大并发数。
// 定义 currentConcurrent 变量来跟踪当前并发数,queue 数组来保存待执行的任务。
// execute 方法是主要的入口函数,它接受一个 task 函数作为参数,表示要执行的异步任务。
// 在 execute 方法内部,首先检查当前并发数是否小于最大并发数。如果是,则执行任务,并在任务完成后减少并发数,然后调用 processQueue 方法处理队列中的任务。
// 如果当前并发数已经达到最大值,则创建一个新的 Promise,将任务的 resolve 函数添加到队列中,并调用 processQueue 方法。当队列中有空位时,会自动执行待处理的任务。
// processQueue 方法用于处理队列中的任务,只要当前并发数小于最大并发数,就会从队列中取出任务并执行。
