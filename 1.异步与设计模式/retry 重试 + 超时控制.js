// Q1: retry 怎么实现？→ 失败就递归，次数减一
// Q2: 超时怎么控制？→ Promise.race([请求, 超时Promise])
// Q3: 带延迟？→ 失败后 setTimeout 再重试

// 用户调用 retry(fn)
//         ↓
//    尝试执行 fn
//         ↓
//    ┌─────────────┐
//    │ 是否成功？   │
//    └─────────────┘
//         ↓
//     成功 → 返回结果 ✅
//         ↓
//     失败 → 还有重试次数吗？
//         ↓
//     有 → 等待一段时间 → 回到"尝试执行" 🔄
//         ↓
//     无 → 抛出错误 ❌

// 基础 retry
async function retry(fn, times) {
  for (let i = 0; i <= times; i++) {
    try {
      return await fn(); // 尝试执行
    } catch (error) {
      // 失败了？继续循环，再来一次
      console.log(`第${i + 1}次失败，继续重试`);
    }
  }
  throw new Error("全部失败");
}

// 工具函数
const sleep = (ms) => {
  return new Promise((r) => setTimeout(r, ms));
};

function timeout(fn, timeout = 1000) {
  return Promise.race([
    fn(),
    new Promise((_, rej) => {
      setTimeout(() => {
        rej(new Error("操作超时"));
      }, timeout);
    }),
  ]);
}

async function tryWithDelay(fn, times, delay = 1000) {
  for (let i = 1; i <= times; i++) {
    try {
      return await fn();
    } catch (err) {
      console.log(`❌ 第 ${i}/${times} 次失败: ${err.message}`);
      if (i === times) break;
      if (delay) {
        await sleep(delay);
      }
    }
  }
  throw new Error(`重试 ${times} 次后失败`);
}

function main(fn, times, delay, timeout) {
  return tryWithDelay(() => timeout(fn, timeout), times, delay);
}

// 修正后的 test 函数
const test = () => {
  let cnt = 0;
  return () => {
    return new Promise((resolve, reject) => {
      cnt++;
      console.log(`第 ${cnt} 次执行`);
      if (cnt < 3) reject(new Error("失败"));
      else resolve("成功");
    });
  };
};

const fn1 = test();
main(fn1, 3, 1000, 1000)
  .then((result) => console.log("最终结果:", result))
  .catch((error) => console.error("最终失败:", error.message));
