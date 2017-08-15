var db = require('../db');

var mongoose  = require('mongoose');
var Schema    = new mongoose.Schema({
  user: String,
  lastExcerpt: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' }
});


module.exports = mongoose.model("User", Schema);
