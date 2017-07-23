const http = require('http')
      ,Koa = require('koa')
      ,Router = require('koa-router')
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

let Spider = require('./model');

// 建立koa实例

const app = new Koa();

// 中间件

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
// 静态文件服务器
app.use(require('koa-static')(__dirname + '/static'));

// 路径
let router = new Router();
 
router.get('/', (ctx, next) => {
  // ctx.router available
  ctx.body = 'hello world'
});
 
app.use(router.routes())
app.use(router.allowedMethods())

router.post('/', (ctx,next) => {
  let query = ctx.query
  // let word =ctx.request.body.word || 0
  // let device = ctx.request.body.device || null
  // let query = {
  //   word: word,
  //   device: device
  // }
  if(require('./check')(query)) {
    // 使用子进程
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
    })

    phantomjs.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`)
    })

    phantomjs.on('close', (code) => {
      console.log(`子进程退出码：${code}`);
    })
  }
})

// 监听端口

app.listen(8080, () => {
  console.log('run at http://localhost:8080');
});
// 创建服务器
// let app = http.createServer((req, res) => {
//   let urlPrase = url.parse(req.url, true)
//   let pathname = urlPrase.pathname
//   let query = urlPrase.query

//   if(pathname.substr(-1, 1) === '/') {
//     pathname += 'index.html'
//   }

//   res.writeHead(200, {"Content-Type": "html"})
//   fs.readFile('static'+pathname, 'utf-8', (err, data) => {
//     if(err) {
//       res.writeHead(400)
//       res.end(404)
//     }
//     console.log('载入页面 ' + req.url)
//     res.writeHead(200)
//     res.write(data)
//     res.end()
//   })

//   // 验证参数没问题后，存入数据库
//   if(check()) {
//     // 使用子进程
//     console.log('启动子进程')
//     let arr = ['task.js', query.word, query.device]
//     let phantomjs = spawn('phantomjs', arr);

//     phantomjs.stdout.on('data', (data) => {
//       let d = data.toString()
      
//       let spider = new Spider(JSON.parse(d))
//       spider.save((err, spider) => {
//         if(err) return console.log(err)
//         console.log('save the data')
//       })
//     });

//     phantomjs.stderr.on('data', (data) => {
//       console.log(`stderr: ${data}`)
//     });

//     phantomjs.on('close', (code) => {
//       console.log(`子进程退出码：${code}`);
//     });
//   }

//   // 校验query的函数
//   function check() {
//     if(!query.word) {
//       console.log('查询词不能为空')
//       return;
//     }
//     if(['iPhone5', 'iPhone6', 'iPad'].indexOf(query.device) === -1) {
//       console.log('设备名有误')
//       return;
//     }
//     return true;
//   }
// })

// app.listen(8000, () => {
//   console.log('server run at http://localhost:8000')
// })