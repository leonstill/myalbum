/**
 * 静态路径配置文件
 */
const baseUrl = '/pub';		// 静态路径
const videoUrl = '/v' ;		// video stream server路径

exports.map = function(name) {
	name = name.replace(/\/?(.*)$/, "/$1");
	return baseUrl + name;
}

exports.image = function(name) {
	name = name.replace(/\/?(.*)$/, "/$1");
	return baseUrl + name;
}

exports.video = function(name) {
	name = name.replace(/\/?(.*)$/, "/$1");
	return videoUrl + name;
}