console.log('Loaded!');
var element=document.getElementById('main.text');
element.innerHTML='newvalue';
//Moving Image
var img=document.getElementById('sansa');
var marginLeft=0;
function moveRight()
{
    marginLeft=marginLeft+100;
    sansa.style.marginLeft=marginLeft+'px';
}
sansa.onclick=function()
{
    var interval=setInterval(moveRight,100);
    img.style.marginLeft='100px';
}