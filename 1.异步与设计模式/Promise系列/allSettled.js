// Q1: 和 all 区别？→ 不管成功失败，等全部完成
// Q2: 返回格式？→ { status: 'fulfilled'|'rejected', value|reason }

Promise.myAllSettled1 = function (promises) {
  return new Promise((resolve) => {
    const arr = Array.from(promises);
    let cnt = 0;
    const res = [];

    arr.forEach((p, i) => {
      Promise.resolve(p)
        .then((value) => (res[i] = { status: "fulfilled", value }))
        .catch((reason) => (res[i] = { status: "rejected", reason }))
        .finally(() => {
          if (++cnt === arr.length) resolve(res);
        });
    });
  });
};

// 测试
Promise.myAllSettled1([Promise.resolve(1), Promise.reject("err")]).then(
  console.log,
); // [{status:'fulfilled',value:1}, {status:'rejected',reason:'err'}]
