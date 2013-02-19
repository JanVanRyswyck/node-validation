var should = require('chai').should(),
	util = require('util'),
    Validator = require('../lib').Validator;

describe('Given an object with a string property', function() {
	var objectWithStringProperty, validationErrors;

	describe('When validating a valid string', function() {
		before(function() {
			var objectWithStringProperty = {
				stringProperty: 'this-is-a-valid-string'
			};

			var validator = new StringNotEmptyValidator();
			validationErrors = validator.validate(objectWithStringProperty);
		});

		it('should not issue a validation error for a valid string', function() {
			validationErrors.should.be.empty;
		});	
	});

});

var StringNotEmptyValidator = function() {
	Validator.call(this);
	
	this.ruleFor('stringProperty').notEmpty();
};

util.inherits(StringNotEmptyValidator, Validator);