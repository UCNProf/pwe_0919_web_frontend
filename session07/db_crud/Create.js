var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'notes',
	password: '4x9airnnnBvjrjm0',
	database: 'website01'
});


connection.connect();

var newnote = [2,'New note', 'Content for new note'];
connection.query('INSERT INTO notes (user_id, title, content) VALUES (?,?,?)', newnote, function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});
 
connection.end();