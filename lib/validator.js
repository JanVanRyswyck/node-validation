var Validations = require('./validations').Validations,
	errors = require('./errors');

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
	var i, length, value, errorMessage,
		currentRule, validationErrors = [];

	for(i=0, length=this._rules.length; i<length; i++) {
		currentRule = this._rules[i];

		if(false === (currentRule.propertyName in instance)) {
			throwUndefinedPropertyErrorFor(this._rules[i].propertyName);
		}

		value = instance[currentRule.propertyName];

		if(false === currentRule.validate(value)) {
			validationErrors.push({
				propertyName: currentRule.propertyName,
				message: currentRule.message
			});
		}
	}

	return validationErrors;
};

function throwUndefinedPropertyErrorFor(propertyName) {
	var errorMessage = 'Invalid property name. The property with name' + propertyName + ' does not exist on the specified object.';
	throw new errors.UndefinedPropertyError(errorMessage);
}

