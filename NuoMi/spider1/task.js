var page = require('webpage').create(),
  system = require('system'),
  word;

// 显示中文
phantom.outputEncoding="gb2312";

// 如果没有加参数，就退出
if (system.args.length === 1) {
  console.log('Usage: task.js <word>');
  phantom.exit();
}

// 初始化一些数值
word = system.args[1];
url = "https://www.baidu.com/s?ie=UTF-8&wd=" + encodeURIComponent(word);
time = Date.now();

// 打开页面
page.open(url, function(status) {
  // 初始化res对象
  res = {};
  if (status !== 'success') {
    console.log('FAIL!');
    res.code = 0;
    res.msg = '抓取失败';
    res.word = word;
    res.time = Date.now() - time;
    res.dataList = [];
  } else {
    console.log('Searching for ' + word);
    var data = page.evaluate(function () {
      var results = document.getElementsByClassName('result');
      var data = [];
      for (var i=0; i<results.length; i++) {
        var obj = {};
        var result = results[i];

        obj.title = result.querySelector('.t a').textContent;
        
        obj.info = 'no-info';
        // 如果有摘要，就加摘要，否则就是默认
        var info = result.querySelector('.c-abstract');
        if(info) {
          obj.info = info.textContent;
        }
        obj.link = result.querySelector('.t a').getAttribute('href');
        // 如果有图片，就加图片，没有就是默认
        obj.pic = 'no picurl ';
        var picurl = result.querySelector('.c-img');
        if(picurl) {
          obj.pic = picurl.src;
        } 
        // 将对象推入data
        data.push(obj);
      }
      return data;
    })

    res.code = 1;
    res.msg = '抓取成功';
    res.word = word;
    res.time = Date.now() - time;
    res.dataList = data;
  }

  console.log(JSON.stringify(res, undefined, 4));
  phantom.exit();
});