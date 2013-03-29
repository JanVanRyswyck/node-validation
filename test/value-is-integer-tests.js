var should = require('chai').should(),
	util = require('util'),
    Validator = require('../lib').Validator;

describe('Given a validator that verifies whether the value of the property of an object is an integer', function() {
	var validator, validationErrors;

	before(function() {
		validator = new ValueIsIntegerValidator();
	});

	describe('When validating an integer value', function() {
		before(function() {
			var objectWithIntegerProperty = {
				property: 26
			};

			validationErrors = validator.validate(objectWithIntegerProperty);
		});

		it('Should not return any validation error', function() {
			validationErrors.should.have.length(0);
		});
	});

	describe('When validating an integer as string value', function() {
		before(function() {
			var objectWithIntegerAsStringProperty = {
				property: '12'
			};

			validationErrors = validator.validate(objectWithIntegerAsStringProperty);
		});

		it('Should not return any validation error', function() {
			validationErrors.should.have.length(0);
		});
	});

	describe('When validating a non-integer string value', function() {
		before(function() {
			var objectWithStringProperty = {
				property: 'does-not-compute'
			};

			validationErrors = validator.validate(objectWithStringProperty);
		});

		it('Should return a validation error that specifies the failing property', function() {
			validationErrors.should.have.deep.property('[0].propertyName', 'property');
		});

		it('Should return a validation error that specifies a default message which explains the error', function() {
			validationErrors.should.have.deep.property('[0].message', 'property should be an integer.');
		});
	});

	describe('When validating a decimal value', function() {
		before(function() {
			var objectWithDecimalProperty = {
				property: 1E302
			};

			validationErrors = validator.validate(objectWithDecimalProperty);
		});

		it('Should return a validation error', function() {
			validationErrors.should.have.length(1);
		});
	});
});

var ValueIsIntegerValidator = function() {
	Validator.call(this);

	this.ruleFor('property').isInteger();
};

util.inherits(ValueIsIntegerValidator, Validator);