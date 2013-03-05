var Validations = exports.Validations = function(propertyName, registerRule) {
	var rule = {
		propertyName: propertyName
	};

	var messageContext = {
		withMessage: associateMessageWithRule
	};

	function isEmpty() {
		var message = [propertyName, 'should be empty.'].join(' ');
		register(validateEmpty, message);
		return messageContext;
	}

	function validateEmpty(value) {
		if(false === validateNotNull(value))
			return false;

		if(false === value.hasOwnProperty('length'))
			return false;

		return value.length === 0;
	}

	function isNotEmpty() {
		var message = [propertyName, 'should not be empty.'].join(' ');
		register(validateNotEmpty, message);
		return messageContext;
	}

	function validateNotEmpty(value) {
		if(false === validateNotNull(value))
			return false;

		if(false === value.hasOwnProperty('length'))
			return false;

		return value.length > 0;
	}

	function isNotNull() {
		var message = [propertyName, 'should have a value.'].join(' ');
		register(validateNotNull, message);
		return messageContext;
	}

	function validateNotNull(value) {
		return typeof value !== 'undefined' && null !== value;
	}

	function register(validation, message) {
		associateMessageWithRule(message);
		rule.validate = validation;

		registerRule(rule);
	}

	function associateMessageWithRule(message) {
		rule.message = message;
	}

	return {
		isEmpty: isEmpty,
		isNotEmpty: isNotEmpty,
		isNotNull: isNotNull
	};
};