/**
 * video.js
 * 视频页面
 */
const debug = require('debug')('myalbum:router');
const express = require('express'); 
const fs = require('fs');
//const iconv = require('iconv-lite');
const path = require('path');
const config = require('../config');	        // 全局配置
const static = require('../lib/static.js');     // 静态文件路径配置

const router = express.Router();

const FILE_ROOT_DIR = config.fileRoot;
console.log("FILE_ROOT_DIR=" + FILE_ROOT_DIR);

const simplefs = require('../lib/simpleFilesets.js')({ root: FILE_ROOT_DIR });	

router.get('/', function(req, res){
    simplefs.query({ start: 0, pagesize: config.pageSize }, function(err, files){
        if(err) return res.renderError(err);
        console.log(">>>files", files);
        return res.render('videolist', {
            layout: 'main',
            rows: formatRows(files),
            title: "我的相册",
        });
    });
});

router.post('/', function(req, res){
    var start = req.body.start || 0;
    var pagesize = req.body.pagesize || config.pageSize;
    simplefs.query({ start: start, pagesize: pagesize }, function (err, files) {
        if (err) return res.renderError(err);
        return res.render('videolist', {
            layout: 'main',
            rows: formatRows(files),
            title: "我的相册",
        });
    });
});

router.get('/test', function (req, res) {
    res.render('test', {
        layout: 'main',
        title: "video cell test",
        path: "VID_20180407_115523.mp4",
    });
});


function formatRows(files) {
    var rows = [];
    var rowCount = (files.length + 3 - 1) / 3;
    for (var i = 0; i < rowCount; i++) {
        var cols = [];
        for (var j = 0; j < 3 && i * 3 + j < files.length; j++) {
            cols.push({
                class: "col-sm-4",
                title: files[i * 3 + j],
                image: '/thumbnails/' + files[i * 3 + j].replace(/\.[\w\d]+$/, ".jpg"),
                width: 240,
                height: 320,
                playinfo: JSON.stringify({
                    title: files[i * 3 + j],
                    path: config.videoserver + static.map(files[i * 3 + j]),
                    type: "video/mp4",
                })
            });
        }
        rows.push(cols);
    }
    return rows;
}

module.exports = router;