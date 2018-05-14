/*!
 * My album
 * leonstill@163.com
 * MIT Licensed
 */

'use strict';
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.ROOT_DIR = __dirname;

const app = require('./app');
app();
console.log("Myalbum web app has been started!");