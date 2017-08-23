var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var config={
  user:'sanjaykr1208',
  databse:'sanjaykr1208',
  host:'db.imad.hasura.io',
  port:'5432',
  password:process.env.DB_PASSWORD
};
var app = express();
app.use(morgan('combined'));
var articles={
    'article-one':{
    title:'Article-One',
    heading:'Article-1',
    date:'Aug-20-2017',
    content:` <p>
                This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.
            </p>
            <p>
                This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.
            </p>
            <p>
                This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.
            </p>`
},
    'article-two':{
    title:'Article-Two',
    heading:'Article-2',
    date:'Aug-21-2017',
    content:` <p>
                This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.
            </p>
            <p>
                This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.
            </p>
            <p>
                This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.
            </p>`
},
    'article-three':{
    title:'Article-Three',
    heading:'Article-3',
    date:'Aug-22-2017',
    content:` <p>
                This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.
            </p>
            <p>
                This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.
            </p>
            <p>
                This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.This is the Url that i made.
            </p>`
}
};
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
                    ${date}
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
var pool=new Pool(config);

app.get('/test-db', function (req, res)
{
    pool.query('SELECT * FROM test',function(err,result)
    {
        if(err){
            res.status(500).send(err.toString());
        }
        else
        {
            res.send(JSON.stringify(result));
        }
    });
});
app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
var counter=0;
app.get('/counter',function(req,res)
{
    counter=counter+1;
    res.send(counter.toString());
});
var names=[];
app.get('/sub-name',function(req,res)
{
    var nam=req.query.name;
    names.push(nam);
    res.send(JSON.stringify(names));
    
});
app.get('/:articleName',function(req,res)
{
    var articleName=req.params.articleName;
      res.send(createTemplate(articles[articleName]));
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
