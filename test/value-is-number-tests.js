var should = require('chai').should(),
	util = require('util'),
    Validator = require('../lib').Validator;

describe('Given a validator that verifies whether the value of the property of an object is a number', function() {
	var validator, validationErrors;

	before(function() {
		validator = new ValueIsNumberValidator();
	});

	describe('When validating a numeric value', function() {
		before(function() {
			var objectWithNumericProperty = {
				property: 564254
			};

			validationErrors = validator.validate(objectWithNumericProperty);
		});

		it('Should not return any validation error', function() {
			validationErrors.should.have.length(0);
		});
	});

	describe('When validating a non-numeric string value', function() {
		before(function() {
			var objectWithNonNumericStringProperty = {
				property: 'does-not-compute'
			};

			validationErrors = validator.validate(objectWithNonNumericStringProperty);
		});

		it('Should return a validation error that specifies the failing property', function() {
			validationErrors.should.have.deep.property('[0].propertyName', 'property');
		});

		it('Should return a validation error that specifies a default message which explains the error', function() {
			validationErrors.should.have.deep.property('[0].message', 'property should be a number.');
		});
	});

	describe('When validating a numeric string value', function() {
		before(function() {
			var objectWithNumericStringProperty = {
				property: '5468'
			};

			validationErrors = validator.validate(objectWithNumericStringProperty);
		});

		it('Should not return any validation error', function() {
			validationErrors.should.have.length(0);
		});
	});

	describe('When validating an infinite value', function() {
		before(function() {
			var objectWithInfiniteProperty = {
				property: Infinity
			};

			validationErrors = validator.validate(objectWithInfiniteProperty);
		});

		it('Should return a validation error', function() {
			validationErrors.should.have.length(1);
		});
	});
});

var ValueIsNumberValidator = function() {
	Validator.call(this);
	
	this.ruleFor('property').isNumber();
};

util.inherits(ValueIsNumberValidator, Validator);