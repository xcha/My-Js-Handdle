/**
 * 基础请求函数
 * @param {string} url - 请求地址
 * @param {object} options - 配置选项
 * @returns {Promise} 请求结果
 */
function request(url, options = {}) {
  const {
    method = "GET",
    headers = {},
    body = null,
    timeout = 30000,
  } = options;

  // 创建 AbortController 用于超时控制
  const controller = new AbortController();
  const { signal } = controller;

  // 设置超时
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeout);

  return fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
    body: body ? JSON.stringify(body) : null,
    signal,
  })
    .then((response) => {
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      // 根据 Content-Type 自动解析响应
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return response.json();
      }
      return response.text();
    })
    .catch((error) => {
      clearTimeout(timeoutId);

      if (error.name === "AbortError") {
        throw new Error("请求超时");
      }
      throw error;
    });
}

// V2
function createRequest() {
  const cache = {};
  const pending = {};

  function request(key, api, timeout = 3000) {
    if (key in cache) return Promise.resolve(cache[key]);
    if (pending[key]) return pending[key];

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
