const arr = [5, 4, 3, 2, 1];

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left >= right) return;

  const pivotIndex = partition(arr, left, right);

  quickSort(arr, left, pivotIndex - 1);
  quickSort(arr, pivotIndex + 1, right);
}

function partition(arr, left, right) {
  // 选择最左边的元素作为基准
  const pivot = arr[left];
  let i = left + 1; // 左指针从基准下一个开始
  let j = right; // 右指针从最右开始

  while (i <= j) {
    // 从左找到第一个大于基准的元素
    while (i <= j && arr[i] <= pivot) i++;
    // 从右找到第一个小于基准的元素
    while (i <= j && arr[j] > pivot) j--;

    if (i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  // 把基准放到正确位置（j 指向最后一个小于基准的元素）
  [arr[left], arr[j]] = [arr[j], arr[left]];
  return j;
}

function fn1(arr, l = 0, r = arr.length - 1) {
  if (l >= r) {
    return;
  }

  const idx = fn2(arr, l, r);

  fn1(arr, l, idx - 1);
  fn1(arr, idx + 1, r);
}

function fn2(arr, l, r) {
  const pivot = arr[l];
  let i = l + 1;
  let j = r;

  while (i <= j) {
    while (i <= j && arr[i] < pivot) i++;
    while (i <= j && arr[j] > pivot) j--;

    if (i < j) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[l], arr[j]] = [arr[j], arr[l]];
  return j;
}

fn1(arr);
console.log(arr); // [1, 2, 3, 4, 5]
