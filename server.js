var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require("body-parser");

app.use(express.static('./'));

mongoose.connect('mongodb://databaseusername1:GoodTimes5!@ds127439.mlab.com:27439/db_moves_to_see');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connect error:'));
db.once('open', function () {
  console.log('mongoDB connection is open');
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var Movie = mongoose.model('movies', {title: String, done: Boolean});

app.get('/', function(req, res) {
  res.sendFile('index.html');
});

app.get('/movies', function(req, res) {
  mongoose.model('movies').find(function(err, movies) {
    if (err) {
      res.send(err);
    }
    res.send(movies);
  });
});

app.post('/movies', function(req, res) {
  mongoose.model('movies').find(function(err, movies) {

    console.log(req.body, 'req.body in app.post /movies');

    var title = req.body.title;
    var done = req.body.done;

    if (err) {
      res.send(err);
    }
    var newMovie = new Movie({
      title: title,
      done: done
    })
    newMovie.save();
  });
});

app.post('/movies:delete', function (req, res) {
  mongoose.model('movies').find(function(err, movies) {
    var title = req.body.title;

    Movie.find({title: title}).remove(function (err) {
      if (err) {
        return handleError(err);
      }
      console.log(title, title + ' was DELETED in /movies:delete');
    });
  });
});


app.listen(process.env.PORT || 8080, function() {
  console.log('Express listening on port process.env.PORT || 8080');
});

module.exports = db;
