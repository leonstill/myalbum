/**
 * lib/utils.js
 * @description  微信服务主程序
 * @authors 梁鹏 (leonstill@163.com)
 * @date    2017-08-01 13:50:06
 * @version $Id$
 */

const util = require('util');
'use strict';

var utils = {};
utils.fix2number = function(n) {  
    return [0,n].join('').slice(-2);  
}  
utils.fixNumber = function(n,a) {
    return [0,n].join('').slice(-a);  
}
// 整数或小数保留小数点后a位，并补零。
utils.fixDecimals = function(mixed, a) {
    return parseFloat(mixed).toFixed(a);
}
// 计算两个日期之间的差值，date2-date1，如果date1>date2，会有“-”出现在最前面。
utils.dateDiff = function(date1, date2){
    try{  
        // 相差秒数
        var date3=Math.round((date2.getTime()-date1.getTime())/1000);   
        //计算出相差天数
        var days=Math.floor(date3/(24*3600));
        //计算出小时数
        var leave1=date3%(24*3600);     
        var hours=Math.floor(leave1/3600);
        //计算相差分钟数
        var leave2=leave1%3600;         
        var minutes=Math.floor(leave2/60);
        //计算相差秒数
        var seconds=leave2%60;              
        var str = days>0?days+'天':'';
        str += hours+'时' + minutes+'分';
        return {str:str, hours:Math.ceil(date3/3600)};
    }catch(e){
        return "";
    }
}//end fun
// 把秒数转换成时分秒，分钟和秒会做2位对齐。最大(99:59:59)。
utils.format = function(format, seconds) {
    try{
        var seconds = Math.floor(seconds);
        var hours = Math.floor(seconds/3600);
        var minutes = Math.floor((seconds%3600)/60);
        var seconds = Math.floor((seconds%3600)%60);
        format = format.replace(/H/i, utils.fix2number(hours));  
        format = format.replace(/M/i, utils.fix2number(minutes));  
        format = format.replace(/S/i, utils.fix2number(seconds));  
        return format; 
    }catch(e){
        return "";
    }
}
// 格式化日期，支持简单的格式化字符。
utils.getTime = function (format, curDate) {  
    //if(!curDate) format = null;
    var curDate = curDate || new Date();  
    if(!format) return curDate;
    format = format.replace(/Y/i, curDate.getFullYear());  
    format = format.replace(/m/i, utils.fix2number(curDate.getMonth() + 1));  
    format = format.replace(/d/i, utils.fix2number(curDate.getDate()));  
    format = format.replace(/H/i, utils.fix2number(curDate.getHours()));  
    format = format.replace(/M/i, utils.fix2number(curDate.getMinutes()));  
    format = format.replace(/S/i, utils.fix2number(curDate.getSeconds()));  
    format = format.replace(/ms/i, curDate.getMilliseconds());  
    return format;  
}  


module.exports = utils;
