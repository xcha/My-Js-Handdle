// Q1: all 干嘛？→ 全部成功才成功，一个失败就失败
// Q2: 怎么知道全部完成？→ 计数器 finished === total
// Q3: 结果顺序？→ results[index] 按索引存
Promise.myAll = function (promises) {
  // 1. 返回一个新的 Promise
  return new Promise((resolve, reject) => {
    // 2. 存储结果和完成计数
    const results = [];
    let finished = 0;

    // 3. 将输入转换为真正的数组（处理类数组对象）
    const arr = Array.from(promises);

    // 4. 遍历每个 promise
    arr.forEach((p, i) => {
      // 5. 确保 p 是 promise（如果不是会被包装）
      Promise.resolve(p)
        .then(
          // 成功回调
          (value) => {
            results[i] = value; // 按原顺序存储结果
            finished++; // 完成计数 +1
            if (finished === arr.length) {
              resolve(results); // 所有都完成，整体 resolve
            }
          },
          // 失败回调（任何一个失败，整体 reject）
        )
        .catch(reject);
    });
  });
};

// 测试
Promise.myAll([Promise.resolve(1), Promise.resolve(2), 3]).then(console.log); // [1,2,3]
Promise.myAll([Promise.resolve(1), Promise.reject("err")]).catch(console.log); // 'err'
