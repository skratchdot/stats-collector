/*eslint strict:0 */
'use strict';
const expect = require('chai').expect;
const lib = require('../../src/index');
const collectorNames = ['AdvancedNumberStats'];
const methodName = 'varianceStable';
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
        test([0], 0);
        test([-1], 0);
        test([1], 0);
        test([10, 10, 10, 10, 10], 0);
        test([1, 2, 3, 4, 5], 5 / 2);
      });
    });
  });
});
