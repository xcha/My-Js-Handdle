function main(obj) {
  if (typeof obj !== "object") {
    return 0;
  }

  let ans = 0;

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 尝试递归
      const childDepth = main(obj[key]);
      // 看是原本那个递归长 还是这个新的递归长
      ans = Math.max(ans, childDepth);
      console.log(key, ans);
    }
  }
  return ans + 1;
}
//判断是不是对象 （设置ans=0）尝试递归（并且在每次递归时检查哪条递归线大）最后更新这条递归线+1
const a = { b: { c: { d: {} }, e: { f: { g: {} } } } };
console.log(main(a));
