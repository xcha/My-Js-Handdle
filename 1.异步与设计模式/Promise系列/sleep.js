// Q1: sleep 干嘛？→ 等待指定时间
// Q2: 怎么实现？→ Promise + setTimeout

// resolve 的作用不是"传值"，而是发出"完成"的信号。即使不传参数，这个信号也至关重要，否则 Promise 永远不会结束。
const sleep = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
};

async function main() {
  console.log("开始");
  await sleep(1000);
  console.log("结束");
}

main();
