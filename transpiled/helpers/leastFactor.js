"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// Source: http://www.javascripter.net/faq/numberisprime.htm
//
// leastFactor(n)
// returns the smallest prime that divides n
//      0  if n=0
//      1  if n=1, n=-1, or n is not an integer
var leastFactor = function leastFactor(n) {
  if (n === 0) {
    return 0;
  }
  if (n % 1 || n * n < 2) {
    return 1;
  }
  if (n % 2 === 0) {
    return 2;
  }
  if (n % 3 === 0) {
    return 3;
  }
  if (n % 5 === 0) {
    return 5;
  }
  var m = Math.sqrt(n);
  for (var i = 7; i <= m; i += 30) {
    if (n % i === 0) {
      return i;
    }
    if (n % (i + 4) === 0) {
      return i + 4;
    }
    if (n % (i + 6) === 0) {
      return i + 6;
    }
    if (n % (i + 10) === 0) {
      return i + 10;
    }
    if (n % (i + 12) === 0) {
      return i + 12;
    }
    if (n % (i + 16) === 0) {
      return i + 16;
    }
    if (n % (i + 22) === 0) {
      return i + 22;
    }
    if (n % (i + 24) === 0) {
      return i + 24;
    }
  }
  return n;
};

exports.default = leastFactor;
//# sourceMappingURL=leastFactor.js.map
