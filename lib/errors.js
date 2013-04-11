var util = require('util');

var ValidationError = exports.ValidationError = function(message) {
	this.name = 'ValidationError';

	Error.call(this, message);
	Error.captureStackTrace(this, arguments.callee);
};

util.inherits(ValidationError, Error);