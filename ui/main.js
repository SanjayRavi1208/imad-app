console.log('Loaded!');
var element=document.getElementById('main.text');
element.innerHTML='Idhoda KAAAIYAAA amukuda Bieber!!!';
//Moving Image
var img=document.getElementById('sansa');
var marginLeft=0;
function moveRight()
{
    marginLeft=marginLeft+10;
    sansa.style.marginLeft=marginLeft+'px';
}
sansa.onclick=function()
{
    var interval=setInterval(moveRight,50);
    img.style.marginLeft='100px';
}