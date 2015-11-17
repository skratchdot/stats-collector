/*eslint strict:0 */
'use strict';

const expect = require('chai').expect;
const lib = require('../src/index');

let statCollector;

const testBaseMethods = function () {
  it('should have the correct base methods', function () {
    ['addCollector', 'get', 'update', 'reset'].forEach(function (method) {
      expect(statCollector).to.respondTo(method);
    });
  });
};

const testResetValues = function (coll) {
  const result = coll.get();
  Object.keys(result).forEach(function (key) {
    expect(key).to.be.a('string');
    expect(result[key]).to.eql(undefined);
  });
};

const testCommon = function (numCollectors) {
  testBaseMethods();
  it('should have ${numCollectors} collectors', function () {
    expect(statCollector._collectors).to.be.an('array');
    expect(statCollector._collectors).to.have.length(numCollectors);
    if (numCollectors === 0) {
      expect(statCollector._collectors).to.eql([]);
    }
  });
  it('should have results', function () {
    const results = statCollector.get();
    expect(results).to.be.an('object');
  });
  describe('reset()', function () {
    const describeText = 'values should be undefined';
    describe('after construction', function () {
      it(describeText, function () {
        testResetValues(statCollector);
      });
    });
    describe('after update(5)', function () {
      it(describeText, function () {
        statCollector.update(5);
        statCollector.reset();
        testResetValues(statCollector);
      });
    });
  });
};

describe('BaseStatCollector', function () {
  beforeEach(function () {
    statCollector = new lib.BaseStatCollector();
  });
  testCommon(0);
});

describe('BasicStatCollector', function () {
  beforeEach(function () {
    statCollector = new lib.BasicStatCollector();
  });
  testCommon(5);
});

describe('StatCollector', function () {
  beforeEach(function () {
    statCollector = new lib.StatCollector();
  });
  testCommon(8);
});

describe('AdvancedStatCollector', function () {
  beforeEach(function () {
    statCollector = new lib.AdvancedStatCollector();
  });
  testCommon(21);
});
