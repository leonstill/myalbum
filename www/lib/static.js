var baseUrl = '/pub';

exports.map = function(name) {
	name = name.replace(/\/?(.*)$/, "/$1");
	return baseUrl + name;
}

exports.image = function(name) {
	name = name.replace(/\/?(.*)$/, "/$1");
	return baseUrl + name;
}
