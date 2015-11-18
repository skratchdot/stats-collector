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
  it(`should have ${numCollectors} collectors`, function () {
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
  it('should be able to use addIgnore(name)', function () {
    statCollector.addIgnore('count');
    statCollector.update(42);
    const results = statCollector.get();
    expect(results.count).to.be.undefined;
    if (numCollectors > 0) {
      expect(results.sum).to.equal(42);
    }
    // duplicate addIgnore() call okay
    expect(function () {
      statCollector.addIgnore('count');
    }).to.not.throw(Error);
  });
  describe('update() with NaN and Infinite', function () {
    [
      NaN, -Infinity, Infinity,
      '', 'wow', 'a string',
      undefined, null, [], {}
    ].forEach(function (val) {
      it(`should ignore ${val}`, function () {
        statCollector.update(42);
        statCollector.update(val);
        statCollector.update(3);
        const result = statCollector.get();
        expect(result).to.be.object;
        if (numCollectors > 0) {
          expect(result.count).to.equal(2);
          expect(result.sum).to.equal(45);
        }
      });
    });
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
  describe('Expected Errors', function () {
    it('cannot call addCollector() after update()', function () {
      statCollector.update(5);
      expect(function () {
        statCollector.addCollector({name: 'test'});
      }).to.throw(Error);
    });
    it('cannot add a collector with the same name', function () {
      const addIt = function () {
        statCollector.addCollector({name: 'test'});
      };
      expect(addIt).to.not.throw(Error); // first call works
      expect(addIt).to.throw(Error); // second call fails
    });
    it('cannot addCollector() if requirements aren\'t met', function () {
      expect(function () {
        statCollector.addCollector({
          name: 'test',
          requirements: ['aNamedCollectorThatDoesNotExist']
        });
      }).to.throw(Error);
    });
    it('addCollector() only accepts objects with a name', function () {
      expect(function () {
        statCollector.addCollector();
      }).to.throw(Error);
      expect(function () {
        statCollector.addCollector('test');
      }).to.throw(Error);
      expect(function () {
        statCollector.addCollector({});
      }).to.throw(Error);
      expect(function () {
        statCollector.addCollector({onUpdate: function () {
          return 42;
        }});
      }).to.throw(Error);
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
