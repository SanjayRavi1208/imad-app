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
                alert('Registration Sucessful ');
            }   
            else if(log.status===403)
            {
                alert('Forbidden');
            }
            else
            {
                alert('Unknown error Occured!!!Try Again...');
            }
        }
    };
    var username=document.getElementById('username').value;
    var password=document.getElementById('pass').value;
    log.open('POST','http://sanjaykr1208.imad.hasura-app.io/createuser',true);
    log.setRequestHeader('Content-Type','application/json');
    log.send(JSON.stringify({username:username,password:password}));
};
var login=document.getElementById('log');
login.onclick=function()
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
                alert('Invalid User');
            }
            else
            {
                alert('Unknown error Occured!!!Try Again...');
            }
        }
    };
    var username=document.getElementById('username').value;
    var password=document.getElementById('pass').value;
    log.open('POST','http://sanjaykr1208.imad.hasura-app.io/login',true);
    log.setRequestHeader('Content-Type','application/json');
    log.send(JSON.stringify({username:username,password:password}));
};