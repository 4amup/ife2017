const http = require('http')
      ,url = require('url')
      ,path = require('path')
      ,fs = require('fs')
      ,mongoose = require('mongoose')

// 创建服务器
let app = http.createServer((req, res) => {
  let urlPrase = url.parse(req.url)
  let pathname = urlPrase.pathname
  let query = urlPrase.query

  if(pathname.substr(-1, 1) === '/') {
    pathname += 'index.html'
  }

  res.writeHead(200, {"Content-Type": "html"})
  fs.readFile('static'+pathname, 'utf-8', (err, data) => {
    if(err) {
      res.writeHead(400)
      res.end(404)
    }
    res.writeHead(200)
    console.log('200 '+pathname)
    res.write(data)
    res.end()
  })  
})

app.listen(8000, () => {
  console.log('server run at http://localhost:8000')
})