/**
 * 输入
 * {
  first_name: "John",
  last_name: "Doe",
  address: {
    street_name: "123 Main St",
    city_name: "City",
    state_code: "STX"
  }
}
 * 
 * 输出
 * {
  "firstName": "John",
  "lastName": "Doe",
  "address": {
    "streetName": "123 Main St",
    "cityName": "City",
    "stateCode": "STX"
  }
}
*/

function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
}

function main(data) {
  if (Array.isArray(data)) {
    return data.map((obj) => main(obj));
  }

  if (data !== null && typeof data === "object") {
    const res = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const camelKey = toCamelCase(key);
        res[camelKey] = main(data[key]);
      }
    }
    return res;
  }
  return data;
}

// function convertKeysToCamelCase(data) {
//   // 处理数组
//   if (Array.isArray(data)) {
//     return data.map((item) => convertKeysToCamelCase(item));
//   }

//   // 处理对象
//   if (data !== null && typeof data === "object") {
//     const result = {};
//     for (const key in data) {
//       if (data.hasOwnProperty(key)) {
//         const camelKey = toCamelCase(key);
//         result[camelKey] = convertKeysToCamelCase(data[key]);
//       }
//     }
//     return result;
//   }

//   // 基础类型直接返回
//   return data;
// }

// 测试
const jsonData = {
  first_name: "John",
  last_name: "Doe",
  address: {
    street_name: "123 Main St",
    city_name: "City",
    state_code: "STX",
  },
  sz: [
    {
      name_name: "",
      age_age: "",
    },
    {
      name_name: "",
      age_age: "",
    },
  ],
};

const result = main(jsonData);
console.log(JSON.stringify(result, null, 2));
