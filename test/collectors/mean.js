/*eslint strict:0 */
'use strict';
const expect = require('chai').expect;
const lib = require('../../src/index');
const collectorNames = ['BasicNumberStats', 'NumberStats', 'AdvancedNumberStats'];
const methodName = 'mean';
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
        test([-12, 30, 0, -44, 11, 8], -7 / 6);
        test([1, 2, 3, 4, 5], 3);
        test([0, 10], 5);
      });
    });
  });
});
