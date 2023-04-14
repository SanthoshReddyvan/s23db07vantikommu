var express = require('express');
const rose_controlers= require('../controllers/rose');
var router = express.Router();

/* GET home page. */
router.get('/', rose_controlers.rose_view_all_Page );

module.exports = router;