// nodeList并不是数组，不能使用forEach、map和filter等方法

var inputs = document.getElementsByTagName('input');
var form = document.getElementsByTagName('form')[0];
var helpBlock = document.getElementsByClassName('help-block');

// 先把tips隐藏起来
for(let i=0; i<helpBlock.length; i++) {
    helpBlock[i].style.display = 'none';
}

form.addEventListener('focus', focusFn, false);
form.addEventListener('blur', blurFn, false);

function focusFn (event) {
    var tagName = event.target.tagName;
    if(tagName === 'input') {
        event.target.style.display = 'block';
    }
}

function blurFn (event) {
    var tagName = event.target.tagName;
    if(tagName === 'input') {
        console.log('blur');
    }
}