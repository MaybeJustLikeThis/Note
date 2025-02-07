# 核心配置

- `entry`：声明项目入口文件，Webpack 会从这个文件开始递归找出所有文件依赖；
- `output`：声明构建结果的存放位置；
- `target`：用于配置编译产物的目标运行环境，支持 `web`、`node`、`electron` 等值，不同值最终产物会有所差异；
- `mode`：编译模式短语，支持 `development`、`production` 等值，Webpack 会根据该属性推断默认配置；
- `optimization`：用于控制如何优化产物包体积，内置 Dead Code Elimination、Scope Hoisting、代码混淆、代码压缩等功能；
- `module`：用于声明模块加载规则，例如针对什么类型的资源需要使用哪些 Loader 进行处理；
- `plugin`：Webpack 插件列表。

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

less-loader

在css-loader之后加入

## Webpack图像优化

## 在 Webpack 4 中导入图像

原生 Webpack 4 只能处理标准 JavaScript 模块，因此需要借助 Loader —— 例如 `file-loader`、`url-loader`、`raw-loader` 等完成图像加载操作，实践中我们通常需要按资源类型选择适当加载器，简单介绍：

- [file-loader](https://link.juejin.cn/?target=https%3A%2F%2Fv4.webpack.js.org%2Floaders%2Ffile-loader%2F)：将图像引用转换为 url 语句并生成相应图片文件，例如使用如下配置：

```js
js复制代码// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [{
      test: /\.(png|jpg)$/,
      use: ['file-loader']
    }],
  },
};
```

经过 `file-loader` 处理后，原始图片会被重命名并复制到产物文件夹，同时在代码中插入图片 URL 地址，形如：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6384383d6df4060b973bd3ad8f261eb~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

- [url-loader](https://link.juejin.cn/?target=https%3A%2F%2Fv4.webpack.js.org%2Floaders%2Furl-loader%2F)：有两种表现，对于小于阈值 `limit` 的图像直接转化为 base64 编码；大于阈值的图像则调用 `file-loader` 进行加载，例如如下配置：

```js
js复制代码module.exports = {
  // ...
  module: {
    rules: [{
      test: /\.(png|jpg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 1024
        }
      }]
    }],
  },
};
```

经过 `url-loader` 处理后，小于 `limit` 参数即 1024B 的图片会被转译为 Base64 编码，如：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6d735d771f4c4436bc0b80e145098314~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

对于超过 `limit` 值的图片则直接调用 `file-loader` 完成加载。

`url-loader` 同样适用于大多数图片格式，且能将许多细小的图片直接内嵌进产物中，减少页面运行时需要发出的网络请求数，在 HTTP 1.1 及之前版本中能带来正向的性能收益。

- [raw-loader](https://link.juejin.cn/?target=https%3A%2F%2Fv4.webpack.js.org%2Floaders%2Fraw-loader)：不做任何转译，只是简单将文件内容复制到产物中，适用于 SVG 场景，例如如下配置：

```js
js复制代码// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.svg$/i,
        use: ['raw-loader'],
      },
    ],
  },
};
```

经过 `raw-loader` 处理后，SVG 资源会被直接复制成字符串形式：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c51ac80e214c41b2b695b2ea71e5ab33~tplv-k3u1fbpfcp-jj-mark:1512:0:0:0:q75.awebp)

> 提示：除 `raw-loader` 外，我们还可以使用如下 Loader 加载 SVG 资源：
>
> - [svg-inline-loader](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fsvg-inline-loader)：能够自动删除 SVG 图片中与显式无关的各种原信息，达到压缩效果；
> - [svg-url-loader](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fsvg-url-loader)：以 [DataURL](https://link.juejin.cn/?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTTP%2FBasics_of_HTTP%2FData_URIs) 方式导入 SVG 图片，相比于 Base64 更节省空间；
> - [react-svg-loader](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Freact-svg-loader)：导入 SVG 图片并自动转化为 React 组件形态，效果类似 [@svgr/webpack](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40svgr%2Fwebpack)；
> - [vue-svg-loader](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fvue-svg-loader)：导入 SVG 图片并自动转化为 Vue 组件形态。

## 在 Webpack 5 中导入图像

上述 `file-loader`、`url-loader`、`raw-loader` 都并不局限于处理图片，它们还可以被用于加载任意类型的多媒体或文本文件，使用频率极高，几乎已经成为标配组件！所以 Webpack5 直接内置了这些能力，开箱即可使用。

用法上，原本需要安装、导入 Loader，Webpack5 之后只需要通过 `module.rules.type` 属性指定[资源类型](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fguides%2Fasset-modules%2F)即可，对比来看：

- `file-loader` 对标到 `type = "asset/resource"'`：

```js
js复制代码// webpack.config.js
module.exports = {
  // ...
  module: {
    rules: [{
      test: /\.(png|jpg)$/,
-     use: ['file-loader']
+     type: 'asset/resource'
    }],
  },
};
```

> 提示：默认情况下，`asset/resource` 生成的文件会以 `[hash][ext][query]` 方式重命名，可以通过 [output.assetModuleFilename](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Foutput%2F%23outputassetmodulefilename) 属性控制。

- `url-loader` 对标到 `type = "asset"` 或 `type = "asset/inline"`：

```js
js复制代码module.exports = {
  // ...
  module: {
    rules: [{
      test: /\.(png|jpg)$/,
-     use: [{
-       loader: 'url-loader',
-       options: {
-         limit: 1024
-       }
-     }]
+     type: "asset",
+     parser: {
+        dataUrlCondition: {
+          maxSize: 1024 // 1kb
+        }
+     }
    }],
  },
};
```

其中，[module.rules.parser.dataUrlCondition](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Fmodule%2F%23ruleparserdataurlcondition) 用于限定文件大小阈值，对标 `url-loader` 的 `limit` 属性。

- `raw-loader` 对标到 `type = "asset/source"`：

```js
js复制代码module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.svg$/i,
-       use: ['raw-loader']
+       type: "asset/source"
      },
    ],
  },
};
```

补充一下，引入 `module.rules.type` 并不只是为了取代 Loader 那么简单，更重要的目的是在 JavaScript Module 之外增加对其它资源 —— [Asset Module](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fguides%2Fasset-modules%2F) 的原生支持，让 Webpack 有机会介入这些多媒体资源的解析、生成过程，从而有机会实现更标准、高效的资源处理模型。

目前 [`module.rules.type`](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Fmodule%2F%23ruletype) 已经支持 JSON、WebAssemsbly、二进制、文本等资源类型，相信在下一个 Webpack 版本中，必然会基于 Asset Module 实现更丰富的资源处理能力。

asset/resource 是将文件重命名之后引用进入js，会多网络请求。
asset/inline 是将图片变成base64格式，通过这种方式减少网络请求，缺点是会延长js文件的加载时间。
## 图像优化：压缩

前面介绍的 Loader 与 Asset Modules 都只是解决了图像资源加载 —— 也就是让 Webpack 能够理解、处理图像资源，现实中我们还需要为 Web 页面中的图片做各种优化，提升页面性能，常见的优化方法包括：

- **图像压缩**：减少网络上需要传输的流量；
- **雪碧图**：减少 HTTP 请求次数；
- **响应式图片**：根据客户端设备情况下发适当分辨率的图片，有助于减少网络流量；
- **CDN**：减少客户端到服务器之间的物理链路长度，提升传输效率；
- 等等。



# 构建过程提速策略

## 开启缓存使babel-loader效率提升两倍

```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
       loader: 'babel-loader?cacheDirectory=true',//对loader增加参数
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
  ]
}
```

## 针对第三方库

使用DLLPlugin

DllPlugin 是基于 Windows 动态链接库（dll）的思想被创作出来的。这个插件会把第三方库单独打包到一个文件中，这个文件就是一个单纯的依赖库。**这个依赖库不会跟着你的业务代码一起被重新打包，只有当依赖自身发生版本变化时才会重新打包**。

用 DllPlugin 处理文件，要分两步走：

- 基于 dll 专属的配置文件，打包 dll 库
- 基于 webpack.config.js 文件，打包业务代码

```js
//webpack.dll.config.js 
const path = require('path')
const webpack = require('webpack')

module.exports = {
    entry: {
      // 依赖的库数组
      vendor: [
        'prop-types',
        'babel-polyfill',
        'react',
        'react-dom',
        'react-router-dom',
      ]
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: '[name].js',
      library: '[name]_[hash]',
    },
    plugins: [
      new webpack.DllPlugin({
        // DllPlugin的name属性需要和libary保持一致
        name: '[name]_[hash]',
        path: path.join(__dirname, 'dist', '[name]-manifest.json'),
        // context需要和webpack.config.js保持一致
        context: __dirname,
      }),
    ],
}
```

```js
webpack.config.js
const path = require('path');
const webpack = require('webpack')
module.exports = {
  mode: 'production',
  // 编译入口
  entry: {
    main: './src/index.js'
  },
  // 目标文件
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: '[name].js'
  },
  // dll相关配置
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      // manifest就是我们第一步中打包出来的json文件
      manifest: require('./dist/vendor-manifest.json'),
    })
  ]
}
```

## Happypack---将loader由单进程转为多进程

```js
const HappyPack = require('happypack')
// 手动创建进程池
const happyThreadPool =  HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
  module: {
    rules: [
      ...
      {
        test: /\.js$/,
        // 问号后面的查询参数指定了处理这类文件的HappyPack实例的名字
        loader: 'happypack/loader?id=happyBabel',
        ...
      },
    ],
  },
  plugins: [
    ...
    new HappyPack({
      // 这个HappyPack的“名字”就叫做happyBabel，和楼上的查询参数遥相呼应
      id: 'happyBabel',
      // 指定进程池
      threadPool: happyThreadPool,
      loaders: ['babel-loader?cacheDirectory']//启动缓存
    })
  ],
}
```

# 构建结果体积压缩

## 构建大小查看工具

[webpack-bundle-analyzer](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fwebpack-bundle-analyzer)

```js
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 
module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}
```

## 删除冗余代码

### tree shaking



