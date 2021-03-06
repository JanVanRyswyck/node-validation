var should = require('chai').should(),
	util = require('util'),
    Validator = require('../lib').Validator;

var MINIMUM_VALUE = 78.56;

describe('Given a validator that verifies whether the value of the property of an object has a particular exclusive minimum value', function() {
	var validator, validationErrors;

	before(function() {
		validator = new ValueIsExclusiveMinimumValidator();
	});

	describe('When validating a numeric string value that is more than the specified minimum value', function() {
		before(function() {
			var objectWithNumericStringProperty = {
				stringProperty: (MINIMUM_VALUE + 1).toString()
			};

			validationErrors = validator.validate(objectWithNumericStringProperty);
		});

		it('Should not return any validation error', function() {
			validationErrors.should.have.length(0);
		});
	});

	describe('When validating a numeric string value that is less than the specified minimum value', function() {
		before(function() {
			var objectWithNumericStringProperty = {
				stringProperty: (MINIMUM_VALUE - 1).toString()
			};

			validationErrors = validator.validate(objectWithNumericStringProperty);
		});

		it('Should return a validation error that specifies the failing property', function() {
			validationErrors.should.have.deep.property('[0].propertyName', 'stringProperty');
		});

		it('Should return a validation error that specifies a default message which explains the error', function() {
			validationErrors.should.have.deep.property('[0].message', 'stringProperty should be greater than ' + MINIMUM_VALUE + ' .');
		});
	});

	describe('When validating a numeric string value that equals the specified minimum value', function() {
		before(function() {
			var objectWithNumericStringProperty = {
				stringProperty: MINIMUM_VALUE.toString()
			};

			validationErrors = validator.validate(objectWithNumericStringProperty);
		});

		it('Should return a validation error', function() {
			validationErrors.should.have.length(1);
		});
	});

	describe('When validating an undefined value', function() {
		before(function() {
			var objectWithUndefinedStringProperty = {
				stringProperty: undefined
			};

			validationErrors = validator.validate(objectWithUndefinedStringProperty);
		});

		it('Should return a validation error', function() {
			validationErrors.should.have.length(1);
		});
	});

	describe('When validating a null value', function() {
		before(function() {
			var objectWithNullStringProperty = {
				stringProperty: null
			};

			validationErrors = validator.validate(objectWithNullStringProperty);
		});

		it('Should return a validation error', function() {
			validationErrors.should.have.length(1);
		});
	});
});

var ValueIsExclusiveMinimumValidator = function() {
	Validator.call(this);

	this.ruleFor('stringProperty').isExclusiveMinimum(MINIMUM_VALUE);
};

util.inherits(ValueIsExclusiveMinimumValidator, Validator);