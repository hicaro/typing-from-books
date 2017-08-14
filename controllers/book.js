var express     = require('express');
var router      = express.Router();
var bodyParser  = require('body-parser');
var Book     = require('../models/book');

router.use(bodyParser.urlencoded({extended: true}));

router.get('/', function(req, res){
  Book.get(function(err, book) {
    if(err) {
      return res.json({
        letters: "",
        length: 0,
        title: "",
        author: "",
        url: "",
        image: "",
        promo: ""
      });
    }

    res.json({
      letters: book.text.split(''),
      length: book.text.length,
      title: book.title,
      author: book.author,
      url: book.url,
      image: book.image,
      promo: book.promo
    });
  });


});

module.exports = router;
