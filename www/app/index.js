/**
 * index.js
 * app模块入口
 */
const debug = require('debug')('myalbum:app');
const flash = require('connect-flash');
const express = require('express');
const bodyParser = require('body-parser');
const config = require('../config');	// 全局配置
'use strict';

// express app
const app = express();
//  env 
const env = app.get('env');
const PORT = config.port;

//------------------------------------------------------------------------------
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//------------------------------------------------------------------------------
// set handlebars for template engine and to initialize
// 注:express3-handlebars更名为express-handlebars
var handlebars = require('express-handlebars').create({
    defaultLayout: 'default',
    partialsDir: 'views/partials',
    layoutsDir: "views/layouts",
    helpers: require('./handlebars_helpers.js'),
});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//------------------------------------------------------------------------------
// cookie and session
const session = require('express-session');
app.use(session({
    secret: config.cookieSecret,  // 加密
}));		// NOTE: default store is MemoryStore, only for development !!!


//------------------------------------------------------------------------------
// flash message 即显消息
app.use(flash());
app.use(function (req, res, next) {
    // 如果有即显消息，把它传到上下文中，然后清除。
    var flashes = [];

    // 格式化connect-flash插件中的flash消息 
    if (typeof (req.flash) != "undefined") {
        req.flash('info').forEach(function (item, index) {
            flashes.push({
                type: 'info',
                intro: '通知：',
                message: item
            });
        });
        req.flash('error').forEach(function (item, index) {
            flashes.push({
                type: 'error',
                intro: '错误：',
                message: item
            });
        });
    }
    res.locals.flashes = flashes;
    // console.log(2, flashes);
    next();
});

//------------------------------------------------------------------------------
// database mongo connection
// ...

//------------------------------------------------------------------------------
// 路由
app.use(require('../router'));

//------------------------------------------------------------------------------
// 异常处理
// set uncaughtException
process.on('uncaughtException', function (err) {
    console.log('Uncaught exception error:', err.message);
});

//------------------------------------------------------------------------------
// listen
app.listen(PORT, function () {
    console.log('Express started on port:' + PORT + '; press Ctrl-C to terminate.');
});

//------------------------------------------------------------------------------
// module export app
module.exports = app;
