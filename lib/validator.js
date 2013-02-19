var Validations = require('./validations').Validations;

var Validator = exports.Validator = function() {
	this._rules = [];
};

Validator.prototype.ruleFor = function(propertyName) {
	var self = this;

	return new Validations(propertyName, function(rule) {
		self._rules.push(rule);
	});
};

Validator.prototype.validate = function(instance) {
	var i, length, value,
		validationErrors = [];

	for(i=0, length=this._rules.length; i<length; i++) {
		value = instance[this._rules[i].propertyName];
		// TODO: throw exception if the specified property is not on the specified instance

		if(false === this._rules[i].validate(value)) {
			validationErrors.push({
				propertyName: this._rules[i].propertyName,
				message: this._rules[i].message
			});
		}
	}

	return validationErrors;
};

