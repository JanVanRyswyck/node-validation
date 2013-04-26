var should = require('chai').should(),
	util = require('util'),
    Validator = require('../lib').Validator;

var MAXIMUM_LENGTH = 16;

describe('Given a validator that verifies whether the property of an object has a particular maximum length', function() {
	var validator, validationErrors, stringValue;

	before(function() {
		validator = new MaximumStringLengthValidator();
		stringValue = 'ThisIsSomeStringValueOfSufficientLength';
	});

	describe('When validating a string value whose length is less than the specified maximum length', function() {
		before(function() {
			var objectWithStringProperty = {
				stringProperty: stringValue.slice(0, MAXIMUM_LENGTH - 1)
			};

			validationErrors = validator.validate(objectWithStringProperty);
		});

		it('Should not return any validation error', function() {
			validationErrors.should.have.length(0);
		});
	});

	describe('When validating a string value whose length is more than the specified maximum length', function() {
		before(function() {
			var objectWithStringProperty = {
				stringProperty: stringValue.slice(0, MAXIMUM_LENGTH + 1)
			};

			validationErrors = validator.validate(objectWithStringProperty);
		});

		it('Should return a validation error that specifies the failing property', function() {
			validationErrors.should.have.deep.property('[0].propertyName', 'stringProperty');
		});

		it('Should return a validation error that specifies a default message which explains the error', function() {
			validationErrors.should.have.deep.property('[0].message', 'stringProperty should be shorter than ' + MAXIMUM_LENGTH + ' characters.');
		});
	});

	describe('When validating a string value whose length equals the specified maximum length', function() {
		before(function() {
			var objectWithStringProperty = {
				stringProperty: stringValue.slice(0, MAXIMUM_LENGTH)
			};

			validationErrors = validator.validate(objectWithStringProperty);
		});

		it('Should not return any validation error', function() {
			validationErrors.should.have.length(0);
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

var MaximumStringLengthValidator = function() {
	Validator.call(this);

	this.ruleFor('stringProperty').hasMaximumLength(MAXIMUM_LENGTH);
};

util.inherits(MaximumStringLengthValidator, Validator);