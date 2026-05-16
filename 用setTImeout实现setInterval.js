function mySetInterval(callback, delay) {
  let timerId; // 存储当前的 timerId
  // 递归函数：执行任务并设置下一个定时器
  function tick() {
    // 执行用户传入的任务
    callback();
    // 任务执行完毕后，再启动下一个定时器
    timerId = setTimeout(tick, delay);
  }

  // 启动第一个定时器
  timerId = setTimeout(tick, delay);

  // 返回一个清理函数，用于停止循环 调用一次 清除最后一个定时器
  return function clear() {
    clearTimeout(timerId);
  };
}

// 使用示例 设置循环器的fn和delay 只调用一次
// stop 接收的是mySetInterval返回的清理函数
const stop = mySetInterval(() => {
  console.log("执行任务");
}, 1000);

// 5秒后停止
setTimeout(() => {
  stop();
  console.log("已停止");
}, 5000);
