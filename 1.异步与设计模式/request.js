// 多个模块可能同时请求同一接口，需要避免重复请求并缓存结果，同时对慢请求做超时保护。
function createRequest() {
  const cache = {}; // 缓存
  const pending = {}; // 正在处理的

  function request(key, api, timeout = 3000) {
    if (key in cache) return Promise.resolve(cache[key]);
    if (key in pending) return pending[key];

    const p = Promise.race([
      api(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("timeout")), timeout),
      ),
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
  return fetch("https://jsonplaceholder.typicode.com/todos/1").then((res) =>
    res.json(),
  );
}

function getSlowTodo() {
  return fetch("https://httpbin.org/delay/5").then((res) => res.json());
}

// 1. 并发去重：3 次同时请求同一个 key，只会真的发 1 次
Promise.all([
  request("todo-1", getTodo),
  request("todo-1", getTodo),
  request("todo-1", getTodo),
]).then((res) => {
  console.log("并发结果:", res);
});

// 2. 缓存命中：等上面完成后，再请求同一个 key，直接走缓存
setTimeout(() => {
  request("todo-1", getTodo).then((res) => {
    console.log("缓存结果:", res);
  });
}, 1500);

// 3. 超时保护：这个接口会延迟 5 秒，这里只给 2 秒超时
request("slow-1", getSlowTodo, 2000)
  .then((res) => {
    console.log("慢请求结果:", res);
  })
  .catch((err) => {
    console.log("慢请求报错:", err.message);
  });
