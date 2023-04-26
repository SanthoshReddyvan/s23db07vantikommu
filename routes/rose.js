var express = require('express');
const rose_controlers= require('../controllers/rose');
var router = express.Router();


// redirect to login.
const secured = (req, res, next) => {
if (req.user){
return next();
}
req.session.returnTo = req.originalUrl;
res.redirect("/login");
}

/* GET home page. */
router.get('/', rose_controlers.rose_view_all_Page );

/* GET detail rose page */
router.get('/detail',secured, rose_controlers.rose_view_one_Page);

/* GET create rose page */
router.get('/create',secured, rose_controlers.rose_create_Page);

/* GET create update page */
router.get('/update',secured, rose_controlers.rose_update_Page);

/* GET delete costume page */
router.get('/delete',secured, rose_controlers.rose_delete_Page);

module.exports = router;