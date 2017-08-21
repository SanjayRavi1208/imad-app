console.log('Loaded!');
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
    var interval=setInterval(moveRight,500);
}
var counter=0;
var button=document.getElementById('counter');
button.onclick=function()
{
    counter=counter+1;
    var span=document.getElementById('count');
    span.innerHTML=counter.toString();
}