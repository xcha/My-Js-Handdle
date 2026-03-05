const arr = [1, 2, 2, 3, 3, 4, 5, 5];
const unique = [...new Set(arr)];
console.log(unique); // [1, 2, 3, 4, 5]

// 或者
const unique2 = Array.from(new Set(arr));
