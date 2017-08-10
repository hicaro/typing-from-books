var express = require('express'),
  router = express.Router();

router.get('/', function(req, res){
  var text = "Mom pointed her chopsticks at me. \"You see?\" she said. \"Right there. That's exactly what I am saying. You're way too easily embaressed. Your father and I are who we are. Accept it.\"";

  res.json({
    letters: text.split(''),
    length: text.length,
    title: "The Glass Castle: A Memoir by Jeannette Walls",
    url: "https://www.amazon.com/gp/product/074324754X/ref=as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=074324754X&linkCode=as2&tag=typingfromboo-20&linkId=ff3b2085c2d8df451982e6978c5fa225",
    image: "https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&MarketPlace=US&ASIN=074324754X&ServiceVersion=20070822&ID=AsinImage&WS=1&Format=_SL250_&tag=typingfromboo-20",
    promo: "The perennially bestselling, extraordinary, one-of-a-kind, \"nothing short of spectacular\" (Entertainment Weekly) memoir from one of the world’s most gifted storytellers."
  });
});

module.exports = router;
