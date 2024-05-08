//数组
let names = ["abc", "cba", "nba"];
console.log(names);

//对象
let info = {
  name: "why",
  age: 13,
};

type InfoType = {
  name: string;
  age: number;
};

let infos: InfoType = {
  name: "why",
  age: 12,
};

//函数
//
function sum(num1: number, num2: number): number {
  return num1 + num2;
}

