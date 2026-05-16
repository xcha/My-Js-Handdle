var http = require("http");

// 配置请求选项，连接到 http.js 监听的 3001 端口
const options = {
  hostname: "localhost",
  port: 3000,
  path: "/",
  method: "GET",
};

// 发起请求
const req = http.request(options, (res) => {
  let data = "";

  console.log(`状态码: ${res.statusCode}`);
  console.log(`响应头: ${JSON.stringify(res.headers)}`);

  // 接收数据块
  res.on("data", (chunk) => {
    data += chunk;
  });

  // 数据接收完毕
  res.on("end", () => {
    console.log("响应内容:");
    console.log(data);
  });
});

// 处理错误
req.on("error", (e) => {
  console.error(`请求遇到问题: ${e.message}`);
});

// 结束请求
req.end();
