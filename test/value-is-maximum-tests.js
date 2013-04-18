var should = require('chai').should(),
	util = require('util'),
    Validator = require('../lib').Validator;

var MAXIMUM_VALUE = 26.12;

describe('Given a validator that verifies whether the value of the property of an object has a particular maximum value', function() {
	var validator, validationErrors;

	before(function() {
		validator = new ValueIsMaximumValidator();
	});

	describe('When validating a numeric string value that is less than the specified maximum value', function() {
		before(function() {
			var objectWithNumericProperty = {
				property: (MAXIMUM_VALUE - 1).toString()
			};

			validationErrors = validator.validate(objectWithNumericProperty);
		});

		it('Should not return any validation error', function() {
			validationErrors.should.have.length(0);
		});
	});

	describe('When validating a numeric string value that is more than the specified maximum value', function() {
		before(function() {
			var objectWithNumericProperty = {
				property: (MAXIMUM_VALUE + 1).toString()
			};

			validationErrors = validator.validate(objectWithNumericProperty);
		});

		it('Should return a validation error that specifies the failing property', function() {
			validationErrors.should.have.deep.property('[0].propertyName', 'property');
		});

		it('Should return a validation error that specifies a default message which explains the error', function() {
			validationErrors.should.have.deep.property('[0].message', 'property should be less than or equal to ' + MAXIMUM_VALUE + ' .');
		});
	});

	describe('When validating a numeric string value that equals the specified maximum value', function() {
		before(function() {
			var objectWithNumericProperty = {
				property: MAXIMUM_VALUE.toString()
			};

			validationErrors = validator.validate(objectWithNumericProperty);
		});

		it('Should not return any validation error', function() {
			validationErrors.should.have.length(0);
		});
	});
});

var ValueIsMaximumValidator = function() {
	Validator.call(this);

	this.ruleFor('property').isMaximum(MAXIMUM_VALUE);
};

util.inherits(ValueIsMaximumValidator, Validator);