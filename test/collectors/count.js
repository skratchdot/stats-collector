/*eslint strict:0 */
'use strict';
const expect = require('chai').expect;
const lib = require('../../transpiled/index');
const collectorNames = ['BasicStatCollector', 'StatCollector', 'AdvancedStatCollector'];
const methodName = 'count';
let collector;

const test = function (values, expected) {
  const u = `update(${JSON.stringify(values)})`;
  it(`${methodName} should be ${expected} after calling ${u}`, function () {
    collector.update(values);
    const result = collector.get();
    expect(result[methodName]).to.equal(expected);
  });
};

describe(`${methodName}() method`, function () {
  it('should run for each collector', function () {
    collectorNames.forEach(function (collectorName) {
      describe(`${collectorName} count:`, function () {
        beforeEach(function () {
          collector = new lib[collectorName]();
        });
        it(`${methodName} should be 3 after calling update 3 times`, function () {
          collector.update(2);
          collector.update(4);
          collector.update(8);
          const result = collector.get();
          expect(result.count).to.equal(3);
        });
        it(`${methodName} should be 3 after calling update(2, 4, 8)`, function () {
          collector.update(2, 4, 8);
          const result = collector.get();
          expect(result.count).to.equal(3);
        });
        it(`${methodName} should be 3 after calling update([2, 4, 8])`, function () {
          collector.update([2, 4, 8]);
          const result = collector.get();
          expect(result.count).to.equal(3);
        });
        test([], undefined);
        test([1], 1);
        test([-1, -1], 2);
        test([1, 1, 1, 1, 1, 1, 1], 7);
      });
    });
  });
});
