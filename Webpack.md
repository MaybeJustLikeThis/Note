## Path

Mac os,linux,window 对于路径的分割是不一样的

- window 上会使用 \或者 '\ \\' 来作为文件路径的分隔符，当然目前也支持 /;
- 在 Mac OS、Linux 的 Unix 操作系统上使用/来作为文件路径的分隔符;

为了在不同的系统上开发 可以使用 path 模块

### 使用

- dirname：获取文件的父文件夹。这是一个路径操作函数，它返回给定路径的父文件夹的路径。拼写正确的方法是 `path.dirname()`。
- basename：获取文件名。这是一个路径操作函数，它返回给定路径的文件名部分（不包括父文件夹和扩展名）。拼写正确的方法是 `path.basename()`。
- extname：获取文件扩展名。这是一个路径操作函数，它返回给定路径的文件扩展名部分。拼写正确的方法是 `path.extname()`。
- 路径的拼接:`path.join()`
  如果我们希望将多个路径进行拼接，但是不同的操作系统可能使用的是不同的分隔符口 这个时候我们可以使用 path.join 函数;
- `path.resolve()`：将路径或路径片段解析为绝对路径。
- 这是一个路径操作函数，它将给定的路径序列从右向左进行处理，依次解析每个路径片段，直到构建出一个绝对路径。
- 如果在处理完所有路径片段后仍未生成绝对路径，则使用当前工作目录。
- 生成的路径将被规范化并删除尾部斜杠，同时忽略长度为零的路径片段。
- 如果没有传递路径片段，`path.resolve()` 将返回当前工作目录的绝对路径。

```js
console.log(path.resolve("./abc/cba", "../why/kobe", ",./abc.txt"));
```

`__dirname` 是当前文件的路径
`__filename` 是当前文件的路径

## webpack 是静态的模块化打包工具

webpack 的安装目前分为两个:`webpack`、`webpack-cli`
那么它们是什么关系呢?

- 执行 webpack 命令，会执行 node_modules 下的`.bin` 目下的 webpack;
- webpack 在执行时是依赖 webpack-cli 的，如果没有安装就会报错;
- 而 webpack-cli 中代码执行时，才是真正利用 webpack 进行编译和打包的过程;
- 所以在安装 webpack 时，我们需要同时安装 webpack-cli(第三方的脚手架事实上是没有使用 webpack-cli 的，而是类似于自 己的 vue-service-cli 的东西)

### webpack 的依赖图

webpack 到底是如何对我们的项目进行打包的呢?

- 事实上 webpack 在处理应用程序时，它会根据命令或者配置文件找到入口文件;
- 从入口开始，会生成一个 依赖关系图，这个依赖关系图会包含应用程序中所需的所有模块(比如.js 文件、css 文件、图片、字体等);
- 然后遍历图结构，打包一个个模块(根据文件的不同使用不同的 loader 来解析)

## loder 配置方式

配置方式表示的意思是在我们的 webpack.config.js 文件中明确写明配置信息。

使用 `module.rules` 允许我们配置多个 loader，因为我们可能需要使用不同的 loader 来加载不同类型的文件。

这种配置方式可以更好地表示 loader 的配置，也方便后期的维护，同时让你对各个 loader 有一个全局的概览。

在 webpack 配置中，`module.rules` 的配置如下：

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/, // 用于对资源进行匹配的正则表达式
        use: [
          {
            loader: "style-loader", // 必须的 loader，对应的值是一个字符串
          },
          {
            loader: "css-loader",
            options: {
              // 可选的属性，值是一个字符串或对象，会传递给 loader
            },
          },
        ],
      },
      // 其他的 rules 配置
    ],
  },
  // 其他的配置
};
```

在 `rules` 数组中，存放了一个个的 `Rule`，每个 `Rule` 是一个对象，可以设置多个属性。

- `test` 属性用于对资源进行匹配，通常会设置成正则表达式。
- `use` 属性对应的值是一个数组，其中每个元素是一个 `UseEntry` 对象。
  - `UseEntry` 是一个对象，可以通过对象的属性来设置一些其他属性。
    - `loader` 是必须的属性，对应的值是一个字符串，表示要使用的 loader。
    - `options` 是可选的属性，可以是一个字符串或对象，它的值会被传递给 loader。
    - `query` 目前已经使用 `options` 来替代，传递字符串是 `loader` 属性的简写方式。


> **loader的执行顺序是从后向前的**

### 常见的loader

css-loader
只负责解析 css 文件 ，不会将css文件插入到 页面中 
style-loader
插入 style样式 