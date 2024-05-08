# 前言/脚手架的介绍与作用：

Vue-cli脚手架官方中文文档：[cli.vuejs.org/zh/guide/](https://link.juejin.cn?target=https%3A%2F%2Fcli.vuejs.org%2Fzh%2Fguide%2F)

## 1. vue脚手架是什么？

1. 它是一个专门为单页面（SPA）应用快速搭建繁杂的脚手架，它是基于webpack的基础开发出来的一款能够快速的帮助我们构建一个用来开发vue的项目目录、结构（vue和webpack的项目模板）。
2. vue脚手架通常使用在大型项目中，能够加快我们的开发速度。而小型项目不推荐使用脚手架，因为反而会拖慢我们项目的开发速度。

## 2. 为什么会有vue脚手架？

1. 因为 webpack 配置繁琐, 阻止一批想用 vue 但是不会 webpack 的开发人员,所以作者直接将所有 vue 项目中用到的配置全部帮你写好了,这样,就不需要开发人员再去配置基础 webpack 配置项了。
2. 也就是说,使用 vue-cli 这个脚手架工具后,再也不用担心 webpack 配置问题了, 我们前端只需要写 vue 代码,来实现功能即可。

## 3. .vue文件是什么？

1. .vue文件是单文件组件。

   a.  什么是单文件组件 ? 后缀为 .vue 的文件。

   b.  单文件组件的三个组成部分 (代码块 : scaffold 自动提示)。

   - template (模板结构)
   - script 组件的代码逻辑
   - style 样式

2. 注意点 :

   单文件组件,无法直接在浏览器中使用,必须经过 webpack 这种打包工具,处理后,才能在浏览器中使用

## 4. vue脚手架的基本开发流程：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3efb5a3289c4404b9b36ec56304d7ef8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

# 

# 一、脚手架的基础使用与理解：

## 1.1 安装/升级 ：

```kotlin
kotlin复制代码//安装
npm i @vue/cli -g
//升级
npm update -g @vue/cli

//查看当前脚手架版本
vue -V

//安装指定版本
npm i -g @vue/cli@版本号
```

## 1.2 创建一个项目：

```lua
lua复制代码vue create my-project
//自定名称
vue create 项目名称
```

### 1.2.1 通过键盘上下选择创建什么类型的项目：

1. 创建vue2项目
2. 创建vue3项目
3. 或者自定义配置项目

注：也可在创建好的项目ui界面进行后期添加、卸载插件

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b6fca0732b74f5dafc9afa2db514433~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 1.2.2 创建vue3项目：

部分人可能会显示这个，询问此项目以后使用什么命令行语句

 ![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15a347c1334c4826ae5e012fb02fff99~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

创建好后

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f36b257792124a90baa714da82f2a091~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

### 1.2.3 自定义配置安装：

选择项目中需要安装的插件，键盘上下选择，空格选中、取消，回车下一步

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0b0e81e52a4448d8461b3dc033a1878~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

- Choose Vue Version 是否选择安装的脚手架版本,默认会创建2.0版本
- Babel是一个javascript编译器
- TypeScript 支持使用 TypeScript 书写源码
- Progressive Web App (PWA) Support PWA 支持。
- Router 支持 vue-router 。
- Vuex 支持 vuex 。
- CSS Pre-processors 支持 CSS 预处理器。
- Linter / Formatter 支持代码风格检查和格式化。
- Unit Testing 是否单元测试（具体百度）
- E2E Testing 是否自动化测试（具体百度，我也不懂什么意思）

注：如果还没选好配置就摁下了回车，可 Ctrl+D 退出创建

### 1.2.4 自定义配置详细安装过程选项：

#### I. 选择版本（这里选择3.x）

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/70a623499a284829992361200d778b7b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

#### II. history模式选择（主要是网址后面是否会有#符号的区别）

选y网址后面会添加#符号

n相反（推荐）

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/df16c322ebca4d0182fd405fd7e6660f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

#### III. 选择使用什么css预处理语言

sass两个版本解析

- node-sass 是用 node(调用 cpp 编写的 libsass)来编译 sass。
- dart-sass 是用 drat VM 来编译 sass。
- node-sass是自动编译实时的，dart-sass需要保存后才会生效。
- 推荐 dart-sass 性能更好（也是 sass 官方使用的），而且 node-sass 因为国情问题经常装不上

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/14739e8636a44f52868b7488ed1d1c2a~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

#### IV. 语法检测选择

选择EsLint + Prettier

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bd1bf7a27f39487aa78cd4cc4d5d3f10~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

#### V. 什么时候进行检测

- 保存时进行检测（推荐） -   提交时检测（我翻译的意思，不知道准不准确）

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87d0cb53f13a4e3f96823438208da7d7~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

#### VI. 配置文件选择

- 选项1：专门新建一个文件夹存放 -   选项2：放在package.json里（推荐都放在一文件夹，方便后期管理）

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/55079f5cdbe54ebd9caa34cdb36442fd~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

#### VII. 是否保存以上配置

- y保存
- n不保存（保存后会出现命名提示，给当前的配置进行命名。再之后每次搭建项目都会出现自己保存的配置名字）

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf688d535f1d4064afa216ebc5dfcf5b~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

#### VIII. 安装完成

创建完成后的操作，跳去1.5看

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93a6db9067ff4b51b33be61701f368b8~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

#### VIII. 如果需要安装其他项目依赖

> npm i --save axios

也可以

> vue add axios // vue add 需要安装的依赖名字

也可以使用vue-ui进行安装项目依赖(个人推荐)

## 1.3 使用vue-ui进行创建/管理项目 :

```arduino
arduino
复制代码vue ui //终端输入后进入ui界面
```

vue-ui界面：（默认英文，可以使用浏览器翻译插件翻译成中文）

使用vue-ui创建项目更加方便些，所有创建过程都会被可视化

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/96fb3344c8ba40c2b21a26701c720c37~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="img" style="zoom:50%;" />

开始创建

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/995a70be09f14773bbd5430e567c13c0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="img" style="zoom:50%;" />

详情设置

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/893444134cc04ecd91d98df9ab897226~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="img" style="zoom:67%;" />

预设开始就与在命令行创建一样

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7387f8bc5ffe40e998a05e71b38ee67d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="img" style="zoom:50%;" />

选择手动后，自己配置项目

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/af7da6f76c1e40cfa497ebe91c6ce2e5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="img" style="zoom:50%;" />

所有选项与操作都被ui化

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9b3438e170034c919626687025d87993~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

是否保存预设

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/421916644ab44a08988113ee96e25628~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

创建好后

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15845ccd433340c0af2becd3edb18408~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

## 1.5 运行指令：

```js
arduino复制代码// 切换到创建的项目文件夹：
cd my-project
// 运行项目：
npm run serve
//yarn方式
yarn serve

// 运行后显示这两行网址
// 第一个只能你这个电脑打开
- Local:   http://localhost:8080/
// 第二个，只要和电脑同一个网络，其他设备也可以打开
//发送到手机上可用手机打开
- Network: http://192.168.2.139:8080/

//查看项目默认安装的依赖
npm ls --depth 0
```

正常运行后的界面（电脑端）：

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c513b56eccc4438c9789b023191b5657~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="img" style="zoom:50%;" />

手机端：

<img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a0bb79d5145345e8b8f5c80c59eb3fd0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp" alt="img" style="zoom:33%;" />

输入 Ctrl+c 关闭项目

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a1f4f1ddde1448408a1aa191f426a444~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

打包项目

```arduino
arduino
复制代码npm run build
```

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e18b8870dc93494485a138a04405c951~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

打包成功后，项目文件中通会多出 dist 文件夹

## 1.6 文件目录解析：

1. node_modules：node安装的依赖包（vue脚手架程序很大是因为配置了node依赖包，

真正项目的本体是打包过后的dist文件夹）

1. dist：打包后的文件夹
2. public：公共静态资源；任何放置在public的静态资源都会被简单的复制，而不经过webpack的处理。

一般用来存放不会改变的静态资源和webpack文件和不支持的第三方库

- favicon.ico：默认图标
- index.html：（vue脚手架有特定的文件格式，打包的时候会识别这些格式这个文件名不可改，如果改了，运行时会报错

如果要改，还需要修改相应的配置文件才行）

1. src：存放代码的文件及文件夹（在这个文件夹中进行开发、写代码）

- asscts：存储项目中的静态文件（图片/字体/css等等）
- components：存放项目中的自定义组件（小组件以及公共组件）

- views：存放大组件，页面级组件，路由级别的组件
- router：存放路由（VueRouter）相关文件

- store：存储Vuex（状态管理器）相关文件
- App.vue：项目的根组件（项目所展示的页面）

- main.js：项目的入口文件

1. .gitignore：git忽略文件（因为git上传会忽略空文件夹）
2. babel.config.js：babel相关配置文件（将es6语法转为浏览器能够识别的代码）

1. package.json：vue脚手架描述文件，相关信息以及运行、打包指令、插件信息都在这里
2. README.md：项目说明

## 1.7 安装脚手架额外插件：

在脚手架目录新建一个.js文件（与package.json文件同级）：

```arduino
arduino复制代码//配置信息
module.exprots = { //模块导出
	//需要安装的插件:
  devServer:{ //配置信息
    port: 8080, //端口号
    host: 'localhostl', //地址
    open: true //自动打开浏览器
  }
}
```

## 1.8 vue脚手架文件夹及文件详解：

### main.js文件内容详解：

```javascript
javascript复制代码//es6引入文件
import Vue from 'vue' //引入vue
import App from './App.vue' //引入App.vue页面

/*
productionTip设置为 false ，可以阻止 vue 在启动时生成生产提示
开发环境下，Vue 会提供很多警告来帮你对付常见的错误与陷阱。
而在生产环境下，这些警告语句却没有用，反而会增加应用的体积。
此外，有些警告检查还有一些小的运行时开销，这在生产环境模式下是可以避免的
*/
Vue.config.productionTip = false

//这个vue实例加载方式是典型的es6写法
new Vue({
	router,//挂载路由
	store,//挂载Vuex状态管理
	render: h => h(App) //render渲染;加载app.vue页面;h代表hypersript（超脚本）
}).$mount('#app') //将这个vue实例手动挂载到#app
```

### App.vue（单文件组件）页面详解：

```javascript
javascript复制代码//组件内容（页面展示内容）
<template>
	<div id='app'>
    ...
  </div>
</template>

//组件控制区
<script>
  import 组件名 from './components/小组件名.vue'//引入小组件
  
  //全局组件定义
  Vue.component(
    '组件名',
    组件名
   );

  export default{//暴露出当前根组件叫'APP',且上面的根节点是'app'
    name: 'App',
    data(){
      return{
        //存放组件数据
      }
    }
    components:{//定义局部组件，即子组件
      组件名:{
    		template:xxx
  		}
    }
  }
</script>

//style样式;注意：这里的样式以及views和components组件的样式都是全局样式
//如果不通过单独添加样式名设置样式，则会作用到所有相应的标签上
//可以通过添加scoped声明此样式只此文件用
<style scoped lang="sass">//lang="使用什么css预处理语言"
  ...
</style>
```

### router文件夹下面的index.js文件详解：

```arduino
arduino复制代码//导入文件
import...

//路由内容
const routes = [
	...
]

//路由实例化
const router = new VueRoutter({
	routes
})

//导出
export default router
```

### views文件夹：

存放大型页面级组件

```xml
xml复制代码//页面内容
<template>
	<定义的小组件名 msg="传给小组件的值"/>
</template>

//js代码
<script>
  //引入小组件
	import 小组件名 from '小组件路径'    
	
	//定义小组件
	export default{
    name: '组件名',
    comoponets:{
      小组件名
    }
  }
</script>
```

### components文件夹：

存放页面内的各种小组件

```arduino
arduino复制代码//页面内容
<template>
	小组件内容（html代码）
</template>

//js代码
export default{
  name: '小组件名',//不要使用_进行命名，因为还需要在标签中使用
  props: { //组件数据
    msg:String //定义传过来的数据类型
  }						 //也可以不定义数据类型
}

//css代码
<style>
  ...
</style>
```

### asscts文件夹：

存储项目中的所有静态文件（图片及字体文件等等）

# 二、使用脚手架进行vue页面开发：

### 1.添加组件

views文件夹下添加Test.vue文件

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68cc955ba428451b8e25b83e4436a695~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

components文件夹下添加VueTest.vue

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/648095a59ff64b95b9e441d74e55422f~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

router文件夹下index.js文件

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9995a08b879643128d3c01c30fb1afde~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

App.vue根组件页面

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b9c6a7661c3c462d9f77d642c3cf1b60~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

页面效果

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e28388d53e4d4f46957d4c8e471437e2~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

