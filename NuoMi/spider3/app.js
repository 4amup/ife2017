const http = require('http')
      ,url = require('url')
      ,path = require('path')
      ,fs = require('fs')
      ,mongoose = require('mongoose')
      ,{ spawn } = require('child_process')

// 创建服务器
let app = http.createServer((req, res) => {
  let urlPrase = url.parse(req.url, true)
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
    console.log('载入页面 ' + req.url)
    res.writeHead(200)
    res.write(data)
    res.end()
  })

  // 使用子进程
  if(query.word) {
    console.log('启动子进程')
    let arr = ['task.js', query.word, query.device]
    let phantomjs = spawn('phantomjs', arr);

    phantomjs.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    phantomjs.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });

    phantomjs.on('close', (code) => {
      console.log(`子进程退出码：${code}`);
    });
  }
})

app.listen(8000, () => {
  console.log('server run at http://localhost:8000')
})