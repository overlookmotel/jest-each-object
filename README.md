[![NPM version](https://img.shields.io/npm/v/jest-each-object.svg)](https://www.npmjs.com/package/jest-each-object)
[![Build Status](https://img.shields.io/travis/overlookmotel/jest-each-object/master.svg)](http://travis-ci.org/overlookmotel/jest-each-object)
[![Dependency Status](https://img.shields.io/david/overlookmotel/jest-each-object.svg)](https://david-dm.org/overlookmotel/jest-each-object)
[![Dev dependency Status](https://img.shields.io/david/dev/overlookmotel/jest-each-object.svg)](https://david-dm.org/overlookmotel/jest-each-object)
[![Greenkeeper badge](https://badges.greenkeeper.io/overlookmotel/jest-each-object.svg)](https://greenkeeper.io/)
[![Coverage Status](https://img.shields.io/coveralls/overlookmotel/jest-each-object/master.svg)](https://coveralls.io/r/overlookmotel/jest-each-object)

# Jest Parameterised Testing with objects

## What it's for

[jest-each](https://www.npmjs.com/package/jest-each) and Jest's built in `it.each()` etc methods are great for defining a batch of test cases in one go.

```js
it.each( [
  [1, 2, 3],
  [4, 5, 9]
] )('%s + %s = %s', (left, right, sum) => {
  expect(left + right).toBe(sum);
} );
```

But the test name has to be constructed in printf-style, which doesn't allow named parameters. This sometimes makes the cases hard to write clearly.

This library is a solution to that problem.

## Usage

### Stand-alone

```js
const eachObject = require('jest-each-object');

eachObject( [
  {left: 1, right: 2, sum: 3},
  {left: 4, right: 5, sum: 9},
] ).it('$left + $right = $sum', ( {left, right, sum} ) => {
  expect(left + right).toBe(sum);
} );
```

`eachObject()` has same signature as [jest-each](https://www.npmjs.com/package/jest-each). You can postpend `eachObject()` with:

* `.it()`
* `.test()`
* `.describe()`
* `.it.skip()` / `.test.skip()` / `.describe.skip()`
* `.it.only()` / `.test.only()` / `.describe.only()`

### Add global methods

At the top of your test file:

```js
require('jest-each-object/register');
```

Now you can substitute `.eachObject()` anywhere you could use `.each()`.

```js
it.eachObject( [
  {left: 1, right: 2, sum: 3},
  {left: 4, right: 5, sum: 9},
] )('$left + $right = $sum', ( {left, right, sum} ) => {
  expect(left + right).toBe(sum);
} );

describe.eachObject( /* ... */ )( /* ... */ );

it.skip.eachObject( /* ... */ )( /* ... */ );
describe.only.eachObject( /* ... */ )( /* ... */ );
xdescribe.eachObject( /* ... */ )( /* ... */ );

/* ... etc etc ... */
```

## Credits

The clever stuff is done by this library's dependency [jest-each-table](https://www.npmjs.com/package/jest-each-table). `jest-each-object` just adds sugar.

## Tests

Use `npm test` to run the tests. Use `npm run cover` to check coverage.

## Changelog

See [changelog.md](https://github.com/overlookmotel/jest-each-object/blob/master/changelog.md)

## Issues

If you discover a bug, please raise an issue on Github. https://github.com/overlookmotel/jest-each-object/issues

## Contribution

Pull requests are very welcome. Please:

* ensure all tests pass before submitting PR
* add tests for new features
* document new functionality/API additions in README
* do not add an entry to Changelog (Changelog is created when cutting releases)
