const map = new Map();

map.set(111, 222);
var get = map.get(111);
console.log(get);

map.set(111, map.get(111) + 1);
var get2 = map.get(111);

var has = map.has(111);

console.log(get2);
console.log(has);
