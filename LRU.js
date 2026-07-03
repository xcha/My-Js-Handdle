//想象你有一摞书。
// get:把一本书(key)抽出来，放在最上面。
// put:放入一本新书。如果已经有这本书(key)，就把它抽出来放在最上面，并替换它的value。(例如把一本书的第二版替换成第三版)
// 如果没有这本书(key)，就放在最上面。
// 如果超过capacity本书，就把最下面的书移除。

// 使用双向链表实现

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map(); // Map 天然保持插入顺序
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    // 删除后重新插入，使其变为最新
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value) {
    // 如果 key 已存在，先删除
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    this.cache.set(key, value);

    // 超出容量，删除最早插入的（Map 的第一个元素）
    if (this.cache.size > this.capacity) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
  }
}
