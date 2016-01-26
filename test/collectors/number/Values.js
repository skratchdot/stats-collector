import { expect } from 'chai';
import * as lib from '../../../src/index';
import Values from '../../../src/collectors/number/Values';
const methodName = 'values';
const collector = new lib.BaseStats();
collector.addCollector(new Values());

const test = function (values, expected) {
  const u = `processAll(${JSON.stringify(values)})`;
  it(`${methodName} should be ${expected} after calling ${u}`, function () {
    collector.processAll(values);
    const result = collector.get();
    expect(result[methodName]).to.deep.equal(expected);
  });
};

describe(`${methodName}() method`, function () {
  test([25, 35, 10, 17, 29, 14, 21, 31], [25, 35, 10, 17, 29, 14, 21, 31]);
});
