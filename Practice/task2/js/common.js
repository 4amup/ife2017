// nodeList并不是数组，不能使用forEach、map和filter等方法

var inputs = document.getElementsByTagName('input');
var form = document.getElementsByTagName('form')[0];
var helpBlock = document.getElementsByClassName('help-block');
var flag = {
    name: false,
    pw1: false,
    pw2: false,
    email: false,
    tel: false
};

// 先把tips隐藏起来
for(let i=0; i<helpBlock.length; i++) {
    helpBlock[i].style.display = 'none';
}
// focus回调函数
function focusFn (event) {
    let tagName = event.target.tagName.toLowerCase();
    if(tagName === 'input') {
        let helpBlock = event.target.parentNode.getElementsByTagName('span')[0];
        helpBlock.style.display = 'block';
    }
}
// blur回调函数
function blurFn (event) {
    let tagName = event.target.tagName.toLowerCase();
    if(tagName === 'input') {
        validate(event.target.id, event.target.value, event.target);
    }
}

// 全部校验函数
function validate(id, item, target) {
    let helpBlock = target.parentNode.getElementsByTagName('span')[0];
    let formGroup = target.parentNode.parentNode;

    // 将输入框变成成功的绿色或错误的红色
    function successOrFail (node, i) {
        let oldClass = "form-group";
        if(i) {
            node.className = oldClass + ' ' + 'has-success';
        } else {
            node.className = oldClass + ' ' + 'has-error';
        }    
    }

    // 密码校验，可复用
    function pwPass (password) {
        if (!password) {
            helpBlock.textContent = '密码不能为空';
            successOrFail(formGroup, false);
            return;
        }
        if(password.length<6) {
            helpBlock.textContent = '密码太短，请输入6位以上密码';
            successOrFail(formGroup, false);
            return;
        };
        if(password.length>16) {
            helpBlock.textContent = '密码太长，超过16位了你还咋记？';
            successOrFail(formGroup, false);
            return;
        };
        helpBlock.textContent = '密码可用';
        successOrFail(formGroup, true);
        return true;
    }
    // 针对不同的input来进行不同的校验
    switch (id) {
        case "inputname": {
            if (!item) {
                helpBlock.textContent = '名字不能为空';
                successOrFail(formGroup, false);
                return;
            }
            if(item.length<4) {
                helpBlock.textContent = '字符数小于4';
                successOrFail(formGroup, false);
                return;
            }
            if(item.length>16) {
                helpBlock.textContent = '字符数大于16';
                successOrFail(formGroup, false);
                return;
            }
            helpBlock.textContent = '通过';
            successOrFail(formGroup, true);
            flag.name = true;
            break;
        }
        
        case "password1": {
            pwPass(item);
            flag.pw1 = true;
            break;
        }
            
        case "password2": {
            if(!pwPass(item)) return;
            let pass1 = document.getElementById('password1').value;
            if(item !== pass1) {
                helpBlock.textContent = '两次密码输入不一致';
                successOrFail(formGroup, false);
                return;
            }
            helpBlock.textContent = '密码确认无误';
            successOrFail(formGroup, true);
            flag.pw2 = true;
            break;
        }
        case "email": {
            let flag = item.match(/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/ );
            if(!flag) {
                helpBlock.textContent = '邮箱格式不正确';
                successOrFail(formGroup, false);
                return;
            }
            helpBlock.textContent = '邮箱输入正确';
            successOrFail(formGroup, true);
            flag.email = true;
            break;
        }
        case "tel": {
            let flag = item.match(/^1[3|4|5|7|8][0-9]{9}$/);
            if(!flag) {
                helpBlock.textContent = '手机号输入错误';
                successOrFail(formGroup, false);
                return;
            }
            helpBlock.textContent = '手机输入正确';
            successOrFail(formGroup, true);
            flag.tel = true;
            break;
        }
    }
}

// 为input绑定事件，由于blur、focus不会冒泡，所以设置为捕获阶段
document.body.addEventListener('focus', focusFn, true);
document.body.addEventListener('blur', blurFn, true);
document.getElementById('submit').onclick = function() {
    if(flag.name && flag.pw1 && flag.pw2 && flag.email && flag.tel) {
        alert('校验通过');
    } else {
        alert('校验失败');
    }
}