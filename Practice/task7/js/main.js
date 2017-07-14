window.onload = function () {
  //需要一个json格式的数据
  // 先自己写一个json格式的数据做测试
  let gradeData = {
    "xiaoming": {
      "name": "小明",
      "score": {
        "language": {
          "name": "语文",
          "grade": 80
        },
        "math": {
          "name": "数学",
          "grade": 90
        },
        "english": {
          "name": "英文",
          "grade": 70
        }
      }
    },
    "xiaohong": {
      "name": "小红",
      "score": {
        "language": {
          "name": "语文",
          "grade": 90
        },
        "math": {
          "name": "数学",
          "grade": 60
        },
        "english": {
          "name": "英文",
          "grade": 90
        }
      }
    },
    "xiaoliang": {
      "name": "小亮",
      "score": {
        "language": {
          "name": "语文",
          "grade": 60
        },
        "math": {
          "name": "数学",
          "grade": 100
        },
        "english": {
          "name": "英文",
          "grade": 70
        }
      }
    }
  }

  console.log(JSON.stringify(gradeData));

  document.body.appendChild(generatorTable(gradeData));

  // 设置函数，参数是json数据，在dom中生成表格
  function generatorTable (data) {
    //
    let table = document.createElement('table');
    return table;
  }
}