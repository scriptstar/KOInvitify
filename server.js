var express     = require("express"),
    router      = express.Router(),
    api         = require('./api/server.js'),
    bodyParser  = require('body-parser'),
    app         = express(),
    port        = process.env.port || 4000,
    path        = require('path'),
    ejsMiddleware = require('ejs-middleware');

app.use(router);
app.use('/api', api); // we attach our routes under /api

//app.use(ejsMiddleware(__dirname + '/static', 'html', app)); // Serve .html files via EJS renderer
app.engine('.html', require('ejs').renderFile);
app.use(express.static(__dirname + '/static')); // For other requests, just serve /static


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