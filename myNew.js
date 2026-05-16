/** 手写 new 操作符
 * 用法：创建一个实例化对象
 * 思路：
 *  1、判断传入的 fn 是否为 function
 *  2、创建一个空对象
 *  3、将这个空对象的原型设置为构造函数的 prototype 属性。
 *  4、使用 apply 执行构造函数 并传入参数 arguments 获取函数的返回值
 *  5、判断这个返回值 如果返回的是 Object || Function 类型 就返回该对象 否则返回创建的对象
 * @param {Function} fn 构造函数
 * @return {*}
 */

function myNew(fn, ...agrs) {
  if (typeof fn !== "function") {
    throw new TypeError("fn must be a function");
  }

  let obj = Object.create(fn.prototype); //创建一个新对象，继承fn的原型对象
  // 等价 obj.__proto__ = fn.prototype;
  let res = fn.apply(obj, agrs); //调用fn函数，将obj作为this，agrs作为参数

  const flag = res instanceof Object; //判断fn是否返回一个对象

  if (flag) {
    //如果返回一个对象，就返回这个对象
    return res;
  }
  return obj; //否则返回新对象
}

function myNew1(fn, ...args) {
  if (typeof fn !== "function") {
    throw new TypeError("fn must be a function");
  }

  let obj = Object.create(fn.prototype);

  let res = fn.apply(obj, args);

  return res instanceof Object ? res : obj;
}

const Person = function (name, age) {
  this.name = name;
  this.age = age;
};
Person.prototype.say = function () {
  console.log(this.name);
};

const p = myNew1(Person, "张三", 18);
p.say();
