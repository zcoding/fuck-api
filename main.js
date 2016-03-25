var koa   = require('koa');
var serve = require('koa-static');
var _     = require('koa-route');
var fs    = require('fs');
var path  = require('path');
var open  = require('open');

var app = koa();

var publicFolder = './assets/';
app.use(serve(path.resolve(__dirname, publicFolder)));

app.use(_.get('/', function *(next) {

  this.type = 'text/html';
  this.body = fs.createReadStream(path.resolve(__dirname, './web/index.html'));

}));

var port = 10240;

app.listen(port, function() {
  open(`http://localhost:${port}`);
});
