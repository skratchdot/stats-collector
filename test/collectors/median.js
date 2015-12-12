/*eslint strict:0 */
'use strict';
const expect = require('chai').expect;
const lib = require('../../src/index');
const collectorNames = ['AdvancedNumberStats'];
const methodName = 'median';
let collector;

const test = function (values, expected) {
  const u = `processAll(${JSON.stringify(values)})`;
  it(`${methodName} should be ${expected} after calling ${u}`, function () {
    collector.processAll(values);
    const result = collector.get();
    expect(result[methodName]).to.equal(expected);
  });
};

describe(`${methodName}() method`, function () {
  it('should run for each collector', function () {
    collectorNames.forEach(function (collectorName) {
      describe(`${collectorName}:`, function () {
        beforeEach(function () {
          collector = new lib[collectorName]();
        });
        test([42], 42);
        test([10, 20], 15);
        test([20, 10], 15);
        test([42, 42], 42);
        test([1, 2, 3], 2);
        test([2, 3, 1], 2);
        test([1, 2, 3, 4], 2.5);
        test([2, 4, 3, 1], 2.5);
      });
    });
  });
});
