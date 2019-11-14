var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET users listing. */
router.get('/', function(req, res, next) {
	var userid = req.session.user.id;
	db.get().query('SELECT id, uuid, date, title FROM notes WHERE user_id = ?', [userid],  function (error, results, fields) {
		//console.log(results);
		res.render('notes/index', { title: 'Notes', id: 'notes', notes: results });
	});
});

module.exports = router;