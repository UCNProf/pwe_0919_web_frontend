var express = require('express');
var router = express.Router();
var db = require('../db');

/* GET users listing. */
router.get('/users', function(req, res, next) {
	db.get().query('SELECT id, name FROM users', function (error, results, fields) {
		res.json(results);
	});
});

router.get('/users/:userid', function(req, res, next) {
	var userid = req.params.userid;
	console.log(userid);
	db.get().query('SELECT id, name FROM users WHERE id = ?', [userid], function (error, results, fields) {
		res.json(results[0]);
	});
});


router.get('/notes', function(req, res, next) {
	var userid = req.session.user.id;
	db.get().query('SELECT id, uuid, date, title FROM notes WHERE user_id = ?', [userid], function (error, results, fields) {
		let obj = {};
		obj.status = 'SELECT';
		obj.notes = results;
		res.json(obj);
	});
});

/* post new note with title and content*/
router.post('/notes', function(req, res, next) {
	var userid = req.session.user.id;
	var title = req.body.title;
	var content = req.body.content;
	db.get().query('INSERT INTO notes (uuid, user_id, date, title, content) VALUES (UUID(), ?, NOW(), ?, ?)', [userid,title,content], function (error, results, fields) {
		// get note just created
		db.get().query('SELECT id, uuid, date, title, content FROM notes WHERE id = ?', [results.insertId], function (error, results, fields) {
			let obj = {};
			obj.status = 'INSERT';
			obj.note = results[0];
			res.json(obj);
		});
	});
});

/* get note by uuid */
router.get('/notes/:uuid', function(req, res, next) {
	var userid = req.session.user.id;
	var uuid = req.params.uuid;
	db.get().query('SELECT id, uuid, date, title, content FROM notes WHERE user_id = ? AND uuid = ?', [userid, uuid], function (error, results, fields) {
		let obj = {};
		obj.status = 'SELECT';
		obj.note = results[0];
		res.json(obj);
	});
});

/* update note with title and content*/
router.put('/notes/:uuid', function(req, res, next) {
	var userid = req.session.user.id;
	var uuid = req.params.uuid;
	var title = req.body.title;
	var content = req.body.content;
	db.get().query('UPDATE notes SET date = NOW(), title = ?, content = ? WHERE user_id = ? AND uuid = ?', [title,content,userid,uuid], function (error, results, fields) {
		// get note just created
		db.get().query('SELECT id, uuid, date, title, content FROM notes WHERE user_id = ? AND uuid = ?', [userid,uuid], function (error, results, fields) {
			let obj = {};
			obj.status = 'INSERT';
			obj.note = results[0];
			res.json(obj);
		});
	});
});

/* delete note by uuid */
router.delete('/notes/:uuid', function(req, res, next) {
	var userid = req.session.user.id;
	var uuid = req.params.uuid;
	db.get().query('DELETE FROM notes WHERE user_id = ? AND uuid = ?', [userid, uuid], function (error, results, fields) {
		let obj = {};
		obj.status = 'DELETE';
		obj.uuid = uuid;
		res.json(obj);
	});
});


module.exports = router;