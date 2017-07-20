var page = require('webpage').create(),
  system = require('system'),
  devicelist = require('./device.json'),
  word,
  device;

// 显示中文
phantom.outputEncoding="gb2312";

// 如果没有加参数，就退出

// 初始化一些数值
word = system.args[1] || 'test';
device = system.args[2] || 'iPhone5';
device = devicelist[device];

// 模拟并配置设备信息
page.settings.userAgent = device.ua;
page.viewportSize = device.size;

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
    res.device = null
  } else {
    console.log('Searching for ' + word);
    var data = page.evaluate(function (d) {
      console.log('page' + d);
      var results = document.getElementsByClassName('result');
      var data = [];
      for (var i=0; i<results.length; i++) {
        var obj = {};
        var result = results[i];
        if(d == ('iPhone5' || 'iPhone6')) {
          //如果有标题，就加标题
          obj.title = 'no-title';
          var title = result.querySelector('.c-title');
          if(title) {
            obj.title = title.textContent;
          }

          // 如果有摘要，就加摘要，否则就是默认
          obj.info = 'no-info';
          var info = result.querySelector('.c-abstract');
          if(info) {
            obj.info = info.textContent;
          }

          obj.link = 'no-link';
          var link = result.querySelector('.c-container a');
          if(link) {
            obj.link = link.href;
          }
          
          // 如果有图片，就加图片，没有就是默认
          obj.pic = 'no picurl ';
          var picurl = result.querySelector('.c-img img');
          if(picurl) {
            obj.pic = picurl.src;
          }
        } else {
          //如果有标题，就加标题
          obj.title = 'no-title';
          var title = result.querySelector('.t a');
          if(title) {
            obj.title = title.textContent;
          }

          // 如果有摘要，就加摘要，否则就是默认
          obj.info = 'no-info';
          var info = result.querySelector('.c-abstract');
          if(info) {
            obj.info = info.textContent;
          }

          obj.link = 'no-link';
          if(title) {
            obj.link = title.href;
          }
          
          // 如果有图片，就加图片，没有就是默认
          obj.pic = 'no picurl ';
          var picurl = result.querySelector('.c-img');
          if(picurl) {
            obj.pic = picurl.src;
          }
        }
        // 将对象推入data
        data.push(obj);
      }
      return data;
    }, device.name)

    res.code = 1;
    res.msg = '抓取成功';
    res.word = word;
    res.time = Date.now() - time;
    res.dataList = data;
    res.device = device.name;
  }

  console.log(JSON.stringify(res, undefined, 4));
  phantom.exit();
});