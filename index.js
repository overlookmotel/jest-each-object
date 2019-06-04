/* --------------------
 * jest-each-object module
 * ------------------*/

'use strict';

// Modules
const each = require('jest-each').default,
	jestEachTable = require('jest-each-table');

// Exports
module.exports = function eachObject(arr) {
	const cases = jestEachTable(arr);
	return each.call(this, ...cases);
};
