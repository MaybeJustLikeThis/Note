# Nodejs的全局变量


## 全局变量
**__dirname __filename 只能在cjs使用 esm规范没有这两个全局变量**

__dirname 当前文件的目录名

__filename 当前文件的文件名 

### global  
在nodejs中使用global定义全局变量，定义的变量，可以在引入的文件中也可以访问到该变量，例如```a.js global.xxx = 'xxx' require('xxx.js')  xxx.js``` 也可以访问到该变量，在浏览器中我们定义的全局变量都在window,nodejs在global，不同的环境还需要判断，于是在ECMAScript 2020 出现了一个globalThis全局变量，在nodejs环境会自动切换成global ，浏览器环境自动切换window非常方便

### globalThis

### process

### Buffer

### console

