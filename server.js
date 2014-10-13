var express     	= require("express"),
    app         	= express(),
    server          = require('http').Server(app),
    router      	= express.Router(),
	path 			= require('path'),
	avicon 			= require('serve-favicon'),
    api         	= require('./api/server.js'),
    bodyParser  	= require('body-parser'),
    port        	= process.env.port || 4000,
    path        	= require('path'),
    ejslocals       = require('ejs-locals')
	logger 			= require('morgan'),
    engine          = require('ejs-locals'),
	cookieParser 	= require('cookie-parser');
	
app.use(router);
app.use('/api', api); // we attach our routes under /api

app.set('view engine', 'html');
app.engine('.html', engine);

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
  res.render('index.html')
});

app.get('/rsvp', function(req, res) {
  res.render('rsvp.html')
});

// Enable socket.io, making it part of the /api/* space
var io = require('socket.io').listen(server);

io.on('connection', function (socket) {
    // Keep track of which invitation each client is looking at
    var interestedInInvitationId;
    socket.on('registerInterest', function (data) {
        console.log("registerInterest: " + data);
        interestedInInvitationId = data;
    });

    api.on('invitationUpdate', function (item) {
        // Only send updates to the client if they care about it
        if (item.id === interestedInInvitationId) {
            socket.emit('invitationUpdate', item);
        }
    });
});

server.listen(port);
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