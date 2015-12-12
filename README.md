# stats-collector

[![NPM version](https://badge.fury.io/js/stats-collector.svg)](http://badge.fury.io/js/stats-collector)
[![Build Status](https://travis-ci.org/skratchdot/stats-collector.png?branch=master)](https://travis-ci.org/skratchdot/stats-collector)
[![Code Climate](https://codeclimate.com/github/skratchdot/stats-collector.png)](https://codeclimate.com/github/skratchdot/stats-collector)
[![Coverage Status](https://coveralls.io/repos/skratchdot/stats-collector/badge.svg?branch=master&service=github)](https://coveralls.io/github/skratchdot/stats-collector?branch=master)
[![Dependency Status](https://david-dm.org/skratchdot/stats-collector.svg)](https://david-dm.org/skratchdot/stats-collector)
[![devDependency Status](https://david-dm.org/skratchdot/stats-collector/dev-status.svg)](https://david-dm.org/skratchdot/stats-collector#info=devDependencies)

[![NPM](https://nodei.co/npm/stats-collector.png)](https://npmjs.org/package/stats-collector)


## Description

Collect stats about numbers.  This library provides a few different default
collectors, but allows you to add your own "stat collectors" by exposing an
API that lets you pass in reducer-like functions that act on numbers passed
to it.

For examples and api documentation, continue reading below.


## Node.js Library

### Getting Started

Install the module with: `npm install stats-collector`

#### Usage (Method 1)

```javascript
import * as lib from 'stats-collector';
const stats = new lib.NumberStats();
stats.processAll([1,2,3,4,5]);
console.log(stats.get());
```

#### Usage (Method 2)

```javascript
import NumberStats from 'stats-collector/lib/NumberStats';
const stats = new StatsCollector();
stats.process(1);
stats.process(2);
stats.process(3);
stats.processAll([4, 5]);
console.log(stats.get());
```

#### Usage (Different types of collectors)

```javascript
import * as lib from 'stats-collector';
const c1 = new lib.BaseStats();            // 0 default collectors
const c2 = new lib.BasicNumberStats();     // 5 default collectors
const c3 = new lib.NumberStats();          // 8 default collectors
const c4 = new lib.AdvancedNumberStats();  // 21 default collectors
const collectors = lib.collectors; // some collector functions
const filters = lib.filters; // some filter functions
console.log(c1.get(), c2.get(), c3.get(), c4.get(), collectors, filters);
```

### Example Output

The following table shows you the results of initializing a
stats collector, then running the following statments:

```javascript
stats.processAll([1, 2, 3, 4, 5]);
const results = stats.get();
```

|Collector Type|Results|
|--------------|-------|
|BaseStats|{}|
|BasicNumberStats|{<br />&nbsp;"count": 5,<br />&nbsp;"max": 5,<br />&nbsp;"mean": 3,<br />&nbsp;"min": 1,<br />&nbsp;"sum": 15<br />}|
|NumberStats|{<br />&nbsp;"count": 5,<br />&nbsp;"max": 5,<br />&nbsp;"mean": 3,<br />&nbsp;"min": 1,<br />&nbsp;"powerSumAvgRunning": 11,<br />&nbsp;"standardDeviationRunning": 1.5811388300841898,<br />&nbsp;"sum": 15,<br />&nbsp;"varianceRunning": 2.5<br />}|
|AdvancedNumberStats|{<br />&nbsp;"count": 5,<br />&nbsp;"count_even": 2,<br />&nbsp;"count_float": 0,<br />&nbsp;"count_integer": 5,<br />&nbsp;"count_negative": 0,<br />&nbsp;"count_nonZero": 5,<br />&nbsp;"count_odd": 3,<br />&nbsp;"count_positive": 5,<br />&nbsp;"count_prime": 3,<br />&nbsp;"count_zero": 0,<br />&nbsp;"max": 5,<br />&nbsp;"mean": 3,<br />&nbsp;"min": 1,<br />&nbsp;"powerSumAvgRunning": 11,<br />&nbsp;"standardDeviationRunning": 1.5811388300841898,<br />&nbsp;"standardDeviationStable": 1.5811388300841898,<br />&nbsp;"sum": 15,<br />&nbsp;"sumOfSquaredDeviationsStable": 10,<br />&nbsp;"values": [<br />&nbsp;&nbsp;1,<br />&nbsp;&nbsp;2,<br />&nbsp;&nbsp;3,<br />&nbsp;&nbsp;4,<br />&nbsp;&nbsp;5<br />&nbsp;],<br />&nbsp;"varianceRunning": 2.5,<br />&nbsp;"varianceStable": 2.5<br />}|


### API Documentation

Read the [API Docs](http://projects.skratchdot.com/stats-collector/)
by visiting the project site here:

- [http://projects.skratchdot.com/stats-collector/](http://projects.skratchdot.com/stats-collector/)


## See Also

- [covariance](https://www.npmjs.com/package/covariance)
- [diversity](https://www.npmjs.com/package/diversity)
- [ezstats](https://www.npmjs.com/package/ezstats)
- [gauss](https://www.npmjs.com/package/gauss)
- [math-statistics](https://www.npmjs.com/package/math-statistics)
- [stats-analysis](https://www.npmjs.com/package/stats-analysis)
- [stats-incremental](https://www.npmjs.com/package/stats-incremental)
- [stats-lite](https://www.npmjs.com/package/stats-lite)
- [stats-percentile](https://www.npmjs.com/package/stats-percentile)
- [stream-statistics](https://www.npmjs.com/package/stream-statistics)
- [summary-statistics](https://www.npmjs.com/package/summary-statistics)
- [very-simple-statistics](https://www.npmjs.com/package/very-simple-statistics)


## License

Copyright (c) 2015 [skratchdot](http://skratchdot.com/)  
Licensed under the MIT license.
