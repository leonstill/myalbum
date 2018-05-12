/**
 * loadcfg.js
 * 读取config配置文件函数
 */
const merge = require('merge');
const util = require('util');
const fs = require('fs');

function load(file) {
    var data = {};
    try {
        if (fs.existsSync(file)) {		// existsSync must use absolute path.
            // debug("'%s' can be accessed.", file);
            data = require(file);
        }
    } catch (e) {
        debug("require('%s') failed. %s", file, JSON.stringify(e));
    }
    return data;
}

/**
 * 
 * @param {*} env : config根键值可能选择
 * @param {*} files : 配置文件路径或配置文件路径的集合（数组）
 * @param {*} cfg : 配置对象，优先级最高。
 */
function Config(env, files, cfg) {
    if (!files) throw new Error("Config params check failed!");
    cfg = cfg || {};
    if (typeof files === "string") {
        cfg = load(files)[env];
    } else if (files instanceof Array) {
        for(var i=0; i<files.length; i++) {
            var tmp = load(files[i])[env];
            cfg = merge(cfg, tmp);
        }
    } 
    debug("Config[%s]: %s", env, util.inspect(cfg));
    return cfg;
}

module.exports = Config;