window.onload = () => {
  // 先定义一个用户组，单页同时显示，后续使用socket.io每页各自显示。
  let users = ['刘俊良', '汪峰', '章子怡', '陈玘', '林京来'];

  // 定义扑克数组
  let cards = Object.keys(String(new Array(53)));
  console.log(cards);

  // 每个用户一个div放牌，实验阶段每人发五张牌
  let pokerArea = document.getElementById('pokerArea');
  init();
  // 为三个按钮分别绑定处理函数
  document.getElementById('reset').onclick = reset;

  document.getElementById('send').onclick = sendCard;

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