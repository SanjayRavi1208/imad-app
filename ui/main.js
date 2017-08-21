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
    console.log("FUCKKK");
    var request=new XMLHttpRequest();
    request.onreadystatechange=function()
    {
        if(request.readyState===XMLHttpRequest.DONE)
        {
            if(request.status===200)
               { 
                   console.log('jhgjshdgjfsh');
                   var counter=request.responseText;
                var span=document.getElementById('count');
                span.innerHTML=counter.toString();
               }
        }
    };
};
request.open('GET','http://sanjaykr1208.imad.hasura-app.io/counter');
request.send(null);