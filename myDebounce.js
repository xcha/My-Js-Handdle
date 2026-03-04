/** 手写防抖
 * 用法：函数在 n 秒后再执行，如果 n 秒内被触发，重新计时，保证最后一次触发事件 n 秒后才执行。
 * 思路：
 *  1、保存一个变量 timer
 *  2、返回一个闭包函数 函数内判断一下 timer 是否有值
 *    2.1、如果有值 说明 定时器已经开启 需要将定时器清空
 *  3、设置定时器 等待 wait 后执行 将定时器赋值给 timer 记录
 *  4、通过 apply 执行函数 传入 arguments
 * @param {*} fn
 * @param {*} wait
 * @param {boolean} [immediate=false]
 * @return {*}
 */
function debounce(fn, wait, immediate = false) {
  let timer = null;

  return function () {
    // 存在定时器 清空
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    // 立即执行
    if (immediate) {
      // 判断是否执行过  如果执行过 timer 不为空
      const flag = !timer;
      // 执行函数
      flag && fn.apply(this, arguments);
      // n 秒后清空定时器
      timer = setTimeout(() => {
        timer = null;
      }, wait);
    } else {
      timer = setInterval(() => {
        fn.apply(this, arguments);
      }, wait);
    }
  };
}

function mydebounce(fn, wait) {
  let timer = null;
  return function (...args) {
    // 1. 无论是否存在定时器，都先清理掉之前的
    if (timer) {
      clearTimeout(timer);
    }

    // 2. 重新设置定时器
    timer = setTimeout(() => {
      // 3. 执行函数，注意 apply 的参数是数组，或者直接使用 ...args 配合 call
      fn.apply(this, args);
      // 4. 执行完后清理定时器变量
      timer = null;
    }, wait);
  };
}

function debounceImmediate(fn, delay) {
  let timer;
  return function (...args) {
    const callNow = !timer;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
    }, delay);
    if (callNow) fn.apply(this, args);
  };
}

function de(fn, wait = 300) {
  let timer;
  return function (...args) {
    const callNow = !timer; //当timer为null 即不存在计时器 代表可以执行函数
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null; //计时结束 可以执行
    }, wait);
    if (callNow) fn.apply(this, args);
  };
}

// 使用场景
searchInput.addEventListener(
  "input",
  debounce((e) => {
    console.log("搜索:", e.target.value);
  }, 300),
);
