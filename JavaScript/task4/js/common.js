// 公共变量区域
var show = document.getElementById('show');
var leftIn = document.getElementById('leftIn');
var rightIn = document.getElementById('rightIn');
var leftOut = document.getElementById('leftOut');
var rightOut = document.getElementById('rightOut');
var num = document.getElementById('input');

leftIn.onclick = function() {
    if(!num.value) {
        return false;
    };
    var item = document.createElement('div');
    item.textContent = num.value;

    if(show.children.length) {
        show.insertBefore(item, show.firstChild);
    } else {
        show.appendChild(item);
    }
    num.value = null;
}

rightIn.onclick = function() {
    if(!num.value) {
        return false;
    }; 
    var item = document.createElement('div');
    item.textContent = num.value;

    show.appendChild(item);
    num.value = null;
}

leftOut.onclick = function() {
    if(!show.children) return false;
    show.removeChild(show.firstChild);
}

rightOut.onclick = function() {
    if(!show.children) return false;
    show.removeChild(show.lastChild);
}