import { expect } from 'chai';
import * as lib from '../../../src/index';
const collectorNames = ['AdvancedNumberStats'];
const methodName = 'sumOfSquaredDeviationsStable';
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
        test([0], 0);
        test([-1], 0);
        test([1], 0);
        test([10, 10, 10, 10, 10], 0);
        test([1, 2, 3, 4, 5], 10);
      });
    });
  });
});
