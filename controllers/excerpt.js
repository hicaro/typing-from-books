var express = require('express'),
  router = express.Router();

router.get('/', function(req, res){
  var text = "I'm pretty new to Vue.js and I'm trying to accomplish what seems to be a simple thing but I'm, having trouble. Essentially, I need it so every time a component is loaded into the DOM, one of it's methods fire. Here is my current code, I've tried to use v-on:load but it doesn't seem to work.";
  var words  = text.split(' ');
  var spelled = [];

  words.forEach(function(item, index){
    spelled.push(item.split(''));
  });

  res.json({
    letters: spelled,
    length: text.length
  });
});

module.exports = router;
