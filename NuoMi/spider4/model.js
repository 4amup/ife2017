const mongoose = require('mongoose')

// 建立Schema
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
// 建立model
let Spider = mongoose.model('Spider', SpiderSchema);
// 导出model
module.exports = Spider;