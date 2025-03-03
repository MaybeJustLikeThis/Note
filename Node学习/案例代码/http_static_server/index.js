const http = require('http')
const fs = require('fs')
const path = require('path')
const mime = require('mime')

// 定义静态资源目录
const STATIC_PATH = path.join(__dirname, 'public')

// 创建HTTP服务器
const server = http.createServer((req, res) => {
  const { url, method } = req
  
  // 处理动态接口请求
  if (url.startsWith('/api')) {
    handleAPI(req, res)
    return
  }
  
  // 处理静态资源
  handleStatic(req, res)
})

// 处理静态资源
function handleStatic(req, res) {
  // 获取请求的文件路径
  let filePath = path.join(STATIC_PATH, req.url)
  
  // 如果请求的是目录，默认返回index.html
  if (fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html')
  }
  
  try {
    const content = fs.readFileSync(filePath)
    // 设置Content-Type
    res.setHeader('Content-Type', mime.getType(filePath))
    res.end(content)
  } catch (err) {
    res.statusCode = 404
    res.end('404 Not Found')
  }
}

// 处理动态API请求
function handleAPI(req, res) {
  res.setHeader('Content-Type', 'application/json')
  
  switch(req.url) {
    case '/api/user':
      res.end(JSON.stringify({
        name: 'test',
        age: 18
      }))
      break
      
    case '/api/time':
      res.end(JSON.stringify({
        time: new Date().toISOString()
      }))
      break
      
    default:
      res.statusCode = 404
      res.end(JSON.stringify({
        error: 'API not found'
      }))
  }
}

// 启动服务器
const PORT = 3000
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
}) 