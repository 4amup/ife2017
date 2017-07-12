let result = []; // 用于存放遍历的dom节点
let timer = null; // 定义动画定时器
let selNode = null; // 定义选中节点，唯一性，不能多选

window.onload = function(){
  let rootNode = document.getElementById("root");

  // 为点击某个div元素做事件委托
  rootNode.addEventListener('click', selectNode);
  // 具体的点击事件委托函数
  function selectNode (ev) {
    styleReset();
    let node = ev.target;
    if(node.tagName = 'div') {
      node.style.border = '2px red solid';
      selNode = node;
    }
  }
  
  // 为删除按钮绑定事件
  let delNode = document.getElementById('delNode');

  delNode.onclick = deleteNode;
  // 删除选中节点的函数
  function deleteNode () {
    if (!selNode) {
      alert('请先选择一个节点');
      return;
    }
    selNode.parentNode.removeChild(selNode);
  }

  // 为增加按钮绑定事件
  let addNode = document.getElementById('addNode');
  let input = document.getElementById('input');
  addNode.onclick = addToNode;
  // 增加input中的值到选中的节点中
  function addToNode () {
    if (!selNode) {
      alert('请先选择一个节点');
      return;      
    }
    if (!input.value) {
      alert('请选输入值增加节点');
      return;
    }
    let div = document.createElement('div');
    div.innerHTML = input.value;
    selNode.appendChild(div);
  }

  //为前序遍历按钮绑定事件
  document.getElementById("preOrder").onclick = function(){
    //环境初始化
    styleReset();
    clearInterval(timer);
    result = [];

    preOrder(rootNode);
    startAnimate();
  }

  //为中序遍历按钮绑定事件
  document.getElementById("inOrder").onclick = function(){
    //环境初始化
    styleReset();
    clearInterval(timer);
    result = [];

    inOrder(rootNode);
    startAnimate();
  }

  //为后序遍历按钮绑定事件
  document.getElementById("postOrder").onclick = function(){
    //环境初始化
    styleReset();
    clearInterval(timer);
    result = [];

    postOrder(rootNode);
    startAnimate();
  }
}
/*
*使用递归的方式前序遍历DOM
*/

function preOrder(node){
  if (node) {
    result.push(node);
    preOrder(node.firstElementChild);
    preOrder(node.nextElementSibling);
  }
}
/*
*使用递归的方式中序遍历DOM
*/

function inOrder(node){
  if (node) {
    inOrder(node.firstElementChild);
    result.push(node);
    inOrder(node.nextElementSibling);
  }
}
/*
*使用递归的方式后续遍历DOM
*/

function postOrder(node){
  if (node) {
    postOrder(node.firstElementChild);
    postOrder(node.nextElementSibling);
    result.push(node);  
  }
}
//动画开启函数，每隔半秒
function startAnimate(){
  let i = 0;
  result[i].style.backgroundColor = 'blue';
  timer = setInterval(function(){
    i++;
    if(i < result.length){
      result[i-1].style.backgroundColor = '#fff';
      result[i].style.backgroundColor = 'blue';
    }else{
      clearInterval(timer);
      result[result.length-1].style.backgroundColor = '#fff';
    }
  }, 500)
}
//样式初始化函数
function styleReset(){
  let container = document.getElementsByClassName('container')[0];
  let divEles = container.getElementsByTagName("div");
  for(let i=0; i<divEles.length;i++){
    divEles[i].style.backgroundColor = '#fff';
    divEles[i].style.border = '1px black solid';
  }
}