// Q1: 和 race 区别？→ 有任意一个成功的就成功，全失败才失败
// Q2: 全失败返回什么？→ AggregateError

Promise.myAny = function (promises) {
  return new Promise((resolve, reject) => {
    const errors = [];
    let rejected = 0;

    const arr = Array.from(promises);

    arr.forEach((p, i) => {
      Promise.resolve(p)
        .then(resolve)
        .catch((reason) => {
          errors[i] = reason;
          if (++rejected === arr.length) {
            reject(errors);
          }
        });
    });
  });
};

// 测试
Promise.myAny([Promise.reject(1), Promise.resolve(2)]).then(console.log); // 2
Promise.myAny([Promise.reject(1), Promise.reject(2)]).catch(console.log); // [1,2]
