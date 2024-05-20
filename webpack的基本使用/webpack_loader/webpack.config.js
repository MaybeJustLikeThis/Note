/**
 * 模块会被node读取, webpack跑在node上
 */
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./build"),
  },
  module: {
    rules: [
      {
        //告诉webpack匹配什么文件
        test: /\.css$/,
        //use中多个loader的使用是从后向前的
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
    ],
  },
};
