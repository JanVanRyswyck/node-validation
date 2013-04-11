var should = require('chai').should(),
	util = require('util'),
    Validator = require('../lib').Validator;

describe('Given a validator that verifies a property with a custom validation message', function() {
	var validator, validationErrors,
		customValidationMessage = 'Some custom validation message.';

	before(function() {
		validator = new CustomMessageValidator(customValidationMessage);
	});

	describe('When validating an invalid property value', function() {
		before(function() {
			var objectWithProperty = {
				property: ''
			};

			validationErrors = validator.validate(objectWithProperty);
		});

		it('Should return a validation error that specifies a custom message', function() {
			validationErrors.should.have.deep.property('[0].message', customValidationMessage);
		});
	});
});

var CustomMessageValidator = function(customMessage) {
	Validator.call(this);

	this.ruleFor('property').isNotEmpty().withMessage(customMessage);
};

util.inherits(CustomMessageValidator, Validator);