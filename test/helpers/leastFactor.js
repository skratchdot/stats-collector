import { expect } from 'chai';
import leastFactor from '../../src/helpers/leastFactor';

describe('leastFactor()', () => {
  it('should return 0', () => {
    expect(leastFactor(0)).to.equal(0);
  });
  it('should return 1', () => {
    expect(leastFactor(1)).to.equal(1);
    expect(leastFactor(-1)).to.equal(1);
    expect(leastFactor(3.3)).to.equal(1);
    expect(leastFactor(0.2)).to.equal(1);
  });
  it('should return the smallest prime that divides n', (done) => {
    expect(leastFactor(2)).to.equal(2);
    expect(leastFactor(3)).to.equal(3);
    expect(leastFactor(4)).to.equal(2);
    expect(leastFactor(5)).to.equal(5);
    expect(leastFactor(6)).to.equal(2);
    expect(leastFactor(7)).to.equal(7);
    expect(leastFactor(8)).to.equal(2);
    expect(leastFactor(9)).to.equal(3);
    expect(leastFactor(10)).to.equal(2);
    expect(leastFactor(-4)).to.equal(2);
    // first 100 primes
    [
      7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43,
      47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97
    ].forEach((n) => {
      expect(leastFactor(n)).to.equal(n);
    });
    expect(leastFactor(49)).to.equal(7); // condition 1
    expect(leastFactor(121)).to.equal(11); // condition 2
    expect(leastFactor(169)).to.equal(13); // condition 3
    expect(leastFactor(289)).to.equal(17); // condition 4
    expect(leastFactor(361)).to.equal(19); // condition 5
    expect(leastFactor(529)).to.equal(23); // condition 6
    expect(leastFactor(841)).to.equal(29); // condition 7
    expect(leastFactor(961)).to.equal(31); // condition 8
    // expect(leastFactor(341550071728321)).to.equal(10670053); // large
    done();
  });
  it('doesn\'t hang on non-finite numbers', () => {
    expect(leastFactor(NaN)).to.eql(NaN);
    expect(leastFactor(-Infinity)).to.eql(-Infinity);
    expect(leastFactor({})).to.eql({});
    expect(leastFactor([])).to.eql([]);
    expect(leastFactor(null)).to.eql(null);
    expect(leastFactor(undefined)).to.eql(undefined);
  });
});
