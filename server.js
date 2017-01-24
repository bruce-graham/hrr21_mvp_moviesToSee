var express = require('express');
var app = express();
var mongoose = require('mongoose');
var morgan = require('morgan');

app.use(express.static('./'));

mongoose.connect('mongodb://databaseusername1:GoodTimes5!@ds127439.mlab.com:27439/db_moves_to_see');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connect error:'));
db.once('open', function () {
  console.log('mongoDB connection is open');
})

app.get('/', function(req, res) {
  res.sendFile('index.html');
});


app.get('/movies', function (req, res){

  Movies.find(function(err, movies) {
    if (err) {
      res.send(err);
    }

    res.json(movies);
  })
});


app.post('/movies', function(req, res) {
  Movies.create({
    title: req.boyd.text,
    done: false
  }), function(err, movie) {
    if (err) {

      res.send(err);
    }

    Movies.find(function(err, movies) {
      if (err) {
        res.send(err);
      }

      res.json(movies);
    });
  }
});



app.listen(process.env.PORT || 8080, function() {
  console.log('Express listening on port process.env.PORT || 8080');
});

module.exports = db;
