var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express '+ req.session.username, id: 'home' });
});

router.get('/login', function(req, res, next) {
  res.render('index/login', { title: 'Login', id: 'login' });
});

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  db.get().query('SELECT * FROM users WHERE name = ? AND password = ?', [username, password], function (error, results, fields) {
		console.log(results);
  		req.session.username = username;
		res.redirect('/');
	});
});

module.exports = router;
