// 引入所需的核心模块
const http = require('http');
const url = require('url');
const fs = require('fs')
// 引入代理中间件
const { createProxyMiddleware } = require('http-proxy-middleware');
// 读取静态 HTML 文件
const html = fs.readFileSync('./index.html');
// 导入代理配置文件
const config = require('./ljt.config.js')  

// 创建 HTTP 服务器
http.createServer((req, res) => { 
    // 解析请求路径
    const { pathname } = url.parse(req.url)
    // 获取配置文件中所有需要代理的路径
    const proxyList = Object.keys(config.server.proxy)
    
    // 判断请求路径是否需要代理
    if (proxyList.includes(pathname)) {
        // 创建代理中间件实例
        const proxy = createProxyMiddleware(config.server.proxy[pathname])
        // 执行代理转发
        proxy(req, res); 
        return;
    }
    // 打印当前请求路径和代理列表（用于调试）
    console.log(pathname, proxyList);
    // 对于非代理请求，返回静态 HTML 页面
    res.writeHead(200, {
        'Content-Type': 'text/html;'
    })
    res.end(html);
// 监听 80 端口
}).listen(80)