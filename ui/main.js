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

var request=new XMLHttpRequest();
request.onreadystatechange=function()
{
    if(request.readyState===XMLHttpRequest.DONE&&request.status===200)
    {
               var counter=request.responseText;
               counter=JSON.parse(counter);
               var count1=counter[0];
               update=count1['count'];
               var span=document.getElementById('count');
               span.innerHTML=update.toString();
    }
};
request.open('GET','http://sanjaykr1208.imad.hasura-app.io/test-db',true);
request.send(null);
var button=document.getElementById('counter');
button.onclick=function()
{
    var request=new XMLHttpRequest();
    request.onreadystatechange=function()
    {
        if(request.readyState===XMLHttpRequest.DONE&&request.status===200)
        {
                   var counter=request.responseText;
                   counter=JSON.parse(counter);
                   var count1=counter[0];
                   var man='count';
                   update=count1[man];
                   var span=document.getElementById('count');
                   span.innerHTML=update.toString();
                    
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
                console.log(text);
                text=JSON.parse(text);
                var list='';
                for(var i=0;i<text.length;i++)
                {
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
var log=document.getElementById('subpass');
log.onclick=function()
{
    var log=new XMLHttpRequest();
    log.onreadystatechange=function()
    {
        if(log.readyState===XMLHttpRequest.DONE)
        {
            if(log.status===200)
            {
                alert('Login Sucessful ');
            }   
            else if(log.status===403)
            {
                alert('Forbidden');
            }
            else if(log.status===500)
            {
                alert('UNknown error Occured');
            }
        }
    };
    var username=document.getElementById('username').value;
    var password=document.getElementById('pass').value;
    log.open('POST','http://sanjaykr1208.imad.hasura-app.io/login',true);
    log.setRequestHeader('Content-Type','application/json');
    log.send(JSON.stringify({username:username,password:password}));
};