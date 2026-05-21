// Q1: 什么场景？→ 10个请求，同时最多跑3个
// Q2: 怎么控制？→ 维护 executing 池，满了就等
// Q3: 怎么等？→ Promise.race 等最快完成的
// Q4: 完成后？→ 从池子删掉，继续下一个

async function main(tasks, limit) {
  // 存储所有任务的结果（按索引顺序）
  const res = [];

  // 存储正在执行的任务的 Set 集合
  // 使用 Set 而不是数组，因为删除元素更方便
  const taskq = new Set();

  // 任务总数
  const len = tasks.length;

  // 遍历所有任务
  for (let i = 0; i < len; i++) {
    // 创建一个立即执行的异步函数（IIFE）
    const taskPromise = (async () => {
      try {
        // 执行第 i 个任务，等待结果
        const value = await tasks[i]();
        // 成功：记录结果和状态
        res[i] = { status: "ful", value };
      } catch (reason) {
        // 失败：记录错误和状态
        res[i] = { status: "rej", value: reason }; // 注意：这里应该是 reason
      } finally {
        // 关键：无论成功还是失败，完成后从执行队列中删除
        taskq.delete(taskPromise);
      }
    })();

    // 将当前任务加入执行队列
    taskq.add(taskPromise);

    // 核心：当正在执行的任务数达到限制时
    if (taskq.size >= limit) {
      // 等待任意一个任务完成（race 竞争）
      await Promise.race(taskq);
      // 注意：race 完成后，taskq 中已经删除了完成的任务
      // 所以循环会继续，添加新任务
    }
  }

  // 所有任务已经入队并处理了 除了最后一个任务还未完成
  // 处理最后一个任务
  await Promise.all(taskq);
  return res;
}

// 测试
// 测试任务：模拟异步请求，打印开始/结束时间
const createTasks = () =>
  [1, 2, 3, 4, 5].map((n) => () => {
    return new Promise((resolve) => {
      console.log(`任务${n}开始 - ${Date.now() % 10000}ms`);
      setTimeout(() => {
        resolve(n);
        console.log(`任务${n}完成 - ${Date.now() % 10000}ms`);
      }, 1000);
    });
  });

// 测试1：async + Promise.race
console.log("--- 测试 concurrent ---");
main(createTasks(), 2).then((res) => {
  console.log("结果:", res); // [1,2,3,4,5]
});

// console.log(createTasks());
