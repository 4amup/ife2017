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

  // 为矩形填充颜色
  moveCtx.fillStyle="red";
  moveCtx.fillRect(50,50,50,50);
  moveCtx.stroke();
  moveCtx.fillStyle="blue";
  moveCtx.fillRect(50,50,50,15);
  moveCtx.stroke();

}