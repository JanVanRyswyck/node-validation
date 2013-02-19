var Validations = exports.Validations = function(propertyName, registerRule) {
	
	function notEmpty() {
		// TODO: Create format extension function for underscore
		var message = propertyName + ' should not be empty.';
		register(validateNotEmpty, message);
	}

	function validateNotEmpty(value) {
		return undefined !== value && null !== value && '' !== value;
	}

	function register(validation, message) {
		registerRule({
			message: message,
			propertyName: propertyName,
			validate: validation
		});
	}

	return {
		notEmpty: notEmpty
	};
};