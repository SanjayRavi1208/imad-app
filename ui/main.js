console.log('Loaded!');
//Moving Image
var register=document.getElementById('reg');
register.onclick=function()
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
            else
            {
                alert('UNknown error Occured');
            }
        }
    };
    var username=document.getElementById('username').value;
    var password=document.getElementById('pass').value;
    log.open('POST','http://sanjaykr1208.imad.hasura-app.io/create-user',true);
    log.setRequestHeader('Content-Type','application/json');
    log.send(JSON.stringify({username:username,password:password}));
};