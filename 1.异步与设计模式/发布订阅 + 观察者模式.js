// Q1: 发布订阅是什么？
// → 事件中心：on 订阅、emit 发布、off 取消
// → 发布者和订阅者不直接通信，通过事件中心
// Q2: 观察者模式区别？
// → 观察者直接订阅目标，目标直接通知观察者
// → 没有中间的事件中心
// Q3: 核心数据结构？
// → 发布订阅：{ eventName: [cb1, cb2] }
// → 观察者：observers: [observer1, observer2]

// 在你的 on 和 emit 方法最后加上 return this，意味着每次调用它们后，返回的都是 eventBus 实例本身。
// 这样你就可以紧接着调用这个实例的其他方法。

// 发布订阅
class EventEmitter {
  constructor() {
    this.events = {};
    // events = {
    //   click: [fn1, fn2, fn3],
    //   login: [fn4, fn5],
    //   logout: [fn6],
    // };
  }

  on(event, cb) {
    (this.events[event] ||= []).push(cb);
    return this;
  }

  emit(event, ...args) {
    (this.events[event] ||= []).forEach((cb) => cb(...args));
    return this;
  }

  off(event, cb) {
    this.events[event] = this.events[event].filter(
      (f) => f !== cb && f.raw !== cb, // 不是参数指定的cb并且这个没被once包装过的函数保留下来
    );
    return this;
  }

  once(event, cb) {
    const wrapper = (...args) => {
      cb(...args); // 执行一次
      this.off(event, wrapper); // 然后删掉
    };
    wrapper.raw = cb; // 保存原函数的引用（方便 off 时能找到）

    return this.on(event, wrapper);
  }
}

// 观察者模式
class Subject {
  constructor() {
    this.observers = [];
  }
  add(observer) {
    this.observers.push(observer);
    return this;
  }
  remove(observer) {
    this.observers = this.observers.filter((o) => o !== observer);
    return this;
  }
  notify(data) {
    this.observers.forEach((o) => o.update(data));
    return this;
  }
}

class Observer {
  constructor(name) {
    this.name = name;
  }
  update(data) {
    console.log(`${this.name} 收到: ${data}`);
  }
}

// 测试发布订阅
const bus = new EventEmitter();
bus.on("msg", console.log);
bus.emit("msg", "hello"); // 'hello'

// 测试观察者
const subject = new Subject();
const ob1 = new Observer("A");
const ob2 = new Observer("B");
subject.add(ob1).add(ob2).notify("更新了"); // A 收到: 更新了, B 收到: 更新了
