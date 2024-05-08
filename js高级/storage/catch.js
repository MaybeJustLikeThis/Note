class Catch {
  constructor(islocal = true) {
    this.storage = islocal ? localStorage : sessionStorage;
  }
  setCache(key, value) {
    if (!value) {
      throw new Error("value error: value必须有值!");
    }
    this.storage.setItem(key, JSON.stringify(value));
  }
  getCache(key) {
    const result = this.storage.getItem(key);
    if (result) {
      return JSON.parse(result);
    }
  }
  removeCache(key) {
    this.storage.removeItem(key);
  }
  clear() {
    this.storage.clear();
  }
}
const localCache = new Catch();
const sessionCache = new Catch(false);//类封装的好处
