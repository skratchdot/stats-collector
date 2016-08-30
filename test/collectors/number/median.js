import { expect } from 'chai';
import * as lib from '../../../src/index';
const collectorNames = ['AdvancedNumberStats'];
const methodName = 'median';
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
      describe(`${collectorName}:`, () => {
        beforeEach(() => {
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
