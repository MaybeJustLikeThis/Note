/**
 * 模块会被node读取, webpack跑在node上
 */
const path = require("path");

module.exports = {
  mode: "development",
  devtool: false,
  entry: {
    index: { import: "./src/index.js", runtime: "common-runtime" },
  },
  output: {
    clean: true,
    filename: "[name].js",
    path: path.resolve(__dirname, "./build"),
  },
};
