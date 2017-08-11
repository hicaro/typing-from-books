var express     = require('express');
var router      = express.Router();
var bodyParser  = require('body-parser');
var Excerpt     = require('../models/excerpt');

router.use(bodyParser.urlencoded({extended: true}));

router.get('/', function(req, res){
  Excerpt.get(function(err, excerpt) {
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
      letters: excerpt.text.split(''),
      length: excerpt.text.length,
      title: excerpt.title,
      author: excerpt.author,
      url: excerpt.url,
      image: excerpt.image,
      promo: excerpt.promo
    });
  });


});

module.exports = router;
