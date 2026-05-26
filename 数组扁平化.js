let arr = [1, 2, 3, [4, 5, [6]]];

function flatten(arr) {
  return arr.flat(Infinity);
}

function flatten2(arr) {
  let newArr = [];

  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      newArr = newArr.concat(flatten2(arr[i]));
    } else {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

function flatten(arr) {
  return arr.reduce((pre, cur) => {
    // 如果是数组，递归并 concat；否则直接 concat 元素
    return pre.concat(Array.isArray(cur) ? flatten(cur) : cur);
  }, []);
}

function f1(arr){
    return arr.reduce((pre,cur)=>{
        return pre.concat(Array.isArray(cur)?f1(cur):cur)
    })
}