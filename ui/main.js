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
var change=document.getElementById('uld');
var nameinput=document.getElementById('frm');
var inputname=nameinput.value;
sub.onclick=function()
{
    var req=new XMLHttpRequest();
    req.onreadystatechange=function()
    {
        if(request.readystate==XMLHttpRequest.DONE&&request.status===200)
        {
            var text=req.responseText;
            text=JSON.parse(text);
            var list='';
            for(var i=0;i<text.length;i++)
            {
                list+='<li>'+text[i]+'</li>';
            }
            change.innerHTML=list;
            
        }
    }
    request.open('GET','http://sanjaykr1208.imad.hasura-app.io/sub-name?name='+nameinput,true);
    request.send(null);
};