var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('rose', { title: 'Search Results Rose' });
});

module.exports = router;