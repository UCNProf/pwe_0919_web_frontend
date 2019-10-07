var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('index/login', { title: 'Login' });
});

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  res.render('index/login', { title: 'Login - '+username });
});

module.exports = router;
