const http = require('http');
const fs = require('fs');
//const iconv = require('iconv-lite');
const path = require('path');
const utils = require('./utils.js');


var getClientIp = function (req) {
	return req.headers['x-real-ip'] || req.headers['x-forwarded-for'] ||
		req.connection.remoteAddress ||
		req.socket.remoteAddress ||
		req.connection.socket.remoteAddress;
}

function app(options) {
	const PORT = options.port;
	console.log("PORT:" + PORT);
	const FILE_ROOT_DIR = options.fileRoot || "./";
	const host = options.host || "http://127.0.0.1";

	console.log("File root dir:", FILE_ROOT_DIR);

	http.createServer((req, res) => {
		var time = utils.getTime("Y-m-d H:M:S.ms");
		console.log("[" + time + "] req.url:" + req.url + " (req.headers.range:" + req.headers.range + ")" + " from IP:" + getClientIp(req));

		var error = function (err) {
			var msg = (typeof (err) === "object" && err.message) ? err.message : (typeof (err) === "string" ? err : JSON.stringify(err));
			res.writeHead(200, { 'Content-Type': 'text/plain' });
			res.end("Error: " + msg);
			console.log("Error: " + msg);
		}

		var pipe = function (path, fileSize, range) {
			if (range) {
				const parts = range.replace(/bytes=/, "").split("-")
				const start = parseInt(parts[0], 10)
				const end = parts[1]
					? parseInt(parts[1], 10)
					: fileSize - 1
				const chunksize = (end - start) + 1
				const file = fs.createReadStream(path, { start, end })
				const head = {
					'Content-Range': `bytes ${start}-${end}/${fileSize}`,
					'Accept-Ranges': 'bytes',
					'Content-Length': chunksize,
					'Content-Type': 'video/mp4',
				}
				res.writeHead(206, head);
				file.pipe(res);
			} else {
				const head = {
					'Content-Length': fileSize,
					'Content-Type': 'video/mp4',
				}
				res.writeHead(200, head)
				fs.createReadStream(path).pipe(res)
			}
		}

		if (req.url.match(/\.(mp4|avi)$/)) {

			const range = req.headers.range;

			var file = req.url.replace(/^(.*\/)([^\/]+)$/, "$2");
			//file = Buffer.from(, 'gbk');
			//file = iconv.decode(new Buffer(decodeURIComponent(file)), 'gb2312');
			var moviePath = path.join(FILE_ROOT_DIR, decodeURIComponent(file));
			// console.log("moviePath:" + moviePath);
			try {
				if (!fs.existsSync(moviePath))
					throw "file is not exist!";
				var stat = fs.statSync(moviePath);
				var fileSize = stat.size;
				return pipe(moviePath, fileSize, range);
			} catch (err) {
				return error(err);
			}
			return;
		} else {
			res.writeHead(200, { 'Content-Type': 'text/plain' });
			res.end("Please give me a filename");
		}

	}).listen(PORT);

	console.log('Server ' + host + ' started.');
}

//------------------------------------------------------------------------------
// 异常处理
// set uncaughtException
process.on('uncaughtException', function (err) {
	console.log('Uncaught exception error:', err.message);
});


module.exports = app;

