var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'notes',
	password: '4x9airnnnBvjrjm0',
	database: 'website01'
});


connection.connect();
 
connection.query('SELECT * FROM users', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});

connection.query('SELECT * FROM notes', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});
 
connection.end();