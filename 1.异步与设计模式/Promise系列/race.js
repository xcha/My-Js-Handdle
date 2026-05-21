// 推导链
// Q1: race 干嘛？→ 谁先完成用谁（无论成功失败）
// Q2: 怎么实现？→ 每个都 .then(resolve, reject)，第一个触发后状态锁定
Promise.myRace = function (promises) {
  return new Promise((resolve, reject) => {
    const arr = Array.from(promises);

    arr.forEach((p) => {
      Promise.resolve(p).then(resolve).catch(reject);
    });
  });
};

// 测试
Promise.myRace([
  new Promise((r) => setTimeout(() => r("slow"), 200)),
  new Promise((r) => setTimeout(() => r("fast"), 100)),
  // Promise.resolve((r) => setTimeout(() => r("fast1"), 200)),
]).then((res) => console.log(res));
