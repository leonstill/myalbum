/**
 * 
 * config主配置文件
 * 
 */

// 通用配置
var general = {
    title: "我的相册",
    subtitle: "",
    version: "V1.0",
    copyrightInfo1: "武汉莱昂云信息技术有限公司",
    copyrightInfo2: "",
    supportInfo: "武汉莱昂云信息技术有限公司",
};

// 静态路径配置
const staticUrl = require('./static.js');

// 所有配置汇总
module.exports = {
    // localhost环境下的配置
    localhost: {
        general: general,
        staticUrl: staticUrl,
        port: 8000,
        cookieSecret: 'session秘钥放在这里!',
        pageSize: 40,   // 分页后每页的图片数量，0表示全部。
    },
    // development环境下的配置
    development: {
        general: general,
        staticUrl: staticUrl,
        port: 8000,
        cookieSecret: 'session秘钥放在这里!',
        pageSize: 40,   // 分页后每页的图片数量，0表示全部。
    },
    // production环境下的配置
    production: {
        general: general,
        staticUrl: staticUrl,
        port: 8000,
        cookieSecret: 'session秘钥放在这里!',
        pageSize: 40,   // 分页后每页的图片数量，0表示全部。
    }
};