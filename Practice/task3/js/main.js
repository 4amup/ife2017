window.onload = () => {
  // 自定义一个university数据对象
  let obj = {
    "beijing": {
      "name": "北京",
      "university":  ["北京大学", "清华大学", "对外经贸大学", "北京航空航天大学", "北京理工大学"]      
    },
    "shanghai": {
      "name": "上海",
      "university": ["上海大学", "同济大学", "复旦大学", "东华大学"] 
    },
    "harbin": {
      "name": "哈尔滨",
      "university": ["哈尔滨工业大学", "哈尔滨工程大学", "哈尔滨理工大学", "哈尔滨商业大学", "哈尔滨师范大学"]
    },
    "dalian": {
      "name": "大连",
      "university": ["大连理工大学", "大连海事大学", "大连工业大学"]
    }
  }
  // 先定义几个常用的DOM对象
  let role = document.getElementById('role')
  let generator = document.getElementById('generator')
  role.addEventListener('click', toggleRole);
  
  // 监听role改变的事件函数
  function toggleRole (ev) {
    let tagName = ev.target.tagName.toLowerCase();
    if (tagName === 'input') {
      let role = ev.target.value;
      display(role);
    }
  }
  
  // role改变时，为id=generator的div元素显示正确的元素
  function display (role) {
    switch (role) {
      case 'student': {
        // 先清除里面的旧的元素
        generator.innerHTML = '';
        // 先生成一个label元素
        let label = document.createElement('label');
        label.textContent = '学校：';
        label.setAttribute('for', 'university');
        generator.appendChild(label);
        // 生成一个城市选择
        let citySelect = document.createElement('select');
        citySelect.setAttribute('name', 'city');
        // 为city添加数据
        let citys = Object.keys(obj);
        for (let i=0; i<citys.length; i++) {
          let city = citys[i];
          let option = document.createElement('option');
          option.setAttribute('value', city);
          option.innerHTML = obj[city].name;
          citySelect.appendChild(option);
        }
        generator.appendChild(citySelect);

        // 生成一个该城市的大学select
        let uniSelect = document.createElement('select');
        uniSelect.name = 'university';
        generator.appendChild(uniSelect);
        // 为其添加数据
        let unisOfbj = obj.beijing.university;
        // 调用函数渲染options
        renderOption(unisOfbj, uniSelect);
        
        citySelect.onchange = function () {
          // 一旦改变，就取一下当前城市的值，然后重新渲染option
          let city = citySelect.value;
          uniSelect.innerHTML = '';
          
          let unis = obj[city].university;
          renderOption(unis, uniSelect);
        }
        break;
      }
      case 'social': {
        // 先清除里面的旧的元素
        generator.innerHTML = '';
        // 建立label新元素
        let label = document.createElement('label');
        label.textContent = '就业单位：';
        label.setAttribute('for', 'company');
        // 建立input新元素
        let input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('name', 'company');
        // 添加到generator中
        generator.appendChild(label);
        generator.appendChild(input);
        break;
      }
    }
  }

  // 依据城市，渲染相应的大学option
  function renderOption (data, parent) {
    for(let i=0; i<data.length; i++) {
      let option = document.createElement('option');
      option.value = data[i];
      option.innerHTML = data[i];
      parent.appendChild(option);
    }
  }
}