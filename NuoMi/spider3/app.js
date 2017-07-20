const http = require('http')
const url = require('url')
const fs = require('fs')
const mongoose = require('mongoose')

let app = http.createServer((req, res) => {
  // 利用url解析出参数
  if(req.url !== '/favicon.ico') {
    let parseurl = url.parse(req.url, true);
    console.log('request received')
    console.log(parseurl.query);
    // 然后取出query参数来
    // todo
    // 做一个图形化界面，输入参数后提交
  }
  res.writeHead(200, {"Content-Type": "html"})

  fs.readFile('index.html', 'utf-8', (err, data) => {
    if(err) console.log(err)
    res.write(data);
    res.end()
  })
})

app.listen(8000, () => {
  console.log('server run at http://localhost:8000')
})