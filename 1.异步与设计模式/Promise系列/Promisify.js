// Q1: 干嘛用？→ 把 callback 风格转成 Promise 风格
// Q2: callback 格式？→ fn(args..., (err, result) => {})
// Q3: 怎么转？→ 返回新函数，内部 new Promise 包装

function promisify(fn) {
  return (...args) =>
    new Promise((resolve, reject) => {
      fn(...args, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
}

function getOrders(userId, cb) {
  setTimeout(() => {
    if (!userId) return cb(new Error("userId 不能为空")); // 这里主动走 err 分支
    cb(null, [{ id: 1 }, { id: 2 }]);
  }, 100);
}

const getOrdersAsync = promisify(getOrders);

getOrdersAsync("") // 传空字符串，触发 err
  .then((res) => console.log("成功:", res))
  .catch((err) => console.error("失败:", err.message));
