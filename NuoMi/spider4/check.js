// 校验query的函数
module.exports = function check(query) {
  if(!query.word) {
    console.log('查询词不能为空')
    return;
  }
  if(['iPhone5', 'iPhone6', 'iPad'].indexOf(query.device) === -1) {
    console.log('设备名有误')
    return;
  }
  return true;
}