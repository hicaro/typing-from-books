var express     = require('express');
var path        = require('path');
var bodyParser  = require('body-parser');
var compression = require('compression');

// create an express instance
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 3000;

// create an urlencoded parser
var parseUrlEncoded = bodyParser.urlencoded({ extended: false });

// add gzip compression
app.use(compression);

// set the view engine to ejs
//app.set('view engine', 'ejs');

// make express look in the public directory for assets (css/js/img)
app.use(express.static('./public'));

// set the home page route
app.use(require('./controllers'));

// set 404 in case of not found
app.use(function(req, res) {
  res.status(404).send('');
});

app.listen(port);
