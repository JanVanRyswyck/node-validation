var util = require('util');

var ValidationError = exports.ValidationError = function(message) {
	this.name = 'ValidationError';

	Error.call(this, message);
	Error.captureStackTrace(this, arguments.callee);
};

util.inherits(ValidationError, Error);

var UndefinedPropertyError = exports.UndefinedPropertyError = function(message) {
	this.name = 'UndefinedPropertyError';

	Error.call(this, message);
	Error.captureStackTrace(this, arguments.callee);
};

util.inherits(UndefinedPropertyError, Error);