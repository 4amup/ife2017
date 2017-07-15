window.onload = function () {
  //需要一个json格式的数据
  // 先自己写一个json格式的数据做测试
  // zh属性表示中文
  let gradeData = {
    "xiaoming": {
      "name": {
        "zh": "姓名",
        "value": "小明"
      },
      "score": {
        "language": {
          "zh": "语文",
          "grade": 80
        },
        "math": {
          "zh": "数学",
          "grade": 90
        },
        "english": {
          "zh": "英文",
          "grade": 70
        }
      }
    },
    "xiaohong": {
      "name": {
        "zh": "姓名",
        "value": "小红"
      },
      "score": {
        "language": {
          "zh": "语文",
          "grade": 90
        },
        "math": {
          "zh": "数学",
          "grade": 60
        },
        "english": {
          "zh": "英文",
          "grade": 90
        }
      }
    },
    "xiaoliang": {
      "name": {
        "zh": "姓名",
        "value": "小亮"
      },
      "score": {
        "language": {
          "zh": "语文",
          "grade": 60
        },
        "math": {
          "zh": "数学",
          "grade": 100
        },
        "english": {
          "zh": "英文",
          "grade": 70
        }
      }
    }
  }
  gradeData = JSON.stringify(gradeData);

  let container = document.getElementsByClassName('container')[0];
  container.appendChild(generatorTable(gradeData));

  // 设置函数，参数是json数据，在dom中生成表格
  function generatorTable (data) {
    let table = document.createElement('table');
    let grade = JSON.parse(data);
    console.log(grade);
    
    let keys = Object.keys(grade);
    // 先取第一个对象，把相应的名称取出来。
    let xiaoming = grade[keys[0]];
    let header = [];
    header.push(xiaoming.name.zh);
    header.push(xiaoming.score.language.zh);
    header.push(xiaoming.score.math.zh);
    header.push(xiaoming.score.english.zh);
    header.push('总分');

    // 建立head
    let thead = document.createElement('thead');
    header.forEach((value, index) => {
      let th = document.createElement('th');
      th.textContent = value;
      
      let sorts = document.createElement('div');
      let sortup = document.createElement('i');
      sortup.className = 'fa fa-sort-asc';
      let sortdown = document.createElement('i');
      sortdown.className = 'fa fa-sort-desc';
      sorts.appendChild(sortup);
      sorts.appendChild(sortdown);
      
      th.appendChild(sorts);
      thead.appendChild(th);
    });

    let tbody = document.createElement('tbody');

    for(let i=0; i<keys.length; i++) {
      // 建立一行
      let tr = document.createElement('tr');
      // td数据先存数组
      let arr = [];
      arr.push(grade[keys[i]].name.value);
      arr.push(grade[keys[i]].score.language.grade);
      arr.push(grade[keys[i]].score.math.grade);
      arr.push(grade[keys[i]].score.english.grade);
      arr.push(arr[1]+arr[2]+arr[3]);
      // 循环创建td
      arr.forEach((value, index) => {
        let td = document.createElement('td');
        td.innerHTML = value;
        tr.appendChild(td);
      });
      // 将创建的这行添加到table中
      tbody.appendChild(tr);
    }

    // 将标题和内容添加到表格中
    table.appendChild(thead);
    table.appendChild(tbody);
    return table;
  }
}