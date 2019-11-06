var mysql = require('mysql');

var state = {
	db: null
};

exports.connection = function(done) {
	if (state.db) return done();
	state.db = mysql.createConnection({
		host: 'localhost',
		user: 'website01',
		password: 'ZcS@D4f#8nDt@u',
		database: 'website01'
	});
	done();
};

exports.get = function() {
  return state.db;
};