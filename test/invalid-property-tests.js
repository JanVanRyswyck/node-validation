var should = require('chai').should(),
	util = require('util'),
    Validator = require('../lib').Validator,
    UndefinedPropertyError = require('../lib').UndefinedPropertyError;

describe('When validating the value of a property that is not defined on an object', function() {
	var validation;

	before(function() {
		var object = {
			property: ''
		};

		var validator = new InvalidPropertyValidator();
		validation = function() { validator.validate(object); };
	});

	it('Should throw an error', function() {
		validation.should.throw(UndefinedPropertyError);
	});
});

var InvalidPropertyValidator = function() {
	Validator.call(this);

	this.ruleFor('unExistingProperty').isNotEmpty();
};

util.inherits(InvalidPropertyValidator, Validator);