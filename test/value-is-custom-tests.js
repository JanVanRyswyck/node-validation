var should = require('chai').should(),
	util = require('util'),
    Validator = require('../lib').Validator,
    ValidationError = require('../lib').ValidationError;

describe('Given an object with a property that contains a string value', function() {
	var objectWithStringProperty, validationErrors;

	before(function() {
		objectWithStringProperty = {
			property: 'abc123'
		};
	});

	describe('When validating a satisfying value using a validator with a custom rule', function() {
		before(function() {
			var validator = new ValueIsCustomValidator(function(value) {
				return value === objectWithStringProperty.property;
			});

			validationErrors = validator.validate(objectWithStringProperty);
		});

		it('Should not return any validation error', function() {
			validationErrors.should.have.length(0);
		});
	});

	describe('When validating a non-satisfying value using a validator with a custom rule', function() {
		before(function() {
			var validator = new ValueIsCustomValidator(function(value) {
				return value === '123abc';
			});

			validationErrors = validator.validate(objectWithStringProperty);
		});

		it('Should return a validation error that specifies the failing property', function() {
			validationErrors.should.have.deep.property('[0].propertyName', 'property');
		});

		it('Should return a validation error that specifies a default message which explains the error', function() {
			validationErrors.should.have.deep.property('[0].message', 'property is invalid.');
		});
	});

	describe('When validating a value using a validator with a custom rule that does not indicate anything', function() {
		before(function() {
			var validator = new ValueIsCustomValidator(function(value) { /* Diddly squat */ });
			validationErrors = validator.validate(objectWithStringProperty);
		});

		it('Should return a validation error', function() {
			validationErrors.should.have.length(1);
		});
	});

	describe('When validating a value using a validator with a custom rule that throws an error', function() {
		before(function() {
			var validator = new ValueIsCustomValidator(function(value) { throw new Error("A custom rule threw an error and got away with it!"); });
			validationErrors = validator.validate(objectWithStringProperty);
		});

		it('Should return a validation error', function() {
			validationErrors.should.have.length(1);
		});
	});

	describe('When creating a validator with an invalid custom rule for validating a particular property', function() {
		var createValidatorWithInvalidCustomRule;

		before(function() {
			createValidatorWithInvalidCustomRule = function() { new ValueIsCustomValidator({}); };
		});

		it('Should throw an error', function() {
			createValidatorWithInvalidCustomRule.should.throw(ValidationError);
		});
	});
});

var ValueIsCustomValidator = function(customRule) {
	Validator.call(this);

	this.ruleFor('property').is(customRule);
};

util.inherits(ValueIsCustomValidator, Validator);