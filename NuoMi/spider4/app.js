const http = require('http')
      ,url = require('url')
      ,path = require('path')
      ,fs = require('fs')
      ,mongoose = require('mongoose')
      ,{ spawn } = require('child_process')

// 连接数据库
mongoose.Promise = global.Promise; // 使用node.js自带的promise

let dburl = 'mongodb://localhost:27017/spider';

mongoose.connect(dburl, {useMongoClient: false}); // 这个false不知道是啥
let db = mongoose.connection;
db.on('err', (err) => {
  console.log('connection error!');
});
db.on('open', () => {
  console.log('server connected!');
});

// 建立数据模型
let Schema = mongoose.Schema;
let SpiderSchema = new Schema({
  code: Number,
  msg: String,
  word: String,
  time: Number,
  dataList: [{
    title: String,
    info: String,
    link: String,
    pic: String
  }],
  device: String
});

let Spider = mongoose.model('Spider', SpiderSchema);

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
      let d = data.toString()
      
      let spider = new Spider(JSON.parse(d))
      spider.save((err, spider) => {
        if(err) return console.log(err)
        console.log('save the data')
      })
    });

    phantomjs.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    });

    phantomjs.on('close', (code) => {
      console.log(`子进程退出码：${code}`);
    });
  }
})

app.listen(8000, () => {
  console.log('server run at http://localhost:8000')
})