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

  // 定义可以移动的x和y坐标范围
  let coordinate = {
    x: [],
    y: []
  }
  for(let i=0; i<10; i++) {
    coordinate.x.push(50+i*50);
    coordinate.y.push(50+i*50);
  }
  // 打印出坐标范围的数组，没毛病
  console.log(coordinate.x);
  console.log(coordinate.y);

  let X = coordinate.x[Math.floor(Math.random()*coordinate.x.length)];
  let Y = coordinate.y[Math.floor(Math.random()*coordinate.y.length)];

  // 初始化小方块
  move.style.left = `${X}px`;
  move.style.top = `${Y}px`;































//   let moveCtx = move.getContext('2d');
//   // 定义可以移动的x和y坐标数组
//   let coordinate = {
//     x: [],
//     y: []
//   }
//   for(let i=0; i<10; i++) {
//     coordinate.x.push(50+i*50);
//     coordinate.y.push(50+i*50);
//   }
//   // 打印出坐标范围的数组，没毛病
//   console.log(coordinate.x);
//   console.log(coordinate.y);

//   // 按照当前坐标渲染出矩形block的函数
//   function theBlock (x, y, direction) {
//     moveCtx.clearRect(0,0,550,550); // 清除画布

//     moveCtx.fillStyle="red";
//     moveCtx.fillRect(x,y,50,50);
//     moveCtx.fillStyle="blue";
//     switch(direction) {
//       case 'up': {
//         moveCtx.fillRect(x,y,50,15);
//         break;
//       }
//       case 'left': {
//         moveCtx.fillRect(x,y,15,50);
//         break;
//       }
//       case 'down': {
//         moveCtx.fillRect(x,y+35,50,15);
//         break;
//       }
//       case 'right': {
//         moveCtx.fillRect(x+35,y,15,50);
//         break;
//       }
//     }
//     moveCtx.stroke();
//   }

//   // 为小方块定义一个对象
//   let direction = ['up', 'left', 'down', 'right'];
//   // init时，随机取小方块的x和y坐标及方向属性。
//   let X = coordinate.x[Math.floor(Math.random()*coordinate.x.length)];
//   let Y = coordinate.y[Math.floor(Math.random()*coordinate.y.length)];
//   let D = direction[Math.floor(Math.random()*direction.length)];
//   let dircount = direction.indexOf(D);  // 取得方向属性初始值
  
//   let block = {x: X, y: Y, direc: D}; // 为小方块赋值
//   theBlock(block.x, block.y, block.direc);  // 初始化小方块

//   // 为执行按钮绑定事件
//   document.getElementById('command').onclick = function () {
//     let command = document.getElementById('input').value.toLowerCase();

//     switch(command) {
//       case 'go': {
//         goToWhere(block.direc);
//         filter()
//         theBlock(block.x, block.y, block.direc);
//         break;
//       }
//       case 'tun lef': {
//         dircount += 1;
//         block.direc = direction[fixDirection(dircount)];        
//         theBlock(block.x, block.y, block.direc);        
//         break;
//       }
//       case 'tun rig': {
//         dircount -= 1;
//         block.direc = direction[fixDirection(dircount)];        
//         theBlock(block.x, block.y, block.direc);        
//         break;
//       }
//       case 'tun bac': {
//         dircount += 2;
//         block.direc = direction[fixDirection(dircount)];        
//         theBlock(block.x, block.y, block.direc);        
//         break;
//       }
//       case '' : {
//         alert('命令为空，请输入命令');
//         break;
//       }
//       default : {
//         alert('命令输入错误，请核对后再次输入');
//         input.value = '';
//       }
//     }
//   }


//   // 处理block的方向，让方向绕圈
//   function fixDirection (count) {
//     if (count>3) {
//       count-=4;
//     }
//     if (count<0) {
//       count+=4;
//     }
//     return dircount = count;
//   }
//   // 让go命令知道该往哪个方向走
//   function goToWhere (direction) {
//     switch (direction) {
//       case 'up': {
//         block.y -= 50;
//         break;
//       }
//       case 'left': {
//         block.x -= 50;
//         break;
//       }
//       case 'down': {
//         block.y += 50;
//         break;
//       }
//       case 'right': {
//         block.x += 50;
//         break;
//       }
//     }
//   }

//   // 若超过坐标范围，则强制将坐标置为边界值
//   function filter () {
//     if(block.x>500) {
//       block.x = 500;
//     }
//     if(block.y>500) {
//       block.y = 500;
//     }
//     if(block.x<50) {
//       block.x = 50;
//     }
//     if(block.y<50) {
//       block.y = 50;
//     }
//   }
}