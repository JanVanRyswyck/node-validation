var Validator = require('./validator').Validator;
var errors = require('./errors');

exports.Validator = Validator;
exports.UndefinedPropertyError = errors.UndefinedPropertyError;
exports.ValidationError = errors.ValidationError;