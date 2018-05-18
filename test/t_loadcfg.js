'use strict';
const loadcfg = require('../www/config/loadcfg.js');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = new loadcfg(process.env.NODE_ENV, [__dirname + '/config.js', __dirname + '/config.js'], {version: '0.02'});
console.log('config', config);