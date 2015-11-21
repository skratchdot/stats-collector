/*eslint strict:0 */
'use strict';

const expect = require('chai').expect;
const lib = require('../src/index');

let statsCollector;

const testBaseMethods = function () {
  it('should have the correct base methods', function () {
    ['addCollector', 'get', 'update', 'reset'].forEach(function (method) {
      expect(statsCollector).to.respondTo(method);
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
    expect(statsCollector._collectors).to.be.an('array');
    expect(statsCollector._collectors).to.have.length(numCollectors);
    if (numCollectors === 0) {
      expect(statsCollector._collectors).to.eql([]);
    }
  });
  it('should have results', function () {
    const results = statsCollector.get();
    expect(results).to.be.an('object');
  });
  it('should be able to use addIgnore(name)', function () {
    statsCollector.addIgnore('count');
    statsCollector.update(42);
    const results = statsCollector.get();
    expect(results.count).to.be.undefined;
    if (numCollectors > 0) {
      expect(results.sum).to.equal(42);
    }
    // duplicate addIgnore() call okay
    expect(function () {
      statsCollector.addIgnore('count');
    }).to.not.throw(Error);
  });
  describe('update() with NaN and Infinite', function () {
    [
      NaN, -Infinity, Infinity,
      '', 'wow', 'a string',
      undefined, null, [], {}
    ].forEach(function (val) {
      it(`should ignore ${val}`, function () {
        statsCollector.update(42);
        statsCollector.update(val);
        statsCollector.update(3);
        const result = statsCollector.get();
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
        testResetValues(statsCollector);
      });
    });
    describe('after update(5)', function () {
      it(describeText, function () {
        statsCollector.update(5);
        statsCollector.reset();
        testResetValues(statsCollector);
      });
    });
  });
  describe('Expected Errors', function () {
    it('cannot call addCollector() after update()', function () {
      statsCollector.update(5);
      expect(function () {
        statsCollector.addCollector({name: 'test'});
      }).to.throw(Error);
    });
    it('cannot add a collector with the same name', function () {
      const addIt = function () {
        statsCollector.addCollector({name: 'test'});
      };
      expect(addIt).to.not.throw(Error); // first call works
      expect(addIt).to.throw(Error); // second call fails
    });
    it('cannot addCollector() if requirements aren\'t met', function () {
      expect(function () {
        statsCollector.addCollector({
          name: 'test',
          requirements: ['aNamedCollectorThatDoesNotExist']
        });
      }).to.throw(Error);
    });
    it('addCollector() only accepts objects with a name', function () {
      expect(function () {
        statsCollector.addCollector();
      }).to.throw(Error);
      expect(function () {
        statsCollector.addCollector('test');
      }).to.throw(Error);
      expect(function () {
        statsCollector.addCollector({});
      }).to.throw(Error);
      expect(function () {
        statsCollector.addCollector({onUpdate: function () {
          return 42;
        }});
      }).to.throw(Error);
    });
    it('addFilter() only accepts functions', function () {
      expect(function () {
        statsCollector.addFilter();
      }).to.throw(Error);
      expect(function () {
        statsCollector.addFilter(null);
      }).to.throw(Error);
      expect(function () {
        statsCollector.addFilter({});
      }).to.throw(Error);
      expect(function () {
        statsCollector.addFilter([]);
      }).to.throw(Error);
      expect(function () {
        statsCollector.addFilter(function () {
          return true;
        });
      }).to.not.throw(Error);
    });
    it('should allow multiple calls to get() without changing results', function () {
      for (let i = -100; i < 100; i++) {
        statsCollector.update(i);
      }
      const results1 = statsCollector.get();
      const results2 = statsCollector.get();
      expect(results1).to.deep.equal(results2);
    });
    it('should work when passing get(false) or get(true)', function () {
      if (numCollectors > 0) {
        const r1 = statsCollector.get();
        const r2 = statsCollector.get(true);
        const r3 = statsCollector.get(false);
        expect(r1).to.deep.equal(r3);
        expect(r1.count).to.be.undefined;
        expect(r2.count).to.equal(0);
      }
    });
  });
};

describe('BaseStatsCollector', function () {
  beforeEach(function () {
    statsCollector = new lib.BaseStatsCollector();
  });
  testCommon(0);
});

describe('BasicStatsCollector', function () {
  beforeEach(function () {
    statsCollector = new lib.BasicStatsCollector();
  });
  testCommon(5);
});

describe('StatsCollector', function () {
  beforeEach(function () {
    statsCollector = new lib.StatsCollector();
  });
  testCommon(8);
});

describe('AdvancedStatsCollector', function () {
  beforeEach(function () {
    statsCollector = new lib.AdvancedStatsCollector();
  });
  testCommon(21);
});
