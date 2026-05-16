var http = require("http");
var fs = require("fs");
var path = require("path");

const server = http
  .createServer(function (req, res) {
    console.log("收到请求：666");

    // 1. 修正路径：__dirname 不带末尾斜杠，直接加文件名会导致路径错误（如 ...node/index.html 变成 ...nodeindex.html）
    // 建议使用 path.join 自动处理斜杠
    var filePath = path.join(__dirname, "index.html");

    // 2. 检查文件是否存在
    if (fs.existsSync(filePath)) {
      res.writeHead(200, { "Content-Type": "text/html" });
      var myReadStream = fs.createReadStream(filePath, "utf-8");
      // pipe 会自动管理数据流并在读取结束时关闭响应，不要在 pipe 后面立即调用 res.end("...")
      myReadStream.pipe(res);
    } else {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 Not Found");
    }
  })
  .listen(3000, () => {
    console.log("服务器启动成功，监听端口：3000");
  });
