var should = require('chai').should(),
	util = require('util'),
    Validator = require('../lib').Validator;

var MINIMUM_VALUE = 44.78;
var MAXIMUM_VALUE = 68.03;

describe('Given a validator that verifies whether the value of the property of an object is exclusively between a particular minimum and maximum value', function() {
	var validator, validationErrors;

	before(function() {
		validator = new ValueIsExclusiveBetweenValidator();
	});

	describe('When validating a numeric value that is between the specified minimum and maximum value', function() {
		before(function() {
			var objectWithNumericProperty = {
				property: MAXIMUM_VALUE - 5
			};

			validationErrors = validator.validate(objectWithNumericProperty);
		});

		it('Should not return any validation error', function() {
			validationErrors.should.have.length(0);
		});
	});

	describe('When validating a numeric value that is less than the specified minimum value', function() {
		before(function() {
			var objectWithNumericProperty = {
				property: MINIMUM_VALUE - 1
			};

			validationErrors = validator.validate(objectWithNumericProperty);
		});

		it('Should return a validation error that specifies the failing property', function() {
			validationErrors.should.have.deep.property('[0].propertyName', 'property');
		});

		it('Should return a validation error that specifies a default message which explains the error', function() {
			validationErrors.should.have.deep.property('[0].message', 'property should be exclusively between ' + MINIMUM_VALUE + ' and ' + MAXIMUM_VALUE + ' .');
		});
	});

	describe('When validating a numeric value that is more than the specified maximum value', function() {
		before(function() {
			var objectWithNumericProperty = {
				property: MAXIMUM_VALUE + 1
			};

			validationErrors = validator.validate(objectWithNumericProperty);
		});

		it('Should return a validation error', function() {
			validationErrors.should.have.length(1);
		});
	});

	describe('When validating a numeric value that equals the specified minimum value', function() {
		before(function() {
			var objectWithNumericProperty = {
				property: MINIMUM_VALUE
			};

			validationErrors = validator.validate(objectWithNumericProperty);
		});

		it('Should return a validation error', function() {
			validationErrors.should.have.length(1);
		});
	});

	describe('When validating a numeric value that equals the specified maximum value', function() {
		before(function() {
			var objectWithNumericProperty = {
				property: MAXIMUM_VALUE
			};

			validationErrors = validator.validate(objectWithNumericProperty);
		});

		it('Should return a validation error', function() {
			validationErrors.should.have.length(1);
		});
	});

	describe('When validating an undefined value', function() {
		before(function() {
			var objectWithUndefinedProperty = {
				property: undefined
			};

			validationErrors = validator.validate(objectWithUndefinedProperty);
		});

		it('Should return a validation error', function() {
			validationErrors.should.have.length(1);
		});
	});

	describe('When validating a null value', function() {
		before(function() {
			var objectWithNullProperty = {
				property: null
			};

			validationErrors = validator.validate(objectWithNullProperty);
		});

		it('Should return a validation error', function() {
			validationErrors.should.have.length(1);
		});
	});
});

var ValueIsExclusiveBetweenValidator = function() {
	Validator.call(this);

	this.ruleFor('property').isExclusivelyBetween(MINIMUM_VALUE, MAXIMUM_VALUE);
};

util.inherits(ValueIsExclusiveBetweenValidator, Validator);