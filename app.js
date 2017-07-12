var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var session = require("express-session");

var user = require("./user");
var post = require("./post");

var app = express();
app.use(express.static(path.join(__dirname,"/html")));
app.use(bodyParser.json());
app.use(session({
    secret:"my-secret"
}));
var sessions;

app.get("/",function (req,res) {
    res.sendFile(__dirname+"/html/index.html");
});

app.post('/signin', function (req, res) {
    sessions = req.session;
    var user_name = req.body.email;
    var password = req.body.password;

    user.validateSignIn(user_name, password, function (result) {
        if (result) {
            sessions.username = user_name;
            res.send('success');
        }
    });
});

app.post("/signup",function (req,res) {
    user.signup(req.body.name,req.body.email,req.body.password);
});


app.get("/home",function (req,res) {
    if(sessions && sessions.username){
        res.sendFile(__dirname+"/html/home.html");
    }
    else{
        res.send("unauthorized!!!");
    }
});


app.post("/addPost",function (req,res) {
    var title = req.body.title;
    var subject = req.body.subject;
    post.addPost(title,subject,function (result) {
        res.send(result);
    });
});

app.post('/getpost', function (req, res) {
    post.getPost(function(result){
        res.send(result);
    });
});

app.listen(7777,function(){
    console.log("Started listening on port", 7777);
});