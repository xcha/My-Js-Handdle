const arr = [1, 2, 2, 3, 3, 4, 5, 5];

const unique = [...new Set(arr)];
console.log(unique); // [1, 2, 3, 4, 5]

const unique2 = Array.from(new Set(arr));
console.log(unique2); // [1, 2, 3, 4, 5]

const unique3 = arr.reduce((acc, cur) => {
  if (!acc.includes(cur)) acc.push(cur);
  return acc;
}, []);
console.log(unique3); // [1, 2, 3, 4, 5]
