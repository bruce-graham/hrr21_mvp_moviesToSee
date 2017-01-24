var mongoose = require('mongoose');

var movieSchema = mongoose.Schema({
  title: String
});

var Movie = mongoose.model('Movie', movieSchema);

movieSchema.pre('save')