/**
 * 
 * config主配置文件
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

module.exports = {
    // localhost环境下的配置
    localhost: {
        general: general,
        port: 4000,
        cookieSecret: 'session秘钥放在这里!',
        pageSize: 40,   // 分页后每页的图片数量，0表示全部。
    },
    // development环境下的配置
    development: {
        general: general,
        port: 4000,
        cookieSecret: 'session秘钥放在这里!',
        pageSize: 40,   // 分页后每页的图片数量，0表示全部。
    },
    // production环境下的配置
    production: {
        general: general,
        port: 80,
        cookieSecret: 'session秘钥放在这里!',
        pageSize: 40,   // 分页后每页的图片数量，0表示全部。
    }
};