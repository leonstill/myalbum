/**
 * simpleFilesets.js
 * 简单文件集合管理器
 */
const fs = require('fs');
const path = require('path');

function Filesets(options) {

    var _files = [];
    // var filename = 'filesets.json';
    var _root;
    var _filter = options.filter || ".avi|.mp4";

    // 更新_files
    var refresh = function (root, filter, force) {
        console.log("root:", root);
        if (_root !== root || _filter !== filter || force) {
            _root = root;
            _filter = filter
            readDirSync(root, 0, filter, _files);
            console.log("refreshed total files' count is " + _files.length + " .");
        }
    }
    // 获取指定范围的文件
    var query = function(opts, cb) {
        var start = opts.start || 0;
        var pagesize = opts.pagesize || Math.max(_files.length - start, 0);
        if(typeof cb !== "function")
            throw new Error("Invalid Filesets.query() params!");
        return cb(null, _files.slice(start, start + pagesize));
    }

    refresh(options.root, _filter);

    this.query = query;
    this.refresh = refresh;
}


function readDirSync(root, depth, filter, result) {
    var exp = typeof filter === 'string' ? new RegExp('(' + filter.replace(/,|;/, "|").replace(/\./, "\\.") + ')$') : null;
    try {
        var pa = fs.readdirSync(root);
        // console.log(">>>>>> pattern:", pattern);
        // console.log(">>>>>> exp:", exp);
        pa.forEach(function (ele, index) {
            if (!exp || ele.match(exp)) {       // filter for file and dir
                var info = fs.statSync(path.join(root, ele))
                if (info.isDirectory()) {
                    if (depth > 0) {
                        console.log(" dir: " + path.join(root, ele))
                        readDirSync(path.join(root, ele), depth - 1, pattern, result);
                    }
                } else {
                    console.log("file: " + path.join(root, ele))
                    result.push(ele);
                }
            }
        })
    } catch (err) {
        console.log("readDirSync err:", err);
    }
}

var _instance = null;

module.exports = function(opt) {
    if (!_instance) 
        _instance = new Filesets(opt);
    else
        _instance.refresh(opt.root, opt.filter);
    return _instance;
}
