function cmp(v1, v2) {
  const arr1 = v1.split(".");
  const arr2 = v2.split(".");
  const maxLen = Math.max(arr1.length, arr2.length);

  for (let i = 0; i < maxLen; i++) {
    const num1 = arr1[i] || 0; // 没有的段补 0
    const num2 = arr2[i] || 0;

    if (num1 !== num2) {
      return num1 - num2; // 返回差值，而不是布尔值
    }
  }
  return 0; // 完全相等
}

function main(data) {
  return [...data].sort(cmp);
}

const data = ["1.1.1", "1.2", "1", "1.0", "2.0"];
const res = main(data);
console.log(res);
// 输出：["1", "1.0", "1.1.1", "1.2", "2.0"]
