var mysql = require('mysql');

var state = {
	db: null
};

exports.connection = function(done) {
	if (state.db) return done();
	state.db = mysql.createConnection({
		host: 'localhost',
		user: 'notes',
		password: '4x9airnnnBvjrjm0',
		database: 'website01'
	});
	done();
};

exports.get = function() {
  return state.db;
};