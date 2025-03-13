//手写Promise.race
function myPromiseRace(promises) {
  return new Promise((reslove, reject) => {
    promises.forEach((item) => {
      item.then(
        (res) => {
          reslove(res);
        },
        (err) => {
          reject(err);
        }
      );
    });
  });
}
