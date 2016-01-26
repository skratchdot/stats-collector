import { expect } from 'chai';
import * as lib from '../../../src/index';
const collectorNames = ['BasicNumberStats', 'NumberStats', 'AdvancedNumberStats'];
const methodName = 'count';
let collector;

const test = function (values, expected) {
  const u = `process(${JSON.stringify(values)})`;
  it(`${methodName} should be ${expected} after calling ${u}`, function () {
    collector.processAll(values);
    const result = collector.get();
    expect(result[methodName]).to.deep.equal(expected);
  });
};

describe(`${methodName}() method`, function () {
  it('should run for each collector', function () {
    collectorNames.forEach(function (collectorName) {
      describe(`${collectorName} count:`, function () {
        beforeEach(function () {
          collector = new lib[collectorName]();
        });
        it(`${methodName} should be 3 after calling process 3 times`, function () {
          collector.process(2);
          collector.process(4);
          collector.process(8);
          const result = collector.get();
          expect(result.count).to.equal(3);
        });
        it(`${methodName} should be 3 after calling processAll([2, 4, 8])`, function () {
          collector.processAll([2, 4, 8]);
          const result = collector.get();
          expect(result.count).to.equal(3);
        });
        test([1], 1);
        test([-1, -1], 2);
        test([1, 1, 1, 1, 1, 1, 1], 7);
      });
    });
  });
});
