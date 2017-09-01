var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var bodyParser=require('body-parser');
var config={
  user:'sanjaykr1208',
  databse:'sanjaykr1208',
  host:'db.imad.hasura-app.io',
  port:'5432',
  password:process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
function createTemplate(data)
{
    var title=data.title;
    var date=data.date;
    var heading=data.heading;
    var content=data.content;
    var htmltemplate=`
    <html>
        <head>
            <title>
                ${title}
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link href="/ui/style.css" rel="stylesheet"/>
        </head>
        <body>
            <div class="container">
                <div>
                    <a href="/">Home</a>
                </div>
                <hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date.toDateString()}
                </div>
                <div>
                ${content}
                </div>
            </div>
        </body>
    </html>`;
    return htmltemplate;
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
function hash (input,salt)
{
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ["pbkdf2","10000",salt,hashed.toString('hex')].join('$');
}
app.get('/hash/:input',function(req,res){
    var hashedString=hash(req.params.input,'this-is-some-random-string');
    res.send(hashedString);
});
var pool=new Pool(config);
app.post('/createuser',function(req,res)
{
   var username=req.body.username;
   var password=req.body.password;
   var salt=crypto.randomBytes(128).toString('hex');
   var dbstring=hash(password,salt);
   pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbstring],function(err,result)
    {
        if(err){
            res.status(500).send(err.toString());
        }
        else
        {
            res.send('User sucessfully created : '+username);
        }
    });
});
app.post('/login',function(req,res)
{
   var username=req.body.username;
   var password=req.body.password;
   pool.query('SELECT * from "user" where username=$1',[username],function(err,result)
    {
        if(err){
            res.status(500).send(err.toString());
        }
        else
        {
            if(result.rows.length===0)
            {
                res.send(403).send("Username does not Exists!!!");
            }
            else
            {
                var dbstring=result.rows[0].password;
                var salt=dbstring.split('$')[2];
                var hashed=hash(password,salt);
                if(hashed===dbstring)
                {
                    res.send("credentials Coreect!!!!");
                }
                else
                {
                    res.send(403).send("Hey u r not the user!!!!");
                }
            }
        }
    });
});
app.get('/test-db', function (req, res)
{
    pool.query("select count,username,password,id from counter1 where id=1",function(err,result)
    {
        if(err){
            res.status(500).send(err.toString());
        }
          if(result.rows.length===0)
            {
                res.status(404).send('Article Not found');
            }
        else
        {
            res.send(JSON.stringify(result.rows));
        }
    });
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
app.get('/counter',function(req,res)
{
    pool.query("update counter set count=count+1 where id=1",function(err,result)
    {
        if(err){
            res.status(500).send(err.toString());
        }
    });
   pool.query("select count from counter where id=1",function(err,result)
    {
        if(err){
            res.status(500).send(err.toString());
        }
          if(result.rows.length===0)
            {
                res.status(404).send('Article Not found');
            }
        else
        {
            res.send(JSON.stringify(result.rows));
        }
    });
});
var names=[];
app.get('/sub-name',function(req,res)
{
    var nam=req.query.name;
    names.push(nam);
    res.send(JSON.stringify(names));
    
});

app.get('/articles/:articleName',function(req,res)
{
    //var articledata=
    pool.query("SELECT * FROM article WHERE title =$1",[req.params.articleName],function(err,result)
    {
        if(err){
            res.status(500).send(err.toString());
        }
        else
        {
           if(result.rows.length===0)
            {
                res.status(404).send('Article Not found');
            }
            else
            {
                     var articleData=result.rows[0];
                    res.send(createTemplate(articleData));
                 //   res.send(JSON.stringify(result.rows));
            }
        }
    });

});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
