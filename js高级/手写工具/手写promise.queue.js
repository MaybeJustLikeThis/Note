Promise.queue = function (promiseFunctions) {
  return promiseFunctions.reduce((promise, promiseFunction) => {
    return promise.then((results) => {
      return promiseFunction().then((result) => results.concat(result));
    });
  }, Promise.resolve([]));
};
Promise.queue([
  () => Promise.resolve(1),
  () => Promise.resolve(2),
  () => Promise.resolve(3),
])
  .then((values) => {
    console.log(values); // [1, 2, 3]
  })
  .catch((err) => {
    console.error(err);
  });
