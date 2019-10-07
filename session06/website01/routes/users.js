var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
	db.get().query('SELECT * FROM users', function (error, results, fields) {
		//console.log(results);
		res.render('users/index', { title: 'Users', id: 'users', users: results });
	});
});

module.exports = router;
