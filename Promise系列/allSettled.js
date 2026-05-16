Promise.myAllSettled = function (promises) {
  return new Promise((resolve) => {
    const results = [];
    let finished = 0;
    const arr = Array.from(promises);

    if (arr.length === 0) return resolve([]);

    arr.forEach((p, i) => {
      Promise.resolve(p)
        .then(
          (value) => {
            results[i] = { status: "fulfilled", value };
          },
          (reason) => {
            results[i] = { status: "rejected", reason };
          },
        )
        .finally(() => {
          if (++finished === arr.length) resolve(results);
        });
    });
  });
};

// 测试
Promise.myAllSettled([Promise.resolve(1), Promise.reject("err")]).then(
  console.log,
); // [{status:'fulfilled',value:1}, {status:'rejected',reason:'err'}]
