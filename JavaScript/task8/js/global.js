let result = [];//用于存放遍历的dom节点
let timer = null;//定义动画定时器

window.onload = function(){
  let container = document.getElementsByClassName('container')[0];
  let root = document.getElementById('root');
  //为前序遍历按钮绑定事件
  document.getElementById("preOrder").onclick = function(){
    //环境初始化
    styleReset();
    clearInterval(timer);
    result = [];

    preOrder(root);
    startAnimate();
  }
  //为中序遍历按钮绑定事件
  document.getElementById("inOrder").onclick = function(){
    //环境初始化
    styleReset();
    clearInterval(timer);
    result = [];

    inOrder(root);
    startAnimate();
  }
  //为后序遍历按钮绑定事件
  document.getElementById("postOrder").onclick = function(){
    //环境初始化
    styleReset();
    clearInterval(timer);
    result = [];

    postOrder(root);
    startAnimate();
  }
}
/*
*使用递归的方式前序遍历DOM
*/

function preOrder(node){
  result.push(node);
  if(node.firstElementChild !== null){
    preOrder(node.firstElementChild);
  }
  if(node.nextElementSibling !== null){
    preOrder(node.nextElementSibling);
  }
}
/*
*使用递归的方式中序遍历DOM
*/

function inOrder(node){
  if(node.firstElementChild !== null){
    inOrder(node.firstElementChild);
  }
  result.push(node);
  if(node.nextElementSibling !== null){
    inOrder(node.nextElementSibling);
  }
}
/*
*使用递归的方式后续遍历DOM
*/

function postOrder(node){
  if(node.firstElementChild !== null){
    postOrder(node.firstElementChild);
  }
  if(node.nextElementSibling !== null){
    postOrder(node.nextElementSibling);
  }
  result.push(node);
}
//动画开启函数，每隔0.5秒
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
  let divEles = document.getElementsByTagName("div");
  for(let i=0; i<divEles.length;i++){
    divEles[i].style.backgroundColor = '#fff';
  }
}