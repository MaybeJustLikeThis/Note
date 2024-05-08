function createObject(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}

function inherit(subtype, supertype) {
  subtype.prototype = Object.createObject(supertype.prototype);
  Object.defineProperty(subtype.prototype, "constructor", {
    enumerable: false, //构造器函数最好不要遍历
    configurable: true,
    writable: true,
    value: subtype,
  });
}
