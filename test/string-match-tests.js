var should = require('chai').should(),
	util = require('util'),
    Validator = require('../lib').Validator;

describe('Given a validator that verifies whether the value of a property of an object matches a particular pattern', function() {
	var validator, validationErrors;

	before(function() {
		validator = new StringMatchValidator();
	});

	describe('When validating a matching string value', function() {
		before(function() {
			var objectWithStringProperty = {
				property: '0561656545'
			};

			validationErrors = validator.validate(objectWithStringProperty);
		});

		it('Should not return any validation error', function() {
			validationErrors.should.have.length(0);
		});
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

	describe('When validating a non-matching string value', function() {
		before(function() {
			var objectWithNonMatchingStringProperty = {
				property: '1fjk8hf sd4f 7dfs'
			};

			validationErrors = validator.validate(objectWithNonMatchingStringProperty);
		});

		it('Should return a validation error that specifies the failing property', function() {
			validationErrors.should.have.deep.property('[0].propertyName', 'property');
		});

		it('Should return a validation error that specifies a default message which explains the error', function() {
			validationErrors.should.have.deep.property('[0].message', 'property is incorrectly formatted.');
		});
	});

	describe('When validating an undefined value', function() {
		before(function() {
			var objectWithUndefinedStringProperty = {
				property: undefined
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
				property: null
			};

			validationErrors = validator.validate(objectWithNullStringProperty);
		});

		it('Should return a validation error', function() {
			validationErrors.should.have.length(1);
		});
	});
});

var StringMatchValidator = function() {
	Validator.call(this);

	var numberPattern = /^[0-9]+$/;
	this.ruleFor('property').matches(numberPattern);
};

util.inherits(StringMatchValidator, Validator);