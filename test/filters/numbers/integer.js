import { expect } from 'chai';
import * as lib from '../../../src/index';
const collectorNames = ['BasicNumberStats', 'NumberStats', 'AdvancedNumberStats'];
const methodName = 'count';
const filterName = 'integer';
let collector;

const test = (values, expected) => {
  const u = `processAll(${JSON.stringify(values)})`;
  it(`with filter ${filterName}: ${methodName} should be ${expected} after calling ${u}`, () => {
    collector.processAll(values);
    const result = collector.get();
    expect(result[methodName]).to.eql(expected);
  });
};

describe(`${methodName}() method`, () => {
  it('should run for each collector', () => {
    collectorNames.forEach((collectorName) => {
      describe(`${collectorName}:`, () => {
        beforeEach(() => {
          collector = new lib[collectorName]();
          collector.addFilter(lib.filters.number[filterName]);
        });
        test([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5], 11);
        test([-5.1, -4.1, -3, -2, -1, 0, 1.1, 2.1, 3, 4, 5], 7);
      });
    });
  });
});
