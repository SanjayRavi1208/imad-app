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
                   span.innerHTML=counter;
        }
    };
    request.open('GET','http://sanjaykr1208.imad.hasura-app.io/counter',true);
    request.send(null);
};
var submit=document.getElementById('sub');
submit.onclick=function()
{
    var request=new XMLHttpRequest();
    request.onreadystatechange=function()
    {
        if(request.readyState===XMLHttpRequest.DONE)
        {
            if(request.status===200)
            {
                var text=request.responseText;
                text=JSON.parse(text);
                var list='';
                for(var i=0;i<text.length;i++)
                {
                    console.log("nmann");
                    list+='<li>'+text[i]+'</li>';
                }
                var change=document.getElementById('udlist');
                change.innerHTML=list;
            }   
        }
    };
    var nameinput=document.getElementById('name');
    var name1=nameinput.value;
    request.open('GET','http://sanjaykr1208.imad.hasura-app.io/sub-name?name='+name1,true);
    request.send(null);
};