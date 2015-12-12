/*eslint strict:0 */
'use strict';

const expect = require('chai').expect;
const lib = require('../src/index');

let stats;

const testBaseMethods = function () {
  it('should have the correct base methods', function () {
    [
      'addCollector', 'addFilter', 'addIgnore',
      'get', 'process', 'reset'
    ].forEach(function (method) {
      expect(stats).to.respondTo(method);
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
    expect(stats._collectorNames).to.be.an('array');
    expect(stats._collectors).to.be.an('object');
    expect(Object.keys(stats._collectors).sort())
      .to.eql(stats._collectorNames.sort());
      expect(stats._collectorNames).to.have.length(numCollectors);
    expect(Object.keys(stats._collectors)).to.have.length(numCollectors);
    if (numCollectors === 0) {
      expect(stats._collectorNames).to.eql([]);
      expect(stats._collectors).to.eql({});
    }
  });
  it('should have results', function () {
    const results = stats.get();
    expect(results).to.be.an('object');
  });
  it('should be able to use addIgnore(name)', function () {
    stats.addIgnore('count');
    stats.process(42);
    const results = stats.get();
    expect(results.count).to.be.undefined;
    if (numCollectors > 0) {
      expect(results.sum).to.equal(42);
    }
    // duplicate addIgnore() call okay
    expect(function () {
      stats.addIgnore('count');
    }).to.not.throw(Error);
  });
  describe('process() with invalid types', function () {
    [
      NaN, -Infinity, Infinity,
      '', 'wow', 'a string',
      undefined, null, [], {}
    ].forEach(function (val) {
      it(`should not be a number after processing: ${val}`, function () {
        stats.process(42);
        stats.process(val);
        stats.process(3);
        const result = stats.get();
        expect(result).to.be.object;
        if (numCollectors > 0) {
          expect(result.count).to.not.be.a.number;
          expect(result.sum).to.not.be.a.number;
        }
      });
    });
  });
  describe('reset()', function () {
    const describeText = 'values should be undefined';
    describe('after construction', function () {
      it(describeText, function () {
        testResetValues(stats);
      });
    });
    describe('after process(5)', function () {
      it(describeText, function () {
        stats.process(5);
        stats.reset();
        testResetValues(stats);
      });
    });
  });
  describe('Expected Errors', function () {
    it('cannot call addCollector() after process()', function () {
      stats.process(5);
      expect(function () {
        stats.addCollector({name: 'test'});
      }).to.throw(Error);
    });
    it('cannot add a collector with the same name', function () {
      const addIt = function () {
        const customCollector = new lib.collectors.Collector('test', 0);
        stats.addCollector(customCollector);
      };
      expect(addIt).to.not.throw(Error); // first call works
      expect(addIt).to.throw(Error); // second call fails
    });
    it('cannot addCollector() if requirements aren\'t met', function () {
      expect(function () {
        const customCollector = new lib.collectors.Collector('test', 0, ['aNamedCollectorThatDoesNotExist']);
        stats.addCollector(customCollector);
      }).to.throw(Error);
    });
    it('cannot addCollector() if requirements are not an array', function () {
      expect(function () {
        const customCollector = new lib.collectors.Collector('test', 0, {});
        stats.addCollector(customCollector);
      }).to.throw(Error);
    });
    it('addCollector() only accepts objects with a name', function () {
      expect(function () {
        stats.addCollector();
      }).to.throw(Error);
      expect(function () {
        stats.addCollector('test');
      }).to.throw(Error);
      expect(function () {
        stats.addCollector({});
      }).to.throw(Error);
      expect(function () {
        stats.addCollector({onProcess: function () {
          return 42;
        }});
      }).to.throw(Error);
    });
    it('addFilter() only accepts functions', function () {
      expect(function () {
        stats.addFilter();
      }).to.throw(Error);
      expect(function () {
        stats.addFilter(null);
      }).to.throw(Error);
      expect(function () {
        stats.addFilter({});
      }).to.throw(Error);
      expect(function () {
        stats.addFilter([]);
      }).to.throw(Error);
      expect(function () {
        stats.addFilter(function () {
          return true;
        });
      }).to.not.throw(Error);
    });
    it('should allow multiple calls to get() without changing results', function () {
      for (let i = -100; i < 100; i++) {
        stats.process(i);
      }
      const results1 = stats.get();
      const results2 = stats.get();
      expect(results1).to.deep.equal(results2);
    });
    it('should work when passing get(false) or get(true)', function () {
      if (numCollectors > 0) {
        const r1 = stats.get();
        const r2 = stats.get(true);
        const r3 = stats.get(false);
        expect(r1).to.deep.equal(r3);
        expect(r1.count).to.be.undefined;
        expect(r2.count).to.equal(0);
      }
    });
  });
};

[
  ['BaseStats', 0],
  ['BasicNumberStats', 5],
  ['NumberStats', 8],
  ['AdvancedNumberStats', 25]
].forEach(function (data) {
  const collector = data[0];
  const numCollectors = data[1];
  describe(`${collector}`, function () {
    beforeEach(function () {
      stats = new lib[collector]();
    });
    testCommon(numCollectors);
  });
});
