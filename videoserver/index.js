/*!
 * My album
 * leonstill@163.com
 * MIT Licensed
 */

'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.ROOT_DIR = __dirname;

const app = require('./video_stream_server.js');
const config = require('../config');

app({ 
    port: (config.videoserver.replace(/^(http:\/\/[^:\/]+)(:?\d*).*$/, "$2") || "8080").replace(/^:/,""),
    host: config.videoserver,
    fileRoot: config.fileRoot,    // 文件本地目录
});
//console.log("Myalbum web app has been started!");