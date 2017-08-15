var db = require('../db');

var mongoose  = require('mongoose');
var Schema    = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  image: String,
  promo: String,
  text: String
});

// Finds a random excerpt based on how many there are in the collection
Schema.statics.random = function(cb) {
  this.count(function(err, count) {
    if (err) {
      return cb(err);
    }

    var rand = Math.floor(Math.random() * count);
    this.findOne().skip(rand).exec(cb);

  }.bind(this));
};

// Finds the 'next excerpt'
Schema.methods.next = function(cb) {
  var model = this.model("Book");
  model.findOne().where('_id').gt(this._id).exec(function(err, excerpt) {
    if (err) {
      throw err;
    }

    if (excerpt) {
      cb(null, excerpt);
    } else {
      // If excerpt is null, we've wrapped around.
      model.findOne(cb);
    }
  });
};

var Book = mongoose.model('Book', Schema);

module.exports.get = function(cb) {
  Book.random(cb);
};
