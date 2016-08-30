import { expect } from 'chai';
import * as lib from '../src/index';

let stats;

const testBaseMethods = () => {
  it('should have the correct base methods', () => {
    [
      'addCollector', 'addFilter', 'addIgnore',
      'get', 'process', 'reset'
    ].forEach((method) => {
      expect(stats).to.respondTo(method);
    });
  });
};

const testResetValues = (coll) => {
  const result = coll.get();
  Object.keys(result).forEach((key) => {
    expect(key).to.be.a('string');
    expect(result[key]).to.eql(undefined);
  });
};

const testCommon = (numCollectors) => {
  testBaseMethods();
  it(`should have ${numCollectors} collectors`, () => {
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
  it('should have results', () => {
    const results = stats.get();
    expect(results).to.be.an('object');
  });
  it('should be able to use addIgnore(name)', () => {
    stats.addIgnore('count');
    stats.process(42);
    const results = stats.get();
    expect(results.count).to.be.undefined;
    if (numCollectors > 0) {
      expect(results.sum).to.equal(42);
    }
    // duplicate addIgnore() call okay
    expect(() => {
      stats.addIgnore('count');
    }).to.not.throw(Error);
  });
  describe('process() with invalid types', () => {
    [
      NaN, -Infinity, Infinity,
      '', 'wow', 'a string',
      undefined, null, [], {}
    ].forEach((val) => {
      it(`should not be a number after processing: ${val}`, () => {
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
  describe('reset()', () => {
    const describeText = 'values should be undefined';
    describe('after construction', () => {
      it(describeText, () => {
        testResetValues(stats);
      });
    });
    describe('after process(5)', () => {
      it(describeText, () => {
        stats.process(5);
        stats.reset();
        testResetValues(stats);
      });
    });
  });
  describe('Expected Errors', () => {
    it('cannot call addCollector() after process()', () => {
      stats.process(5);
      expect(() => {
        stats.addCollector({ name: 'test' });
      }).to.throw(Error);
    });
    it('cannot add a collector with the same name', () => {
      const addIt = () => {
        const customCollector = new lib.collectors.Collector('test', 0);
        stats.addCollector(customCollector);
      };
      expect(addIt).to.not.throw(Error); // first call works
      expect(addIt).to.throw(Error); // second call fails
    });
    it('cannot addCollector() if requirements aren\'t met', () => {
      expect(() => {
        const customCollector = new lib.collectors.Collector('test', 0, ['aNamedCollectorThatDoesNotExist']);
        stats.addCollector(customCollector);
      }).to.throw(Error);
    });
    it('cannot addCollector() if requirements are not an array', () => {
      expect(() => {
        const customCollector = new lib.collectors.Collector('test', 0, {});
        stats.addCollector(customCollector);
      }).to.throw(Error);
    });
    it('addCollector() only accepts objects with a name', () => {
      expect(() => {
        stats.addCollector();
      }).to.throw(Error);
      expect(() => {
        stats.addCollector('test');
      }).to.throw(Error);
      expect(() => {
        stats.addCollector({});
      }).to.throw(Error);
      expect(() => {
        stats.addCollector({ onProcess: () => {
          return 42;
        } });
      }).to.throw(Error);
    });
    it('addFilter() only accepts functions', () => {
      expect(() => {
        stats.addFilter();
      }).to.throw(Error);
      expect(() => {
        stats.addFilter(null);
      }).to.throw(Error);
      expect(() => {
        stats.addFilter({});
      }).to.throw(Error);
      expect(() => {
        stats.addFilter([]);
      }).to.throw(Error);
      expect(() => {
        stats.addFilter(() => {
          return true;
        });
      }).to.not.throw(Error);
    });
    it('should allow multiple calls to get() without changing results', () => {
      for (let i = -100; i < 100; i++) {
        stats.process(i);
      }
      const results1 = stats.get();
      const results2 = stats.get();
      expect(results1).to.deep.equal(results2);
    });
    it('should work when passing get(false) or get(true)', () => {
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
  ['NumberStats', 9],
  ['AdvancedNumberStats', 30]
].forEach((data) => {
  const collector = data[0];
  const numCollectors = data[1];
  describe(`${collector}`, () => {
    beforeEach(() => {
      stats = new lib[collector]();
    });
    testCommon(numCollectors);
  });
});
