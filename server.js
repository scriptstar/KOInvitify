var express     	= require("express"),
    router      	= express.Router(),
	path 			= require('path'),
	avicon 			= require('serve-favicon'),
    api         	= require('./api/server.js'),
    bodyParser  	= require('body-parser'),
    app         	= express(),
    port        	= process.env.port || 4000,
    path        	= require('path'),
    ejs 			= require('ejs'),
	logger 			= require('morgan'),
	cookieParser 	= require('cookie-parser');
	

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(router);
app.use('/api', api); // we attach our routes under /api
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.render('index', {title:'Hello World'})
});

app.listen(port);
console.log("App active on localhost:" + port);

/*
http://stackoverflow.com/questions/17173286/how-to-mount-app-get-routes-on-a-particular-path-prefix
*/

//express version 3.x
/*
var express = require('express'),    
    router = express.Router(),
    http = require('http'),
    api = require('./api/server.js'),
    bodyParser = require('body-parser'),
    app = express();

app.use(bodyParser())
app.use(router);
app.use('/api', api);

app.get('/', function (req, res) {
  res.send('You are on the root page');
});

http.createServer(app).listen(4000, function(){
  console.log('Express server listening on port 4000. Point browser to route /api');
});
*/