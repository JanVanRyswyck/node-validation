var should = require('chai').should(),
	util = require('util'),
    Validator = require('../lib').Validator;

describe('Given a validator that verifies whether the property of an object has a value', function() {
	var validator, validationErrors;

	before(function() {
		validator = new ValueNotNullValidator();
	});

	describe('When validating a valid value', function() {
		before(function() {
			var objectWithProperty = {
				property: 'this-is-a-valid-value'
			};

			validationErrors = validator.validate(objectWithProperty);
		});

		it('Should not return any validation error', function() {
			validationErrors.should.have.length(0);
		});
	});

	describe('When validating a null value', function() {
		before(function() {
			var objectWithPropertyValueNull = {
				property: null
			};

			validationErrors = validator.validate(objectWithPropertyValueNull);
		});

		it('Should return a validation error that specifies the failing property', function() {
			validationErrors.should.have.deep.property('[0].propertyName', 'property');
		});

		it('Should return a validation error that specifies a default message which explains the error', function() {
			validationErrors.should.have.deep.property('[0].message', 'property should have a value.');
		});
	});

	describe('When validating an undefined value', function() {
		before(function() {
			var objectWithPropertyValueUndefined = {
				property: undefined
			};

			validationErrors = validator.validate(objectWithPropertyValueUndefined);
		});

		it('Should return a validation error', function() {
			validationErrors.should.have.length(1);
		});
	});
});

var ValueNotNullValidator = function() {
	Validator.call(this);
	
	this.ruleFor('property').isNotNull();
};

util.inherits(ValueNotNullValidator, Validator);