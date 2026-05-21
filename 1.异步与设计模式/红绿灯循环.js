// Q1: 需求？→ 红3s → 绿2s → 黄1s → 循环
// Q2: 怎么串行？→ async/await 或 Promise 链
// Q3: 怎么循环？→ 递归或 while(true)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function trafficLight() {
  while (true) {
    console.log("🔴 红灯");
    await sleep(3000);
    console.log("🟢 绿灯");
    await sleep(2000);
    console.log("🟡 黄灯");
    await sleep(1000);
  }
}

// Promise 链版
function trafficLightV2() {
  const light = (color, ms) => () => {
    console.log(color);
    return sleep(ms);
  };

  Promise.resolve()
    .then(light("🔴 红灯", 3000))
    .then(light("🟢 绿灯", 2000))
    .then(light("🟡 黄灯", 1000))
    .then(trafficLightV2); // 递归循环
}

trafficLight();
