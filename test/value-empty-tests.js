var should = require('chai').should(),
	util = require('util'),
    Validator = require('../lib').Validator;

describe('Given a validator that verifies whether the property of an object is empty', function() {
	var validator, validationErrors;

	before(function() {
		validator = new StringEmptyValidator();
	});

	describe('When validating an empty string value', function() {
		before(function() {
			var objectWithEmptyStringProperty = {
				stringProperty: ''
			};

			validationErrors = validator.validate(objectWithEmptyStringProperty);
		});

		it('Should not return any validation error', function() {
			validationErrors.should.have.length(0);
		});
	});

	describe('When validating a string value', function() {
		before(function() {
			var objectWithStringProperty = {
				stringProperty: 'this-is-a-string'
			};

			validationErrors = validator.validate(objectWithStringProperty);
		});

		it('Should return a validation error that specifies the failing property', function() {
			validationErrors.should.have.deep.property('[0].propertyName', 'stringProperty');
		});

		it('Should return a validation error that specifies a default message which explains the error', function() {
			validationErrors.should.have.deep.property('[0].message', 'stringProperty should be empty.');
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

var StringEmptyValidator = function() {
	Validator.call(this);

	this.ruleFor('stringProperty').isEmpty();
};

util.inherits(StringEmptyValidator, Validator);