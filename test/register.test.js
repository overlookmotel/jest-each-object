/* --------------------
 * jest-each-object module
 * Tests
 * ------------------*/

'use strict';

// Modules
require('../register');

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
	['it.eachObject()', (name, fn) => it.eachObject(cases)(name, fn)],
	['test.eachObject()', (name, fn) => test.eachObject(cases)(name, fn)],
	['describe.eachObject()', (name, fn) => (
		describe.eachObject(cases)('ignore me!', (props) => {
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
	['it.skip.eachObject()', (name, fn) => it.skip.eachObject(cases)(name, fn)],
	['test.skip.eachObject()', (name, fn) => test.skip.eachObject(cases)(name, fn)],
	['describe.skip.eachObject()', (name, fn) => (
		describe.skip.eachObject(cases)('ignore me!', (props) => {
			it(name, () => { // eslint-disable-line jest/expect-expect
				fn(props);
			});
		})
	)],
	['xit.eachObject()', (name, fn) => xit.eachObject(cases)(name, fn)],
	['xtest.eachObject()', (name, fn) => xtest.eachObject(cases)(name, fn)],
	['xdescribe.eachObject()', (name, fn) => (
		xdescribe.eachObject(cases)('ignore me!', (props) => {
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
