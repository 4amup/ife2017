window.onload = function () {
  let button = document.getElementById('button');
  // 创建一个div，将body一级下面的全部包住，提供遮罩的效果；
  // 最后创建浮出的那个div
  let shadow = document.createElement('div');
  shadow.setAttribute('class', 'shadow');

  let width = document.body.clientWidth;
  let height = document.body.clientHeight;

  shadow.style.width = width+'px';
  shadow.style.height = height+'px';

  let div = document.createElement('div');
  shadow.appendChild(div);

  document.body.appendChild(shadow);
}