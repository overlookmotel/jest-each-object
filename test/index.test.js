/* --------------------
 * jest-each-object module
 * Tests
 * ------------------*/

'use strict';

// Modules
const eachObject = require('../index');

// Init
require('./utils');

// Tests

// NB No tests for `.only` as cannot construct a test which will run to check it works,
// as `.only` excludes it from running!

const cases = [
	{left: 1, right: 2, sum: 3},
	{left: 3, right: 5, sum: 8}
];

const expectedRuns = cases.map((props, index) => ({'#': index + 1, ...props}));

describe.each([
	['eachObject().it', (name, fn) => eachObject(cases).it(name, fn)],
	['eachObject().test', (name, fn) => eachObject(cases).test(name, fn)],
	['eachObject().describe', (name, fn) => (
		eachObject(cases).describe('ignore me!', (props) => {
			it(name, () => { // eslint-disable-line jest/expect-expect
				fn(props);
			});
		})
	)]
])('%s', (name, fn) => {
	const runs = [];
	fn('ignore me!', (props) => {
		runs.push(props);
	});

	it('runs all the cases', () => {
		expect(runs).toEqual(expectedRuns);
	});
});

describe.each([
	['eachObject().it.skip', (name, fn) => eachObject(cases).it.skip(name, fn)],
	['eachObject().test.skip', (name, fn) => eachObject(cases).test.skip(name, fn)],
	['eachObject().describe.skip', (name, fn) => (
		eachObject(cases).describe.skip('ignore me!', (props) => {
			it(name, () => { // eslint-disable-line jest/expect-expect
				fn(props);
			});
		})
	)],
	['eachObject().xit', (name, fn) => eachObject(cases).xit(name, fn)],
	['eachObject().xtest', (name, fn) => eachObject(cases).xtest(name, fn)],
	['eachObject().xdescribe', (name, fn) => (
		eachObject(cases).xdescribe('ignore me!', (props) => {
			it(name, () => { // eslint-disable-line jest/expect-expect
				fn(props);
			});
		})
	)]
])('%s', (name, fn) => {
	const runs = [];
	fn('ignore me!', (props) => {
		runs.push(props);
	});

	it('skips all the cases', () => {
		expect(runs).toEqual([]);
	});
});
