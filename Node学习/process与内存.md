# Node.js Process 模块详解

## 1. 简介
process 是 Node.js 操作当前进程和控制当前进程的 API，并且是挂载到 globalThis 下面的全局 API。

## 2. 常用 API

### 2.1 process.arch
返回操作系统 CPU 架构，与 os.arch 功能相同，可能的值包括：
- 'arm'
- 'arm64'
- 'ia32'
- 'mips'
- 'mipsel'
- 'ppc'
- 'ppc64'
- 's390'
- 's390x'
- 'x64'

### 2.2 process.cwd()
返回当前的工作目录。例如在 `F:\project\node>` 执行的脚本就返回这个目录，也可以和 path 拼接代替 `__dirname` 使用。

### 2.3 process.argv
获取执行进程后面的参数，返回是一个数组。常用于命令行交互工具，各种 CLI 脚手架也是使用这种方式接收配置参数，例如 webpack。

### 2.4 process.memoryUsage()
用于获取当前进程的内存使用情况。返回对象包含以下属性：

```js
{
    rss: 30932992,      // 常驻集大小：进程当前占用的物理内存量，不包括共享内存和页面缓存
    heapTotal: 6438912, // 堆区总大小：V8 引擎为 JavaScript 对象分配的内存量
    heapUsed: 5678624,  // 已用堆大小
    external: 423221,   // 外部内存使用量：由其他 C/C++ 对象或系统分配的内存
    arrayBuffers: 17606 // ArrayBuffer 数量：用于处理二进制数据的对象数量
}
```

### 2.5 process.exit()
强制进程尽快退出，即使仍有未完全完成的异步操作挂起。

### 2.6 process.kill()
用来杀死一个进程，接受一个参数进程 id，可以通过 process.pid 获取：
```js
process.kill(process.pid)
```

### 2.7 process.env
用于读取和修改操作系统的环境变量。

注意：修改环境变量只在当前线程生效，不会真正影响操作系统的变量，线程结束便释放。

## 3. 环境变量最佳实践

### 3.1 区分开发环境和生产环境

使用 cross-env 实现跨平台环境变量设置：

```bash
# 安装
npm install cross-env

# 使用
cross-env NODE_ENV=dev
```

### 3.2 cross-env 原理
根据不同操作系统调用相应的命令设置环境变量：

```bash
# Windows
set NODE_ENV=production

# POSIX
export NODE_ENV=production
```

cross-env 的优势在于提供了跨平台设置和使用环境变量的能力，使得在 Windows 和 POSIX 系统上都能兼容运行。

