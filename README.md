# node-validation

A minimal but slightly opinionated validation library for Node.js.

## Install

``` bash
  $ npm install node-validation
```

## Example

In order to use the API, one needs to inherit from the base Validator. The validation rules can then be defined.

``` js
var MyObjectValidator = function() {
	Validator.call(this);

	this.ruleFor('stringProperty').isNotEmpty();
	this.ruleFor('otherStringProperty').hasMaximumLength(10);

	this.ruleFor('numericStringProperty').isNumber().withMessage('Oops, something is wrong ...');
	this.ruleFor('dateStringProperty').matches(/^(19|20)\d\d[-](0[1-9]|1[012])[-](0[1-9]|[12][0-9]|3[01])$/);

	this.ruleFor('numberProperty').isInteger();
	this.ruleFor('otherNumberProperty').isMaximum(5);

	this.ruleFor('exoticProperty').is(function(value) {
		return 3 === value.propertyA + value.propertyB;
	}).withMessage('Either propertyA or propertyB has an incorrect value.');
};

util.inherits(MyObjectValidator, Validator);
```

After creating a validator object, an object that needs to be validated (the subject) can be passed to `validate` method. 
The `validate` method returns an array of validation errors specifying a message and the name of the violating property.

``` js 
//
// Validation subject
//
var subject = {
	stringProperty: '',
	otherStringProperty: 'Some string value that is too long ...',

	numericStringProperty: '65.85 invalid',
	dateStringProperty: '2013-04-30 invalid',

	numberProperty: 'Some invalid number',
	otherNumberProperty: 48,

	exoticProperty: {
		propertyA: 1,
		propertyB: 1
	}
};

//
// Now it's time to validate
//
var validator = new MyObjectValidator();
var validationErrors = validator.validate(subject);

for(var i=0; i < validationErrors.length; i++) {
	console.log('Property name: ' + validationErrors[i].propertyName + ', Message: ' + validationErrors[i].message);
}
```

## List of validations

#### hasMaximumLength

The length of a value must be less than or equal to a specified maximum length.

#### hasMinimumLength

The length of a value must be greater than or equal to a specified minimum length.

#### isEmpty

The value must be empty.

#### isNotEmpty

The value cannot be empty.

#### isNotNull

The value cannot be null or undefined.

#### is

Use a custom validation function to validate a specified value.

#### isBetween

The value must be between or equal to a specified minimum and maximum value.

#### isMaximum

The value must be less than or equal to a specified maximum value.

#### isMinimum

The value must be greater than or equal to a specified minimum value.

#### isExclusivelyBetween

The value must be between a specified minimum and maximum value.

#### isExclusiveMaximum

The value must be less than a specified maximum value. 

#### isExclusiveMinimum

The value must be greater than a specified minimum value.

#### isInteger

The value must be an integer.

#### isNumber

The value must be a number.

#### matches

The value must match a particular pattern (regular expression)

### Custom message

A custom message can be registered for a rule using the `withMessage` method.

``` js 
this.ruleFor('numericStringProperty').isNumber().withMessage('Oops, something is wrong ...');
```

## Tests

Clone this repository from GitHub. Go to the directory that contains the cloned source code and install the devDependencies.

``` bash
  $ npm install
```

Then run the tests.

``` bash
  $ npm run-script test
```

## License

(The MIT License)

Copyright (c) 2013 Jan Van Ryswyck

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.