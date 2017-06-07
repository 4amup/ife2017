// 初始化清除之前的DOM节点
function init() {
  let show = document.getElementById('show');
  let tip = document.getElementById('tip');
  if(show) {
    document.body.removeChild(show);
  };
  if(tip) {
    document.body.removeChild(tip);
  };
}
// 匹配过程函数
function displayContent(tip) {
  let count = 0;
  let arr = splitTextarea(textarea);
  let div = document.createElement('div');
  div.setAttribute('id', 'show');
  for(item of arr) {
    let p = document.createElement('p');
    p.textContent = item;
    if(item.indexOf(input.value) != -1) {
      p.className = 'mark';
      count++;
    }
    div.appendChild(p);
  }
  tip.textContent = `共匹配到${count}个`;
  document.body.appendChild(tip);
  document.body.appendChild(div);
}
// 验证函数
function validate(input, textarea, element) {
  let element_text;
  if(!input.value) {
    element_text = document.createTextNode('提示：匹配词为空');
    element.appendChild(element_text);
    document.body.appendChild(element);
    return;
  }
  if(!textarea.value) {
    element_text = document.createTextNode('提示：被匹配词为空');
    element.appendChild(element_text);
    document.body.appendChild(element);
    return;
  }
  return true;
}
// 拆分textarea内容
function splitTextarea(content) {
  let arr = [];
  let value = content.value;
  arr = value.split(/[\n\,\r\s\，\;\；]/).filter((item) => {
    return item != "";
  });
  return arr;
}

button.onclick = function() {
  // 取变量
  let button = document.getElementById('button');
  let input = document.getElementById('input');
  let textarea = document.getElementById('textarea');
  init();
  // 再次点击清楚原先内容
  // 建立了tip
  let tip = document.createElement('p');
  tip.setAttribute('id', 'tip');
  // 验证输入是否合法
  if(!validate(input, textarea,tip)) return; 
  displayContent(tip);
}