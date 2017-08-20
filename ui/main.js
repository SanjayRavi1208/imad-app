console.log('Loaded!');
var element=document.getElementById('main.text');
element.innerHTML="Don't touch me!!!..plzzzzz";
//Moving Image
var img=document.getElementById('sansa');
var marginLeft=0;
function moveRight()
{
    marginLeft=marginLeft+5;
    sansa.style.marginLeft=marginLeft+'px';
    if(marginLeft==500)
    marginLeft=0;
}
sansa.onclick=function()
{
    var interval=setInterval(moveRight,50);
    img.style.marginLeft='100px';
}