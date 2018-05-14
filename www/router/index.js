/**
 * index.js
 * router模块入口
 */
const debug = require('debug')('myalbum:router');
const express = require('express'); 
const config = require('../config');	// 全局配置
'use strict';

const router = express.Router();
const ROOTDIR = config.runtime.rootdir;

// 初始化路由全局用函数等
router.use(function(req, res, next){
    res.renderError = function(err) {
        debug("Error:", err);   // TODO: 记录日志
        return res.render(500, {
            error: err.message ? err.message : JSON.stringify(err, null, 2),
        })
    };
    res.jsonError = function (err) {
        debug("Error:", err);   // TODO: 记录日志
        return res.json({
            err : err,
            message: err.message ? err.message : "未知错误，详细信息请参考err",
        })
    };
    next();
});

// 视频流
router.use('/video', require('./video'));

// static files route
router.use('/pub', express.static(ROOTDIR + '/public'));	// setting static path

// error
router.get('/error', function(req, res){
    return res.render(500, {
        error: req.body.error ? req.body.error : (req.query.error ? req.query.error : '未知错误') ,
    })
});

//------------------------------------------------------------------------------
// 错误路径默认页面
// Error 404
router.use(function (req, res) {
    res.status(404);
    // res.type('text/plain');
    // res.send('404 - Not Found');
    res.render('404');
});

// Error 505
router.use(function (req, res) {
    console.error(err.stack);
    res.status(500);
    // res.type('text/plain');
    // res.send('500 - Server Error');
    res.render('500');
});

module.exports = router;