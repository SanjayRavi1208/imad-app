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
};
var button=document.getElementById('counter');
button.onclick=function()
{
    var request=new XMLHttpRequest();
    request.onreadystatechange=function()
    {
        if(request.readyState===XMLHttpRequest.DONE&&request.status===200)
        {
                   var counter=request.responseText;
                   var span=document.getElementById('count');
                   span.innerHTML=counter.toString();
        }
    };
    request.open('GET','http://sanjaykr1208.imad.hasura-app.io/counter',true);
    request.send(null);
};
var submit=document.getElementById('sub');
sub.onclick=function()
{
    console.log("asdaskfj");
    var arr=['sanjay','arsath','sathvik'];
    var name=document.getElementById('uld');
    var list='';
    for(var i=0;i<arr.length;i++)
    {
        list=list+'<li>'+arr[0]+'<li>';
    }
    name.innerHTML=list;
};