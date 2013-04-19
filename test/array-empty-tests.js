var should = require('chai').should(),
	util = require('util'),
    Validator = require('../lib').Validator;

describe('Given a validator that verifies whether the array property of an object is empty', function() {
	var validator, validationErrors;

	before(function() {
		validator = new ArrayEmptyValidator();
	});

	describe('When validating an array with elements', function() {
		before(function() {
			var objectWithArrayProperty = {
				arrayProperty: ['array-element']
			};

			validationErrors = validator.validate(objectWithArrayProperty);
		});

		it('Should return a validation error that specifies the failing property', function() {
			validationErrors.should.have.deep.property('[0].propertyName', 'arrayProperty');
		});

		it('Should return a validation error that specifies a default message which explains the error', function() {
			validationErrors.should.have.deep.property('[0].message', 'arrayProperty should be empty.');
		});
	});

	describe('When validating an empty array', function() {
		before(function() {
			var objectWithEmptyArrayProperty = {
				arrayProperty: []
			};

			validationErrors = validator.validate(objectWithEmptyArrayProperty);
		});

		it('Should not return any validation error', function() {
			validationErrors.should.have.length(0);
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
				arrayProperty: null
			};

			validationErrors = validator.validate(objectWithNullArrayProperty);
		});

		it('Should return a validation error', function() {
			validationErrors.should.have.length(1);
		});
	});
});

var ArrayEmptyValidator = function() {
	Validator.call(this);
	
	this.ruleFor('arrayProperty').isEmpty();
};

util.inherits(ArrayEmptyValidator, Validator);