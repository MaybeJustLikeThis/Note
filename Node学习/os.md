Node.js OS模块使用

os模块提供了与操作系统相关的实用方法和属性

1. os.type()
获取操作系统类型
- Windows_NT
- Linux
- Darwin(macOS)

2. os.platform()
获取操作系统平台
- win32
- linux
- darwin

3. os.release()
获取操作系统版本号

4. os.homedir()
获取用户目录

5. os.arch()
获取CPU架构
- x64
- arm
- ia32

6. os.cpus()
获取CPU信息
返回一个对象数组，包含:
- model: CPU型号
- speed: 速度（MHz）
- times: 
  - user: 用户代码使用CPU的毫秒数
  - nice: 优先级较低的进程使用CPU的毫秒数
  - sys: 系统代码使用CPU的毫秒数
  - idle: CPU空闲毫秒数
  - irq: 中断请求使用CPU的毫秒数

7. os.totalmem()
获取系统总内存

8. os.freemem() 
获取系统空闲内存

9. os.networkInterfaces()
获取网络接口信息
返回一个对象，包含:
- 网卡名称
- 地址信息数组:
  - address: IP地址
  - netmask: 子网掩码
  - family: IPv4/IPv6
  - mac: MAC地址
  - internal: 是否内部接口

10. os.EOL
获取操作系统特定的行末标志
- Windows: \r\n
- POSIX: \n

使用示例:
```js
const os = require('os')

// 获取CPU信息
console.log(os.cpus())

// 获取内存信息
console.log('总内存:', os.totalmem())
console.log('空闲内存:', os.freemem())

// 获取系统信息
console.log('操作系统:', os.type())
console.log('平台:', os.platform())
console.log('版本号:', os.release())
```

### 获取网络信息
```js
const os = require('os')

// 获取网络接口信息
console.log(os.networkInterfaces())
```
```js
[
  {
    model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
    speed: 2926,
    times: {
      user: 252020,
      nice: 0,
      sys: 30340,
      idle: 1070356870,
      irq: 0,
    },
  },
  {
    model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
    speed: 2926,
    times: {
      user: 306960,
      nice: 0,
      sys: 26980,
      idle: 1071569080,
      irq: 0,
    },
  },
  {
    model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
    speed: 2926,
    times: {
      user: 248450,
      nice: 0,
      sys: 21750,
      idle: 1070919370,
      irq: 0,
    },
  },
  {
    model: 'Intel(R) Core(TM) i7 CPU         860  @ 2.80GHz',
    speed: 2926,
    times: {
      user: 256880,
      nice: 0,
      sys: 19430,
      idle: 1070905480,
      irq: 20,
    },
  },
] 
//.........
```
-  model: 表示CPU的型号信息，其中 "Intel(R) Core(TM) i7 CPU 860 @ 2.80GHz" 是一种具体的型号描述。


-  speed: 表示CPU的时钟速度，以MHz或GHz为单位。在这种情况下，速度为 2926 MHz 或 2.926 GHz。


-  times: 是一个包含CPU使用时间的对象，其中包含以下属性：

-  user: 表示CPU被用户程序使用的时间（以毫秒为单位）。
-  nice: 表示CPU被优先级较低的用户程序使用的时间（以毫秒为单位）。
-  sys: 表示CPU被系统内核使用的时间（以毫秒为单位）。
-  idle: 表示CPU处于空闲状态的时间（以毫秒为单位）。
-  irq: 表示CPU被硬件中断处理程序使用的时间（以毫秒为单位）。

