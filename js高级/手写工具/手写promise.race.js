//手写Promise.race
Promise.myRace = function(promises) {
    return new Promise((resolve, reject) => {
        // 遍历所有promise
        for (let promise of promises) {
            // 将每个promise包装成Promise.resolve，以处理非Promise对象
            Promise.resolve(promise).then(resolve, reject);
        }
    });
}

// 测试用例 - 成功情况
const p1 = new Promise((resolve) => setTimeout(() => resolve(1), 1000));
const p2 = new Promise((resolve) => setTimeout(() => resolve(2), 500));
const p3 = new Promise((resolve) => setTimeout(() => resolve(3), 2000));

Promise.myRace([p1, p2, p3]).then(result => {
    console.log('第一个完成的promise结果:', result); // 应该输出 2
});

// 测试用例 - 错误处理
const p4 = new Promise((resolve) => setTimeout(() => resolve(4), 1000));
const p5 = new Promise((resolve, reject) => setTimeout(() => reject('错误'), 500));
const p6 = new Promise((resolve) => setTimeout(() => resolve(6), 2000));

Promise.myRace([p4, p5, p6])
    .then(result => {
        console.log('成功结果:', result);
    })
    .catch(error => {
        console.log('捕获到错误:', error); // 应该输出 "错误"
    });

// 测试用例 - 空数组
Promise.myRace([])
    .then(result => {
        console.log('空数组结果:', result);
    })
    .catch(error => {
        console.log('空数组错误:', error);
    });

