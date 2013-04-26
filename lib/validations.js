var errors = require('./errors');

var Validations = exports.Validations = function(propertyName, registerRule) {
	var my = {};

	var rule = {
		propertyName: propertyName
	};

	var messageContext = {
		withMessage: associateMessageWithRule
	};

	my.hasMaximumLength = function(maximumLength) {
		var validation = function(value) {
			return validateMaximumLength(value, maximumLength);
		};

		var message = format([propertyName, 'should be shorter than', maximumLength, 'characters.']);
		register(validation, message);
		return messageContext;
	};

	function validateMaximumLength(value, maximumLength) {
		if(false === validateNotNull(value))
			return false;

		return value.length <= maximumLength;
	}

	my.hasMinimumLength = function(minimumLength) {
		var validation = function(value) {
			return validateMinimumLength(value, minimumLength);
		};

		var message = format([propertyName, 'should be longer than', minimumLength, 'characters.']);
		register(validation, message);
		return messageContext;
	};

	function validateMinimumLength(value, minimumLength) {
		if(false === validateNotNull(value))
			return false;

		return value.length >= minimumLength;
	}

	my.is = function(customRule) {
		if(typeof customRule !== 'function')
			throw new errors.ValidationError('Invalid custom rule. Please specify a valid function.');

		var validation = function(value) {
			try {
				return true === customRule(value);
			}
			catch(exception) {
				return false;
			}
		};

		var message = format([propertyName, 'is invalid.']);
		register(validation, message);
		return messageContext;
	};

	my.isBetween = function(minimumValue, maximumValue) {
		var validation = function(value) {
			return validateIsMinimum(value, minimumValue) && validateIsMaximum(value, maximumValue);
		};

		var message = format([propertyName, 'should be between', minimumValue, 'and', maximumValue, '.']);
		register(validation, message);
		return messageContext;
	};

	my.isEmpty = function() {
		var message = format([propertyName, 'should be empty.']);
		register(validateEmpty, message);
		return messageContext;
	};

	function validateEmpty(value) {
		if(false === validateNotNull(value))
			return false;

		return value.length === 0;
	}

	my.isExclusivelyBetween = function(minimumValue, maximumValue) {
		var validation = function(value) {
			return validateIsExclusiveMinimum(value, minimumValue) && validateIsExclusiveMaximum(value, maximumValue);
		};

		var message = format([propertyName, 'should be exclusively between', minimumValue, 'and', maximumValue, '.']);
		register(validation, message);
		return messageContext;
	};

	my.isExclusiveMaximum = function(maximumValue) {
		var validation = function(value) {
			return validateIsExclusiveMaximum(value, maximumValue);
		};

		var message = format([propertyName, 'should be less than', maximumValue, '.']);
		register(validation, message);
		return messageContext;
	};

	function validateIsExclusiveMaximum(value, maximumValue) {
		if(false === validateNotNull(value))
			return false;

		return value < maximumValue;
	}

	my.isExclusiveMinimum = function(minimumValue) {
		var validation = function(value) {
			return validateIsExclusiveMinimum(value, minimumValue);
		};

		var message = format([propertyName, 'should be greater than', minimumValue, '.']);
		register(validation, message);
		return messageContext;
	};

	function validateIsExclusiveMinimum(value, minimumValue) {
		if(false === validateNotNull(value))
			return false;

		return value > minimumValue;
	}

	my.isInteger = function() {
		var message = format([propertyName, 'should be an integer.']);
		register(validateIsInteger, message);
		return messageContext;
	};

	function validateIsInteger(value) {
		var integerValue = parseInt(value, 10);
		return false === isNaN(integerValue) && integerValue === parseFloat(value);
	}

	my.isMaximum = function(maximumValue) {
		var validation = function(value) {
			return validateIsMaximum(value, maximumValue);
		};

		var message = format([propertyName, 'should be less than or equal to', maximumValue, '.']);
		register(validation, message);
		return messageContext;
	};

	function validateIsMaximum(value, maximumValue) {
		if(false === validateNotNull(value))
			return false;

		return value <= maximumValue;
	}

	my.isMinimum = function(minimumValue) {
		var validation = function(value) {
			return validateIsMinimum(value, minimumValue);
		};

		var message = format([propertyName, 'should be greater than or equal to', minimumValue, '.']);
		register(validation, message);
		return messageContext;
	};

	function validateIsMinimum(value, minimumValue) {
		if(false === validateNotNull(value))
			return false;

		return value >= minimumValue;
	}

	my.isNotEmpty = function() {
		var message = format([propertyName, 'should not be empty.']);
		register(validateNotEmpty, message);
		return messageContext;
	};

	function validateNotEmpty(value) {
		if(false === validateNotNull(value))
			return false;

		return value.length > 0;
	}

	my.isNotNull = function() {
		var message = format([propertyName, 'should have a value.']);
		register(validateNotNull, message);
		return messageContext;
	};

	function validateNotNull(value) {
		return typeof value !== 'undefined' && null !== value;
	}

	my.isNumber = function() {
		var message = format([propertyName, 'should be a number.']);
		register(validateIsNumber, message);
		return messageContext;
	};

	function validateIsNumber(value) {
		return false === isNaN(parseFloat(value)) && isFinite(value);
	}

	my.matches = function(pattern) {
		var validation = function(value) {
			return validateMatch(value, pattern);
		};

		var message = format([propertyName, 'is incorrectly formatted.']);
		register(validation, message);
		return messageContext;
	};

	function validateMatch(value, pattern) {
		if(false === validateNotNull(value))
			return false;

		return null !== value.toString().match(pattern);
	}

	function format(messageParts) {
		return messageParts.join(' ');
	}

	function register(validation, message) {
		associateMessageWithRule(message);
		rule.validate = validation;

		registerRule(rule);
	}

	function associateMessageWithRule(message) {
		rule.message = message;
	}

	return my;
};