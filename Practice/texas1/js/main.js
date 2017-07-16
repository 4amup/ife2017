window.onload = () => {
  // 先定义一个用户组，单页同时显示，后续使用socket.io每页各自显示。
  let users = ['刘俊良', '汪峰', '章子怡', '陈玘', '林京来'];

  // 定义代表扑克的数组，52张牌+1张背牌
  const cards = Object.keys(String(new Array(53)));
  console.log(Array.isArray(cards));

  // 每个用户一个div放牌，实验阶段每人发五张牌
  let pokerArea = document.getElementById('pokerArea');
  reset();
  // 为三个按钮分别绑定处理函数
  document.getElementById('reset').onclick = reset;

  document.getElementById('send').onclick = sendCard;

  // 发牌函数
  function sendCard () {
    // TODO:
  }

  // 重置函数，将所有牌清空
  function reset () {
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
}