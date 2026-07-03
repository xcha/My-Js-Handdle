const { resolve } = require("dns");

function createRequest() {
  const cache = {};
  const pending = {};

  function request(key, api, timeout = 3000) {
    if (key in cache) return Promise.resolve(cache[key]);
    if (pending[key]) return pending[key];

    const p = Promise.race([
      api(),
      new Promise((_, reject) => {
        setTimeout(() => reject(new Error("timeout")), timeout);
      }),
    ])
      .then((res) => {
        cache[key] = res;
        return res;
      })
      .finally(() => {
        delete pending[key];
      });
    pending[key] = p;
    return p;
  }
  return request;
}

const request = createRequest();

function getTodo() {
  return fetch("https://jsonplaceholder.typicode.com/todos/1").then((res) => {
    return res.json();
  });
}

function sleep(delay) {
  return new Promise((resolve) => setTimeout(resolve, delay));
}

async function getSlowTodo() {
  await sleep(1500); // 等待 1.5 秒
  const res = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  return res.json();
}

Promise.all([
  request("todo-1", getTodo),
  request("todo-1", getTodo),
  request("todo-1", getTodo),
]).then((res) => {
  console.log("并发结果:", res);
});

setTimeout(() => {
  request("todo-1", getTodo).then((res) => {
    console.log("缓存结果:", res);
  });
}, 1500);

request("slow", getSlowTodo, 2000)
  .then((res) => {
    console.log("慢请求结果:", res);
  })
  .catch((err) => {
    console.log("慢请求报错:", err.message);
  });
