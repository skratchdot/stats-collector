import { expect } from 'chai';
import * as lib from '../../../src/index';
const collectorNames = ['AdvancedNumberStats'];
const methodName = 'standardDeviationRunning';
let collector;

const test = function (values, expected) {
  const u = `processAll(${JSON.stringify(values)})`;
  it(`${methodName} should be ${expected} after calling ${u}`, function () {
    collector.processAll(values);
    const result = collector.get();
    expect(result[methodName]).to.deep.equal(expected);
  });
};

describe(`${methodName}() method`, function () {
  it('should run for each collector', function () {
    collectorNames.forEach(function (collectorName) {
      describe(`${collectorName}:`, function () {
        beforeEach(function () {
          collector = new lib[collectorName]();
        });
        test([25, 35, 10, 17, 29, 14, 21, 31], 8.762745818846641);
        test([0], 0);
        test([-1], 0);
        test([1], 0);
        test([10, 10, 10, 10, 10], 0);
      });
    });
  });
});
