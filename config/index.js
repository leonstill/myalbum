/**
 * index.js
 * 全局配置入口文件
 * 
 */
//const loadcfg = require('../lib/loadcfg.js');
var config = require("./config.js")[process.env.NODE_ENV];
if (!config) {
    console.log("process.env.NODE_ENV = " + process.env.NODE_ENV);
    throw new Error("config is null, please check NODE_ENV!");
}

module.exports = config;
