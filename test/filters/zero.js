/*eslint strict:0 */
'use strict';
const expect = require('chai').expect;
const lib = require('../../src/index');
const collectorNames = ['BasicStatsCollector', 'StatsCollector', 'AdvancedStatsCollector'];
const methodName = 'count';
const filterName = 'zero';
let collector;

const test = function (values, expected) {
  const u = `update(${JSON.stringify(values)})`;
  it(`with filter ${filterName}: ${methodName} should be ${expected} after calling ${u}`, function () {
    collector.update(values);
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
          collector.addFilter(lib.filters[filterName]);
        });
        test([], undefined);
        test(['string'], undefined);
        test([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5], 1);
        test([-5.1, -4.1, -3, -2, -1, 0, 1.1, 2.1, 3, 4, 5], 1);
        test([-2, 2, 5], undefined);
        test([1, 2, 0, 0, -4], 2);
      });
    });
  });
});
