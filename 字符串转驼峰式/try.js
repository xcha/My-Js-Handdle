function toCamel(str) {
  // 处理连续下划线：__a__b__ 等情况
  return str.replace(/_+([a-z])/gi, (_, char) => char.toUpperCase());
}
function main(data) {
  if (Array.isArray(data)) {
    return data.map((obj) => main(obj));
  }

  if (data !== null && typeof data === "object") {
    const res = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const camelKey = toCamel(key);
        res[camelKey] = main(data[key]);
      }
    }
    return res;
  }
  return data;
}

const data = {
  name_name: "name_name",
  age_age: "age_age",
  class_class: [
    {
      ma_ma: "",
      ch_ch: "",
    },
    {
      eng_eng: "",
    },
  ],
};

const result = main(data);
console.log(JSON.stringify(result, null, 2));
