function getlength(args: { length: number }) {
  return args.length;
}
console.log(getlength("aaaa"));
// console.log(getlength(["abc", "cba", "nba"]));

let info = {
  length: 123,
};
getlength(info);
