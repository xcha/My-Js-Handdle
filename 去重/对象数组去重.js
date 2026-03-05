const arr = [
  { a: 1 },
  { a: 1 },
  { a: 1, b: 2 },
  { a: 123, b: 321 },
  { a: 123, b: 321 },
  { a: [1, 2, 3] },
  { a: [1, 2, 3] },
  { a: [1, 2, 3] },
];
// 说明：
// - Set 对象比较的是“引用是否相同”，即使两个对象的 key/value 完全一致，也被视为不同引用
// - 因此无法直接用 Set 对对象数组去重
// - 解决思路：自定义“相等”判断（键集合一致且对应值全等/递归相等），再用遍历实现去重

// 对像数组 不起效果
// function unique(arr) {
//   arr = [...new Set(arr)];
//   console.log(arr);
// }

// 使用传统写法：遍历原数组，用 res 存放已出现过的“等价对象”
const isObject = (val) => typeof val === "object" && val != null;
function equals(val1, val2) {
  // 任一不是对象（含原始值），直接用全等判断
  if (!isObject(val1) || !isObject(val2)) return val1 === val2;

  // 数组与对象类型不同则不等
  const isArr1 = Array.isArray(val1);
  const isArr2 = Array.isArray(val2);
  if (isArr1 !== isArr2) return false;

  // 数组：按顺序逐项递归比较
  if (isArr1) {
    if (val1.length !== val2.length) return false;
    for (let i = 0; i < val1.length; i++) {
      if (!equals(val1[i], val2[i])) return false;
    }
    return true;
  }

  // 普通对象：键集合一致且对应值递归相等
  const keys1 = Object.keys(val1);
  const keys2 = Object.keys(val2);
  if (keys1.length !== keys2.length) return false;
  for (const key of keys1) {
    if (!Object.prototype.hasOwnProperty.call(val2, key)) return false;
    if (!equals(val1[key], val2[key])) return false;
  }
  return true;
}

function unique(arr) {
  // res 用于存放去重后的结果
  const res = [];
  for (const item of arr) {
    // 对于当前 item，检查 res 中是否存在“等价对象”
    let isFind = false;
    for (const r of res) {
      if (equals(item, r)) {
        isFind = true;
        break;
      }
    }
    // 未找到等价项则加入结果
    if (!isFind) res.push(item);
  }
  return res;
}

console.log(unique(arr));
