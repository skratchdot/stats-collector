import { expect } from 'chai';
import * as lib from '../../../src/index';
const collectorNames = ['AdvancedNumberStats'];
const methodName = 'amean';
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
        test([25, 35, 10, 17, 29, 14, 21, 31], 22.75);
        test([-12, 30, 0, -44, 11, 8], -7 / 6);
        test([1, 2, 3, 4, 5], 3);
        test([0, 10], 5);
      });
    });
  });
});
