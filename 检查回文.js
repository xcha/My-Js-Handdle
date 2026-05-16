function hw(str) {
  if (str.length <= 1) {
    return true;
  }
  if (str[0] !== str[str.length - 1]) {
    return false;
  }

  return hw(str.slice(1, -1));
}
let str = "123321";
console.log(hw(str));
console.log(str);
