const http = require('http')
const mongoose = require('mongoose')

let app = http.createServer((req, res) => {
  console.log('request received')
  res.writeHead(200, {"Content-Type": "text/plain"})
  res.write("hello world")
  res.end()
})

app.listen(8000, () => {
  console.log('server run at http://localhost:8000')
})