#   child_process 子进程
子进程是Nodejs核心API，如果你会shell命令，他会有非常大的帮助，或者你喜欢编写前端工程化工具之类的，他也有很大的用处，以及处理CPU密集型应用。

## 创建子进程
Nodejs创建子进程共有7个API Sync同步API 不加是异步API

- spawn  执行命令
- exec   执行命令
- execFile   执行可执行文件
- fork   创建node子进程
- execSync 执行命令 同步执行
- execFileSync 执行可执行文件 同步执行
- spawnSync 执行命令 同步执行

## usage

### exec
```js
child_process.exec(command, [options], callback)
```

获取nodejs 版本号
```js
exec('node -v',(err,stdout,stderr)=>{
    if(err){
        return  err
    }
    console.log(stdout.toString())
 })
```

options 配置项

- cwd <string> 子进程的当前工作目录。
- env <Object> 环境变量键值对。
- encoding <string> 默认为 'utf8'。
- shell <string> 用于执行命令的 shell。 在 UNIX 上默认为 '/bin/sh'，在 Windows 上默认为 process.env.ComSpec。 详见 Shell Requirements 与 Default Windows Shell。
- timeout <number> 默认为 0。
- maxBuffer <number> stdout 或 stderr 允许的最大字节数。 默认为 200*1024。 如果超过限制，则子进程会被终止。 查看警告： maxBuffer and Unicode。
- killSignal <string> | <integer> 默认为 'SIGTERM'。
- uid <number> 设置该进程的用户标识。（详见 setuid(2)）
- gid <number> 设置该进程的组标识。（详见 setgid(2)）



### execSync

获取node版本号 如果要执行单次shell命令execSync方便一些 options同上
```js
const nodeVersion  = execSync('node -v')
console.log(nodeVersion.toString("utf-8"))
```

打开谷歌浏览器 使用exec可以打开一些软件例如 wx 谷歌 qq音乐等 以下会打开百度并且进入无痕模式
```js
execSync("start chrome http://www.baidu.com --incognito")
```


### execFile

execFile 适合执行可执行文件，例如执行一个node脚本，或者shell文件，windows可以编写cmd脚本，posix，可以编写sh脚本

简单示例

bat.cmd

创建一个文件夹mkdir 进入目录 写入一个文件test.js 最后执行
```
echo '开始'

mkdir test 

cd ./test

echo console.log("test1232131") >test.js

echo '结束'

node test.js
```

使用execFile 执行这个
```js
execFile(path.resolve(process.cwd(),'./bat.cmd'),null,(err,stdout)=>{
    console.log(stdout.toString())
})
```



### spawn


spawn 用于执行一些实时获取的信息因为spawn返回的是流边执行边返回，exec是返回一个完整的buffer，buffer的大小是200k，如果超出会报错，而spawn是无上限的。


spawn在执行完成后会抛出close事件监听，并返回状态码，通过状态码可以知道子进程是否顺利执行。exec只能通过返回的buffer去识别完成状态，识别起来较为麻烦

```js
const {stdout} = spawn('netstat',['-an'],{})

//返回的数据用data事件接受
stdout.on('data',(steram)=>{
    console.log(steram.toString())
})
```



exec -> execFile -> spawn

exec是底层通过execFile实现 execFile底层通过spawn实现

### fork

场景适合大量的计算，或者容易阻塞主进程操作的一些代码，就适合开发fork
index.js
```js
const {fork} = require('child_process')

const testProcess = fork('./test.js')

testProcess.send('我是主进程')

testProcess.on("message",(data)=>{
    console.log('我是主进程接受消息111：',data)
})


test.js 
```js
process.on('message',(data)=>{

    console.log('子进程接受消息：',data)
})

process.send('我是子进程')
```

send 发送信息 ，message接收消息，可以相互发送接收。
fork底层使用的是IPC通道进行通讯的，IPC通道是nodejs的底层通讯方式，可以跨进程通讯，并且可以进行双向通讯。
