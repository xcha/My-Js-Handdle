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
  // 是数组对象就递归 直到是普通对象
  if (Array.isArray(data)) {
    return data.map((obj) => main(obj));
  }
  // 针对对象的遍历
  if (data !== null && typeof data === "object") {
    const res = {};
    for (const key in data) {
      // 这个属性是该对象本身的 不是原型链继承来的
      if (data.hasOwnProperty(key)) {
        const camelKey = toCamelCase(key);
        // 处理完键名key 再去尝试递归这个值value（对象嵌套对象）
        res[camelKey] = main(data[key]);
      }
    }
    return res;
  }
  return data;
}

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
