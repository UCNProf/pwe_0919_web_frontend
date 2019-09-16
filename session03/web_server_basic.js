const {createServer} = require("http");
const qs = require("querystring");
const fs = require("fs");
const url = require("url");

let writeresponse = (response, respcode, body, data) => {
	response.writeHead(respcode, {"Content-Type": "text/html"});
	data = data || {};
	body = eval('`'+body+'`');
	response.write(body);
	response.end();
};

let server = createServer((request, response) => {
	
	let thisurl = url.parse(request.url, true);
	let file = thisurl.pathname.substring(1) || 'index.html';
	console.log(thisurl);

	fs.readFile(file, 'utf-8', (err, data) => {
		if (!err) {
			if(request.method == 'POST') {
				var body = '';
				
				request.on('data', function (data) {
					body += data;
					// 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
					if (body.length > 1e6) { 
						// FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
						request.connection.destroy();
					}
				});
				request.on('end', function () {
					// body has the data
					let dataobj = qs.parse(body);
					console.log(dataobj);
					writeresponse(response, 200, data, dataobj);
				});
			} else {
				writeresponse(response, 200, data);
			}
		} else {
			writeresponse(response, 404, "ups...");
		}
	});
});

server.listen(8000);

console.log("Listening! (port 8000)");