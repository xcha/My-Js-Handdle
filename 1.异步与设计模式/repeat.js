// 实现 repeat 函数，间隔指定时间重复执行指定次数
// 让外部能知道 repeat 什么时候全部执行完
// 让每次执行可以等待异步任务完成
// 让同步函数和异步函数用同一套逻辑处理
// 执行出错时可以通过 reject 抛给调用方
function repeat(fn, times, interval) {
  return function (...args) {
    const context = this; // 如果不绑定， 下面的case的对象调用在严格模式下就是undifined
    let count = 0;

    return new Promise((resolve, reject) => {
      if (times <= 0) {
        resolve();
        return;
      }

      function run() {
        Promise.resolve() // 这里不放fn原因是如果同步报错就会导致外部无法catch它
          .then(() => fn.apply(context, args))
          .then(() => {
            count++;
            if (count >= times) {
              resolve();
              return;
            }
            setTimeout(run, interval);
          })
          .catch(reject);
      }

      setTimeout(run, interval);
    });
  };
}

const obj = {
  name: "Jerry",
  say(prefix) {
    console.log(prefix + this.name);
  },
};
obj.repeatSay = repeat(obj.say, 3, 1000);
obj.repeatSay("Hi ").then(() => console.log("执行完毕"));
