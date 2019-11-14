var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express '+ req.session.user.name, id: 'home' });
});

router.get('/login', function(req, res, next) {
  res.render('index/login', { title: 'Login', id: 'login' });
});

router.post('/login', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  db.get().query('SELECT id, name FROM users WHERE name = ? AND password = SHA2(?,224)', [username, password], function (error, results, fields) {
		if (error) throw error;
		console.log(results);
		if(results.length == 1){
  			req.session.user = results[0];
		}
		res.redirect('/');
	});
});

module.exports = router;
