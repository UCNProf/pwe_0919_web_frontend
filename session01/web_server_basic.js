const {createServer} = require("http");
const fs = require("fs");

let server = createServer((request, response) => {
	response.writeHead(200, {"Content-Type": "text/html"});

	let file = request.url.substring(1);
	console.log(file);

	fs.readFile(file, 'utf-8', (err, data) => {
	if (err) throw err;
	
	console.log(data);
	response.write(data);
	response.end();
	});
	//response.write(`<h1>Hello!</h1><p>You asked for <code>${request.url}</code></p>`);
});

server.listen(8000);

console.log("Listening! (port 8000)");