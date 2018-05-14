/**
 * loadcfg.js
 * 读取config配置文件函数
 */
const debug = require('debug')('loadcfg');
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
        debug("require('%s') error: %s", file, JSON.stringify(e));
    }
    return data;
}

/**
 * 
 * @param {*} env : config根键值可能选择
 * @param {*} files : 配置文件路径或配置文件路径的集合（数组），数组中越往后的文件优先级越高。
 * @param {*} cfg : 配置对象，优先级最高。
 */
function Config(env, files, cfg) {
    if (!files) throw new Error("Config params check failed!");
    cfg = cfg || {};
    if (typeof files === "string") {
        cfg = merge(load(files)[env], cfg);
    } else if (files instanceof Array) {
        var current = {};
        for(var i=0; i<files.length; i++) {
            var tmp = load(files[i])[env];
            debug("[%s] => %s", files[i], JSON.stringify(tmp, null, 2));
            current = merge(current, tmp);
        }
        cfg = merge(current, cfg);
    } 
    // debug("Config[%s]: %s", env, util.inspect(cfg));
    return cfg;
}

module.exports = Config;