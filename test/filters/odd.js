/*eslint strict:0 */
'use strict';
const expect = require('chai').expect;
const lib = require('../../src/index');
const collectorNames = ['BasicNumberStats', 'NumberStats', 'AdvancedNumberStats'];
const methodName = 'count';
const filterName = 'odd';
let collector;

const test = function (values, expected) {
  const u = `processAll(${JSON.stringify(values)})`;
  it(`with filter ${filterName}: ${methodName} should be ${expected} after calling ${u}`, function () {
    collector.processAll(values);
    const result = collector.get();
    expect(result[methodName]).to.eql(expected);
  });
};

describe(`${methodName}() method`, function () {
  it('should run for each collector', function () {
    collectorNames.forEach(function (collectorName) {
      describe(`${collectorName}:`, function () {
        beforeEach(function () {
          collector = new lib[collectorName]();
          collector.addFilter(lib.filters.number[filterName]);
        });
        test([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5], 6);
        test([-5.1, -4.1, -3, -2, -1, 0, 1.1, 2.1, 3, 4, 5], 4);
      });
    });
  });
});
