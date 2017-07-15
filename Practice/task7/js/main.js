window.onload = function () {
  //需要一个json格式的数据
  // 先自己写一个json格式的数据做测试
  let Data = {
    "thead": ["姓名", "语文", "数学", "英文", "总分"],
    "students": [{
      "name": "小明",
      "yuwen": 80,
      "math": 90,
      "english": 70,
      "sum": null
    }, {
      "name": "小红",
      "yuwen": 90,
      "math": 60,
      "english": 90,
      "sum": null
    }, {
      "name": "小亮",
      "yuwen": 60,
      "math": 100,
      "english": 70,
      "sum": null
    }]
  }
  // 根据数据初始化基本的表格
  let container = document.getElementsByClassName('container')[0];
  container.appendChild(generatorTable(Data));

  // 为2345列th增加排序按钮
  addSortButton([2, 3, 4, 5]);

  // 实现排序的逻辑，来一个事件监听器
  document.getElementsByTagName('thead')[0].addEventListener('click', sortData);

  // 和事件绑定的排序函数
  function sortTbody (ev) {
    let node = ev.target;
    if (node.className === 'fa fa-sort-asc') {
      // 先定位列
      let colClassName = node.parentNode.parentNode.className;
      let sortData = sortClass(colClassName);
      render(sortData);
    } else if (node.className === 'fa fa-sort-asc') {
      let col = node.parentNode.parentNode.className;
    } else {
      return;
    }
  }

  // 根据列名排序函数
  function sortClass (key) {
    //
    return Grade;
  }

  // 设置函数，参数是json数据，在dom中生成表格
  function generatorTable (data) {
    let table = document.createElement('table');

    // // 建立head
    let thead = document.createElement('thead');
    data.thead.forEach((value, index) => {
      let th = document.createElement('th');
      th.textContent = value;
      thead.appendChild(th);      
    })

    // 计算sum后将数据更新
    data.students.forEach((student, index) => {
      student.sum = student.yuwen + student.math + student.english;
    });


    let tbody = document.createElement('tbody');
    data.students.forEach((student, index) => {
      let tr = document.createElement('tr');
      let studentkeys = Object.keys(student);
      for(let i=0; i<studentkeys.length; i++) {
        let td = document.createElement('td');
        td.textContent = student[studentkeys[i]];
        tr.appendChild(td);
      }
      tbody.appendChild(tr);
    });

    // 将标题和内容添加到表格中
    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
  }
  // 添加按钮的功能需要抽象出来，参数[1, 3 ,5]，即表示对第1、3、5列增加排序按钮
  function addSortButton (arr) {
    // 取出所有的th
    let ths = document.getElementsByTagName('th');
    for(let i=0;i<arr.length;i++) {
      let th = ths[arr[i]-1];
      let sorts = document.createElement('div');
      // 建一个升序按钮
      let sortup = document.createElement('i');
      sortup.className = 'fa fa-sort-asc';
      // 建一个降序按钮
      let sortdown = document.createElement('i');
      sortdown.className = 'fa fa-sort-desc';
      // 将两个按钮加到div中
      sorts.appendChild(sortup);
      sorts.appendChild(sortdown);
      // 加到th中
      th.appendChild(sorts);               
    }
  }
}