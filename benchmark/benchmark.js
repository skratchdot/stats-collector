/*eslint strict:0, no-undef:0 */
'use strict';
require('matcha');
const lib = require('../lib');
const dataSmall = require('./data/data10.json');
const dataBig = require('./data/data1000.json');

[
  'BaseStats',
  'BasicNumberStats',
  'NumberStats',
  'AdvancedNumberStats'
].forEach(function (type) {
  suite(`${type} benchmarks`, function () {
    set('iterations', 100);     // the number of times to run a given bench
    set('concurrency', 1);      // the number of how many times a given bench is run concurrently
    set('type', 'adaptive');    // or 'static' (see below)
    set('mintime', 500);        // when adaptive, the minimum time in ms a bench should run
    set('delay', 100);          // time in ms between each bench
    const doIt = function (arr) {
      const stats = new lib[type]();
      for (let i = 0; i < arr.length; i++) {
        stats.process(arr[i]);
      }
      return stats.get();
    };
    bench('empty', function () {});
    bench('check 10', function () {
      doIt(dataSmall);
    });
    bench('check 1000', function () {
      doIt(dataBig);
    });
    bench('constructor', function () {
      new lib[type]();
    });
    bench('process(Math.random())', function () {
      const stats = new lib[type]();
      stats.process(Math.random());
    });
    bench('process(Math.random()) then get()', function () {
      const stats = new lib[type]();
      stats.process(Math.random());
      stats.get();
    });
    bench('empty', function () {});
  });
});
