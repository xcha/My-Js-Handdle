class Axios {
  constructor() {}
  request(config) {
    return new Promise((resolve) => {
      const { url = "", method = "get", data = {} } = config;
      // 发送ajax请求
      const xhr = new XMLHttpRequest();
      xhr.open(method, url, true);
      xhr.onload = function () {
        console.log(xhr.responseText);
        resolve(xhr.responseText);
      };
      xhr.send(data);
    });
  }
}

// 最终导出axios的⽅法，即实例的request⽅法
function CreateAxiosFn() {
  let axios = new Axios();
  let req = axios.request.bind(axios);
  return req;
}
// 得到最后的全局变量axios
let axios = CreateAxiosFn();
