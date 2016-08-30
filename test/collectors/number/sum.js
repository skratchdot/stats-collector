import { expect } from 'chai';
import * as lib from '../../../src/index';
const collectorNames = ['BasicNumberStats', 'NumberStats', 'AdvancedNumberStats'];
const methodName = 'sum';
let collector;

const test = (values, expected) => {
  const u = `processAll(${JSON.stringify(values)})`;
  it(`${methodName} should be ${expected} after calling ${u}`, () => {
    collector.processAll(values);
    const result = collector.get();
    expect(result[methodName]).to.deep.equal(expected);
  });
};

describe(`${methodName}() method`, () => {
  it('should run for each collector', () => {
    collectorNames.forEach((collectorName) => {
      describe(`${collectorName} sum:`, () => {
        beforeEach(() => {
          collector = new lib[collectorName]();
        });
        it(`${methodName} should be 14 after calling process 3 times`, () => {
          collector.process(2);
          collector.process(4);
          collector.process(8);
          const result = collector.get();
          expect(result.sum).to.equal(14);
        });
        it(`${methodName} should be 14 after calling processAll([2, 4, 8])`, () => {
          collector.processAll([2, 4, 8]);
          const result = collector.get();
          expect(result.sum).to.equal(14);
        });
        test([-1], -1);
        test([-1, 1], 0);
        test([0, 0, 0, 0], 0);
        test([100, 100], 200);
      });
    });
  });
});
