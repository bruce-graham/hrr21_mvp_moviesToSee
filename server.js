var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var overRide = require('method-override');
var morgan = require('morgan');

app.use(express.static('./'));

mongoose.connect('mongodb://databaseusername1:GoodTimes5!@ds127439.mlab.com:27439/db_moves_to_see');

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

app.get('api/movies', function (req, res){

});

app.listen(8080, function() {
  console.log('Express listening on port 8080');
});
