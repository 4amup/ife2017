var button = document.getElementById('search');

// 先验证才能有后面的内容
function validate (data, searchText) {
    if(data === "") {
        alert('请输入被查询的词组');
        return false;
    }
    if(searchText === "") {
        alert('请输入查询词');
        return false;
    }
    return true;
}

// 将data按照规矩拆开成一个数组
function dataInit (data) {
    return data.split(/[\r\;\:\,\，\、\s\t\n]/).filter(function(item) {
        return item; // 只要不空都可以返回
    });
}

button.onclick = function () {
    var data = document.getElementById('input').value;
    var searchText = document.getElementById('search-text').value;
    if(!validate(data, searchText)) return false;
    var data = dataInit(data);
    console.log(data);
    data.forEach(function(item) {
        document.write(document.createElement('p').textContent = item);
        if(item === searchText) {
            
        }
    })
}