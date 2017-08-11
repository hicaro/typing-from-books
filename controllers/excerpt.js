var express     = require('express');
var router      = express.Router();
var bodyParser  = require('body-parser');
var Excerpt     = require('../models/excerpt');

router.use(bodyParser.urlencoded({extended: true}));

router.get('/', function(req, res){
  Excerpt.get(function(err, excerpt) {
    if(err) {
      var text = "Across the courtesy bay the white palaces of fashionable East Egg glittered along the water, and the history of the summer really begins on the evening I drove over there to have dinner with the Tom Bachanans.";
      return res.json({
        letters: text.split(''),
        length: text.length,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        url: "https://www.amazon.com/Great-Gatsby-F-Scott-Fitzgerald/dp/0743273567/ref=as_li_ss_il?_encoding=UTF8&psc=1&refRID=CXJPEVCD4ZM2ANRX4MQ5&linkCode=li3&tag=typingfromboo-20&linkId=114cc2ff0acc1cbce3205e0aae8fbb0a",
        image: "https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=0743273567&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1&tag=typingfromboo-20",
        promo: "The story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted \"gin was the national drink and sex the national obsession,\" it is an exquisitely crafted tale of America in the 1920s."
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
