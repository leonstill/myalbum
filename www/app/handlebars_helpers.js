/**
 * app/weixin.js
 * @description  weixin相关的初始化等
 * @authors 梁鹏 (leonstill@163.com)
 * @date    2017-08-01 13:50:06
 * @version $Id$
 */
const config = require('../config');

module.exports =  {
	static: function(name) {
		return config.staticUrl.map(name);
	},
	compare: function(left, operator, right, options) {
		if (arguments.length < 3) {
			throw new Error('Handlerbars Helper "compare" needs 2 parameters');
		}
		var operators = {
			'==': function (l, r) { return l == r; },
			'===': function (l, r) { return l === r; },
			'!=': function (l, r) { return l != r; },
			'!==': function (l, r) { return l !== r; },
			'<': function (l, r) { return l < r; },
			'>': function (l, r) { return l > r; },
			'<=': function (l, r) { return l <= r; },
			'>=': function (l, r) { return l >= r; },
			'typeof': function (l, r) { return typeof l == r; }
		};

		if (!operators[operator]) {
			throw new Error('Handlerbars Helper "compare" doesn\'t know the operator ' + operator);
		}

		var result = operators[operator](left, right);

		if (result) {
			return options.fn(this);
		} else {
			return options.inverse(this);
		}
	},
	image: function(name) {
		return config.staticUrl.image(name);
	},
	videoUrl: function(path) {
		return config.staticUrl.video(path);
	}
};


