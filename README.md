# stats-collector

[![NPM version](https://badge.fury.io/js/stats-collector.svg)](http://badge.fury.io/js/stats-collector)
[![Build Status](https://travis-ci.org/skratchdot/stats-collector.png?branch=master)](https://travis-ci.org/skratchdot/stats-collector)
[![Code Climate](https://codeclimate.com/github/skratchdot/stats-collector.png)](https://codeclimate.com/github/skratchdot/stats-collector)
[![Coverage Status](https://coveralls.io/repos/skratchdot/stats-collector/badge.png)](https://coveralls.io/r/skratchdot/stats-collector)
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
const statsCollector = new lib.StatsCollector();
statsCollector.update([1,2,3,4,5]);
console.log(statsCollector.get());
```

#### Usage (Method 2)

```javascript
import StatsCollector from 'stats-collector/lib/StatsCollector';
const statsCollector = new StatsCollector();
statsCollector.update([1,2,3,4,5]);
console.log(statsCollector.get());
```

#### Usage (Different types of collectors)

```javascript
import * as lib from 'stats-collector';
const c1 = new lib.BaseStatsCollector();      // 0 default collectors
const c2 = new lib.BasicStatsCollector();     // 5 default collectors
const c3 = new lib.StatsCollector();          // 8 default collectors
const c4 = new lib.AdvancedStatsCollector();  // 21 default collectors
const collectors = lib.collectors; // some collector functions
const filters = lib.filters; // some filter functions
console.log(c1.get(), c2.get(), c3.get(), c4.get(), collectors, filters);
```

### API Documentation

Read the [API Docs](http://projects.skratchdot.com/stats-collector/)
by using this link:

- http://projects.skratchdot.com/stats-collector/


## See Also

- https://www.npmjs.com/package/stats-incremental
- https://www.npmjs.com/package/stats-lite
- https://www.npmjs.com/package/stats-percentile
- https://www.npmjs.com/package/stream-statistics


## License

Copyright (c) 2015 [skratchdot](http://skratchdot.com/)  
Licensed under the MIT license.
