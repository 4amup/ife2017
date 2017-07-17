window.onload = () => {
  // 先定义一个用户组，单页同时显示，后续使用socket.io每页各自显示。
  let users = ['刘俊良', '汪峰', '章子怡', '陈玘', '林京来'];

  // 定义扑克数组
  let cards = Object.keys(String(new Array(53)));

  // 每个用户一个div放牌，实验阶段每人发五张牌
  let pokerArea = document.getElementById('pokerArea');
  init();
  // 为三个按钮分别绑定处理函数
  document.getElementById('reset').onclick = reset;

  document.getElementById('send').onclick = sendCard;


  document.getElementById('compare').onclick = function () {
    judgeCard([2, 6, 10, 14, 42, 11]);
  }
  // 写一个牌型判定的函数，传入一个数组，5-7长度
  // 对4取余数是判定花色，倍数就是点数
  function judgeCard (arr) {
    // 限制条件，参数必须是一个长度为5-7的数组
    if (arr.length<5 || arr.length>7) return;

    // 先排序，sort默认从小到大，注意数字排序默认会按1,11,22这么排列
    arr.sort((a, b) => {
      return a-b;
    });
    
    // 先判断同花
    let huase = arr.map((value) => {
      return value%4;
    });
    // 至少5个相同才是同花
    let huaseSet = new Set(huase);
    if((huase.length-huaseSet.size)>=4){
      console.log('同花');
    }

    // 再判断点数
    let dian = arr.map((value) => {
      return Math.floor(value/4);
    });
    // todo

  }

  // 发牌函数，发几张牌
  function sendCard () {
    // 就是在52张牌中，随机选出user.length * 5张牌
    reset();
    let count = users.length * 5;

    let theCards = [];
    for(let i=0; i<count; i++) {
      let index = Math.floor(Math.random()*cards.length);
      let theCard = cards[index];
      theCards.push(theCard);
      cards.splice(index,1);
    }

    console.log(theCards);

    // 将图片显示
    let imgs = document.getElementsByTagName('img');
    for(let i=0; i<imgs.length; i++) {
      imgs[i].setAttribute('src', 'image/'+theCards[i]+'.jpg');
    }

  }

  // 重置函数，将所有牌清空
  function init () {
    for (let i=0; i<users.length; i++) {
      let pokerDiv = document.createElement('div');
      pokerDiv.className = 'poker';

      let div = document.createElement('div');
      div.className = 'namelist';
      div.textContent = `${i+1}、${users[i]}：`;

      pokerDiv.appendChild(div);
      // 每人先发五张牌
      for (let i=0; i<5; i++) {
        let cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        
        let img = document.createElement('img');
        img.setAttribute('alt', '待发牌');

        cardDiv.appendChild(img);

        pokerDiv.appendChild(cardDiv);
      }
      pokerArea.appendChild(pokerDiv);
    }
  }

  // reset 两个任务：清空img的src属性，将牌重新变成52张
  function reset () {
    // 将牌重新变成52张
    cards = Object.keys(String(new Array(53)));

    // 清除img的src属性
    let imgs = document.getElementsByTagName('img');
    for(let i=0; i<imgs.length; i++) {
      imgs[i].removeAttribute('src');
    }
  }
}