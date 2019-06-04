/* --------------------
 * jest-each-object module
 * Register `.eachObject()` method on `describe`, `it` etc
 * ------------------*/

'use strict';

// Modules
const jestEachTable = require('jest-each-table');

// Register `.eachObject()` methods

/* globals describe, it, test, fdescribe, fit, xdescribe, xit, xtest */

const FUNCTIONS = [
	describe,
	it,
	test,
	fdescribe,
	fit,
	xdescribe,
	xit,
	xtest
];

const METHOD_NAMES = ['skip', 'only'];

for (const fn of FUNCTIONS) {
	registerFunction(fn);
}

function registerFunction(fn) {
	if (!fn.each) return;

	augment(fn);

	for (const methodName of METHOD_NAMES) {
		const method = fn[methodName];
		if (method) registerFunction(method);
	}
}

function augment(target) {
	target.eachObject = eachObjectMethod;
}

function eachObjectMethod(arr) {
	const cases = jestEachTable(arr);
	return this.each(...cases); // eslint-disable-line no-invalid-this
}
