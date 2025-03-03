const http = require('node:http')
const url = require('node:url')

http.createServer((req, res) => {
    const {pathname,query} = url.parse(req.url, true)
    if (req.method === 'POST') {
        if(pathname === '/post'){
            let data = '';
            req.on('data', (chunk) => {
                data += chunk
            })
            req.on('end', () => {
                res.setHeader('Content-Type', 'application/json')
                res.statusCode = 200;
                res.end(data)
            }) 
        } else {
            res.statusCode = 404
            res.end('404');
        }
    }
    else if (req.method === 'GET') {
        if (pathname === '/get') {
            console.log(query)
            res.end('GET')
        }
    }
}).listen(98, () => {
  console.log('服务器启动成功') 
})