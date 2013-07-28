
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , results = require('./routes/results')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon(__dirname + '/public/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(function(req, res, next) {
  res.locals.url = req.url;
  next();
});
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
app.disable('x-powered-by');

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/create-result', results.create);
app.get('/results/:id', results.single);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Server listening on port ' + app.get('port'));
});
