import { expect } from 'chai';
import * as lib from '../../../src/index';
import Values from '../../../src/collectors/number/Values';
import ValuesSorted from '../../../src/collectors/number/ValuesSorted';
const methodName = 'valuesSorted';
const collector = new lib.BaseStats();
collector.addCollector(new Values());
collector.addCollector(new ValuesSorted());

const test = (values, expected) => {
  const u = `processAll(${JSON.stringify(values)})`;
  it(`${methodName} should be ${expected} after calling ${u}`, () => {
    collector.processAll(values);
    const result = collector.get();
    expect(result[methodName]).to.deep.equal(expected);
  });
};

describe(`${methodName}() method`, () => {
  test([25, 35, 10, 17, 29, 14, 21, 31], [10, 14, 17, 21, 25, 29, 31, 35]);
});
