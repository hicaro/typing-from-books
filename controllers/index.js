var express = require('express'),
  router = express.Router(),
  path = require('path');

router.use('/book', require('./book'));

router.get('/', function(req, res){
    res.sendFile(path.join(__dirname, '../views', 'index.html'));
});

module.exports = router;
