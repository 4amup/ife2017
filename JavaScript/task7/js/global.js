let list = document.getElementsByTagName('div');
function* show(nodelist) {
  for(let i=0; i<nodelist.length; i++) {
    nodelist[i].removeAttribute('class');
  }
  for(let i=0; i<nodelist.length; i++) {
    yield nodelist[i].className = 'mark';
  }
}
let traversal = document.getElementById('traversal');
traversal.onclick = function() {
  let showit = show(list);
  let timer = setInterval("showit.next()", 500);
  if(showit.next().done === true) {
    clearInterval(timer);
  }
}