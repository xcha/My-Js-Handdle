const arr = [5, 4, 3, 2, 1];

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return;

  const pivotIndex = partition(arr, left, right);

  quickSort(arr, left, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, right);
}

function partition(arr, left, right) {
  // 选择最右边的元素作为基准
  const pivot = arr[right];
  let i = left; // i 指向小于基准的区域边界

  for (let j = left; j < right; j++) {
    if (arr[j] <= pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }

  // 把基准放到正确位置
  [arr[i], arr[right]] = [arr[right], arr[i]];
  return i;
}
quickSort(arr);
console.log(arr);
