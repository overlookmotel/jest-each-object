/* --------------------
 * jest-each-object module
 * Tests
 * ------------------*/

'use strict';

// Modules
const jestEachObject = require('../index');

// Init
require('./utils');

// Tests

describe('tests', () => {
	it.skip('all', () => { // eslint-disable-line jest/no-disabled-tests
		expect(jestEachObject).not.toBeUndefined();
	});
});
