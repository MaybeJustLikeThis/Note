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
 
};
