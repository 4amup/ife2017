window.onload = function () {
  let canvas = document.getElementById('canvas');
  // 设定画布大小
  canvas.width = 555;
  canvas.height = 555;
  let ctx=canvas.getContext("2d");
  
  // 绘制一个500大小的外框线，起点在(50,50)的坐标处
  ctx.lineWidth = 2;
  ctx.rect(50,50,500,500);
  ctx.stroke();

  // 添加坐标的文字
  ctx.textAlign = 'center';
  ctx.font="18px Arial";
  for (let i=0; i<10; i++) {
    ctx.fillText(`${i+1}`, 25+(i+1)*50 , 25);
    ctx.fillText(`${i+1}`, 25, 25+(i+1)*50);
  }

  // 将里面的线画完
  ctx.lineWidth = .3;
  for(let i=0; i<9; i++) {
    // 画竖线
    ctx.beginPath();
    ctx.moveTo(100+i*50, 50);
    ctx.lineTo(100+i*50, 550);
    ctx.stroke();

    // 画横线
    ctx.beginPath();
    ctx.moveTo(50, 100+i*50);
    ctx.lineTo(550, 100+i*50);
    ctx.stroke();
  }

  // 定义小方块
  let move = document.getElementById('move');
  move.width = 550;
  move.height = 550;
  let moveCtx = move.getContext('2d');
  // 定义可以移动的x和y坐标数组
  let coordinate = {
    x: [],
    y: []
  }
  for(let i=0; i<10; i++) {
    coordinate.x.push(50+i*50);
    coordinate.y.push(50+i*50);
  }
  // 打印出坐标数组，没毛病
  console.log(coordinate.x);
  console.log(coordinate.y);

  // 移动矩形block的函数
  function theBlock (x, y, z, w) {
    moveCtx.clearRect(0,0,550,550); // 清除画布

    moveCtx.fillStyle="red";
    moveCtx.fillRect(x,y,50,50);
    moveCtx.fillStyle="blue";
    moveCtx.fillRect(x,y,z,w);
    moveCtx.stroke();
  }

  // 为小方块定义一个对象

  // init第一次出现的位置
  let X = coordinate.x[Math.floor(Math.random()*coordinate.x.length)];
  let Y = coordinate.y[Math.floor(Math.random()*coordinate.y.length)];
  let Z = 50;
  let W = 15;
  let block = {x: X, y: Y, z: Z, w: W};
  // 初始化小方块
  theBlock(block.x, block.y, block.z, block.w);

  // 为执行按钮绑定事件
  document.getElementById('command').onclick = function () {
    let command = document.getElementById('input').value.toLowerCase();
    if(!command) {
      alert('请输入命令再执行');
      return;
    }
    switch(command) {
      case 'go': {
        block.x += 0;
        block.y -= 50;
        if (!validate()) return;
        theBlock(block.x, block.y, block.z, block.w);
        break;
      }
      case 'tun lef': {
        moveCtx.rotate(90*Math.PI/180);
        theBlock(block.x, block.y, block.z, block.w);        
      }
    }
  }

  // 验证小方块是否在坐标范围内
  function validate () {
    if(block.x>500 || block.y>500 || block.x<50 || block.y<50) {
      return false;
    }
    return true;
  }
}