var data = []; // 存放数据
var str = ""; // 更新字符串
var show = document.getElementById('show');

// 数据更新函数
function render(data){
    // 首先将上次渲染的结果清空
    show.innerHTML = "";
    for(let i=0; i<data.length; i++) {
        var item = document.createElement('div');
        item.textContent = data[i];
        item.style.height = data[i]*2 + 'px'; // 弱类型转换为string
        show.appendChild(item);
    }
    // 重新将input的值置为空
    document.getElementById('input').value = null; 
}
// 处理输入数据的函数
function validate() {
    // input需要共享给绑定的函数使用
    input = document.getElementById('input').value.trim();
    if(data.length >= 60) {
        alert('数据已满');
        return false;
    };
    if(input > 100 || input < 10) {
        alert('请输入10-100的数字');
        return false;
    }
    if(input === '') {
        alert('请输入数值后再点击');
        return false;
    };
    if(isNaN(input)) {
        alert('输入不合法');
        return false;
    }
    return true;
}
// 事件绑定
var lin = document.getElementById('leftIn').onclick = function() {
    if(!validate()) return;
    data.unshift(input);
    render(data);
}
var rin = document.getElementById('rightIn').onclick = function() {
    if(!validate()) return;
    data.push(input);
    render(data);
}
var lout = document.getElementById('leftOut').onclick = function() {
    data.shift();
    render(data);
}
var rout = document.getElementById('rightOut').onclick = function() {
    data.pop();
    render(data);
}
// 排序算法
document.getElementById('sort').onclick = function() {
    let length = data.length;
    for(let i=0; i<length-1; i++) {
        for(let j=0; j<length-1; j++) {
            if(data[j] > data[j+1]) {
                let temp = data[j];
                data[j] = data[j+1];
                data[j+1] = temp;
            }
        }
    }
    render(data);
}