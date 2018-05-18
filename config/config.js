/**
 * global.js
 * 全局配置文件
 * 
 */
var general = {
    // 通用配置
    title: "我的相册",
    subtitle: "",
    version: "V1.0",
    copyrightInfo1: "武汉莱昂云信息技术有限公司",
    copyrightInfo2: "",
    supportInfo: "武汉莱昂云信息技术有限公司",
};

var cfg = {
    // localhost环境下的配置
    localhost: {
        general: general,
        fileRoot: '/home/liang/tmp',
        videoserver: "http://127.0.0.1:8081",
    },
    // development环境下的配置
    development: {
        general: general,
        // fileRoot: '/home/liang/tmp/video',
        //fileRoot: "/mnt/winshare",
        fileRoot: "/home/liang/backup/phone/Camera/video",
        videoserver: "http://116.211.116.178:8081", 
    },
    // production环境下的配置
    production: {
        general: general,
        fileRoot: '/home/liang/Smaller/backup/phone/Camera/video',
        videoserver: "http://127.0.0.1:8081",
    }
};

module.exports = cfg;