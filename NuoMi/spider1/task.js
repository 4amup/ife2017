var page = require('webpage').create();
page.open('https://www.v2ex.com/', function(status) {
  console.log("Status: " + status);
  if(status === "success") {
    page.render('v2ex.png');
  }
  phantom.exit();
});