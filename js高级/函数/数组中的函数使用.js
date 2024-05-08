var nums = [10, 5, 11, 100, 55];
var newNums = [];
for (var i = 0; i < nums.length; i++) {
  var num = nums[i];
  if (num % 2 === 0) {
    newNums.push(num);
  }
}
console.log(newNums);

//函数  ==  方法
//filter  过滤
var newNums = nums.filter((item, index, initialarr) => {
  return item % 2 === 0;
});
console.log(newNums);

//map:映射;
var newNums2 = nums.map((item) => {
  return item * 10;
});
console.log(newNums2);

//forEach: 迭代
nums.forEach((item) => {
  console.log(item);
});

//find/findIndex
//es6~12
{
  var item = nums.find((item) => {
    return item === 11;
  });
  console.log(item);

  var friends = [
    { name: "why", age: 10 },
    { name: "bbb", age: 20 },
    { name: "aaa", age: 30 },
  ];

  const findFriend = friends.find((item) => {
    return item.name === "aaa";
  });
  console.log(findFriend);

  var friendIndex = friends.findIndex((item) => {
    return item.name === "aaa";
  });
  console.log(friendIndex);
}

//reduce ：累加
var total = nums.reduce((preBackValue, item) => {
  return preBackValue + item;
}, 0); //initialValue
console.log(total);
