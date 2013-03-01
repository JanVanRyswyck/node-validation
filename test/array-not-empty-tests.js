var should = require('chai').should(),
	util = require('util'),
    Validator = require('../lib').Validator;

describe('Given a validator that verifies whether the array property of an object is not empty', function() {
	var validator, validationErrors;

	before(function() {
		validator = new ArrayNotEmptyValidator();
	});

	describe('When validating an array with elements', function() {
		before(function() {
			var objectWithArrayProperty = {
				arrayProperty: ['array-element']
			};

			validationErrors = validator.validate(objectWithArrayProperty);
		});

		it('Should not return any validation error', function() {
			validationErrors.should.have.length(0);
		});
	});

	describe('When validating an empty array', function() {
		before(function() {
			var objectWithEmptyArrayProperty = {
				arrayProperty: []
			};

			validationErrors = validator.validate(objectWithEmptyArrayProperty);
		});

		it('Should return a validation error that specifies the failing property', function() {
			validationErrors.should.have.deep.property('[0].propertyName', 'arrayProperty');
		});

		it('Should return a validation error that specifies a default message which explains the error', function() {
			validationErrors.should.have.deep.property('[0].message', 'arrayProperty should not be empty.');
		});
	});

	describe('When validating an undefined value', function() {
		before(function() {
			var objectWithUndefinedArrayProperty = {
				arrayProperty: undefined
			};

			validationErrors = validator.validate(objectWithUndefinedArrayProperty);
		});

		it('Should return a validation error', function() {
			validationErrors.should.have.length(1);
		});
	});

	describe('When validating a null value', function() {
		before(function() {
			var objectWithNullArrayProperty = {
				stringProperty: null
			};

			validationErrors = validator.validate(objectWithNullArrayProperty);
		});

		it('Should return a validation error', function() {
			validationErrors.should.have.length(1);
		});
	});
});

var ArrayNotEmptyValidator = function() {
	Validator.call(this);
	
	this.ruleFor('arrayProperty').notEmpty();
};

util.inherits(ArrayNotEmptyValidator, Validator);