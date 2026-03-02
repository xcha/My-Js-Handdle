/**
 * 手写 Promise (遵循 Promise/A+ 规范)
 */

// 定义三种状态
const PENDING = 'pending';// 等待
const FULFILLED = 'fulfilled';// 成功
const REJECTED = 'rejected';// 失败

class MyPromise {
  constructor(executor) {// 执行器
    // 初始状态为 pending
    this.status = PENDING;
    // 成功后的值
    this.value = undefined;
    // 失败后的原因
    this.reason = undefined;

    // 成功回调队列
    this.onResolvedCallbacks = [];
    // 失败回调队列
    this.onRejectedCallbacks = [];

    // resolve 函数
    const resolve = (value) => {
      // 只有状态为 pending 时才能转变状态
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // 执行所有成功回调
        this.onResolvedCallbacks.forEach(fn => fn());
      }
    };

    // reject 函数
    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        // 执行所有失败回调
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    // 立即执行执行器，并捕获异常
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  // then 方法
  then(onFulfilled, onRejected) {
    // 参数可选，如果不传则值透传
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;// 成功回调
    onRejected = typeof onRejected === 'function' ? onRejected : err => { throw err };// 失败回调

    // 为了实现链式调用，返回一个新的 Promise
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULFILLED) {
        // 使用 microtask 模拟异步执行
        queueMicrotask(() => {
          try {
            const x = onFulfilled(this.value);
            // 核心逻辑：处理返回值 x
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }

      if (this.status === REJECTED) {
        queueMicrotask(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      }

      if (this.status === PENDING) {
        // 如果是 pending 状态，先存入回调数组
        this.onResolvedCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });

        this.onRejectedCallbacks.push(() => {
          queueMicrotask(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });

    return promise2;
  }
}

/**
 * 核心：Promise 解决程序 (The Promise Resolution Procedure)
 * 处理 then 的返回值 x，决定 promise2 的状态
 */
function resolvePromise(promise2, x, resolve, reject) {
  // 1. 防止循环引用
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise'));
  }

  // 2. 如果 x 是对象或函数
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    let called = false; // 防止多次调用
    try {
      const then = x.then;
      if (typeof then === 'function') {
        // 如果 x 有 then 方法，认为它是 Promise，执行它
        then.call(x, y => {
          if (called) return;
          called = true;
          // 递归解析 y (因为 y 可能还是一个 Promise)
          resolvePromise(promise2, y, resolve, reject);
        }, r => {
          if (called) return;
          called = true;
          reject(r);
        });
      } else {
        // 普通对象，直接 resolve
        resolve(x);
      }
    } catch (e) {
      if (called) return;
      called = true;
      reject(e);
    }
  } else {
    // 3. 如果 x 是普通值，直接 resolve
    resolve(x);
  }
}

// 导出模块（用于测试）
module.exports = MyPromise;
