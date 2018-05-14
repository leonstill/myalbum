/**
 * index.js
 * config配置模块入口，本地config.js作为主配置，"../../config/config.js"如果存在的话，则为辅配置，
 * 主配置中的配置项优先级最高。
 */
'use strict';
const debug = require('debug')('myalbum:config');
const loadcfg = require('./loadcfg.js');

var current = process.env.NODE_ENV;
var proto = new loadcfg(current, [__dirname + '/../../config/config.js', __dirname + '/config.js']);

proto.runtime = {
    rootdir: process.env.ROOT_DIR || __dirname + '/../',	// assuming the root dir is the parent of '__dirname'
};

// print global config 
console.log("config => %s", JSON.stringify(proto, null, 2));

module.exports = proto;
