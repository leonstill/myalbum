/**
 * takescreenshots.js
 * 抓取指定目录下的视频的缩略图，然后输出到指定目录下。
 * version: 1.0
 */
const debug = require('debug')('takescreenshots');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');
const argv = require('minimist')(process.argv.slice(2));

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const config = require('../config');

const OUTPUT_DIR = __dirname + '/../public/thumbnails';


var mkdir = function(folder) {
    var dir = path.dirname(folder);
    debug("dir:", dir);
    if (!fs.existsSync(dir))
        mkdir(dir);
    fs.mkdirSync(folder);
}


var screenShots = function (mp4file, opts, cb) {
    var size = opts.width ? opts.width : '?';
    size += 'x';
    size += opts.height ? opts.height : '?'
    var filename = opts.outfile ? opts.outfile : (path.basename(mp4file).replace(/\.[\w\d]+$/, "") + '.jpg');
    var outdir = opts.outdir;
    if (!fs.existsSync(outdir)) {
        mkdir(outdir);
    }
    if (size === '?x?') throw new Error("A width or height at least be set in params of screenShots()");
    ffmpeg(mp4file)
        .on('filenames', function (filenames) {
            // console.log('Will generate ' + filenames.join(', '));
        })
        .on('end', function () {
            //console.log('Screenshots of %s is taken', mp4file);
            if(typeof cb === 'function') cb(null);
        })
        .on('error', function(err){
            //console.log('ffmpeg error:', err);
            if (typeof cb === 'function') cb(err);
        })
        .screenshots({
            timestamps: [1],
            filename: filename,
            folder: outdir,
            size: size
        });
}

var screenShotByDir = function(dir, opts) {
    var files = [];
    readDirSync(dir, 0, ".avi;.mp4", files);
    var i = 0;
    files.forEach(function (file) { 
        var fullpath = dir + '/' + file; 
        if(!argv.n) {
            screenShots(fullpath, opts, function (err) {
                if (err) return debug(err);
                if (argv.v)
                    console.log('Screenshots of %s is taken.', fullpath);
            });
        } else {
            console.log('Screenshots of %s is taken.', fullpath);
        }
    });
}

// 遍历目录
function readDirSync(root, depth, filter, result) {
    var exp = typeof filter === 'string' ? new RegExp('(' + filter.replace(/,|;/,"|").replace(/\./,"\\.") + ')$') : null;
    try {
        var pa = fs.readdirSync(root);
        // console.log(">>>>>> pattern:", pattern);
        // console.log(">>>>>> exp:", exp);
        pa.forEach(function (ele, index) {
            if (!exp || ele.match(exp)) {       // filter for file and dir
                var info = fs.statSync(path.join(root, ele))
                if (info.isDirectory()) {
                    if (depth > 0) {
                        debug(" dir: " + path.join(root, ele))
                        readDirSync(path.join(root, ele), depth - 1, pattern, result);
                    }
                } else {
                    debug("file: " + path.join(root, ele))
                    result.push(ele);
                }
            }
        })
    } catch (err) {
        debug("readDirSync err:", err);
    }
}


var usage = function() {
    var exename = path.basename(process.argv[1]);
    console.log("Usage: %s [options] [video source]", exename);
    console.log("  options:");
    console.log("    -o     output dir, default is '%s'.", OUTPUT_DIR);
    console.log("    -v     print verbose information");
    console.log("    -n     cannot do the real work.");
    console.log("    -h     print help info.");
    process.exit(1);
}

// test 
//screenShots('/home/liang/tmp/VID_20160510_103532.mp4', {width:'240'});
//screenShotByDir('/home/liang/tmp', { width: 240 });

var fileroot = argv._.length > 0 ? argv._[0] : config.fileRoot;
var outdir = argv.o || OUTPUT_DIR;
if (argv.h) usage();
if(argv.v) {
    console.log("config :", JSON.stringify(config, null, 2));
    console.log('----------');
    console.log("video source dir:", fileroot);
    console.log("output dir:", outdir);
    console.log('----------');
}
//if(argv.n) process.exit(0);

screenShotByDir(fileroot, { width: 240, outdir: outdir});
