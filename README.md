# stats-collector

[![NPM version](https://badge.fury.io/js/stats-collector.svg)](http://badge.fury.io/js/stats-collector)
[![Build Status](https://travis-ci.org/skratchdot/stats-collector.png?branch=master)](https://travis-ci.org/skratchdot/stats-collector)
[![Code Climate](https://codeclimate.com/github/skratchdot/stats-collector.png)](https://codeclimate.com/github/skratchdot/stats-collector)
[![Coverage Status](https://coveralls.io/repos/skratchdot/stats-collector/badge.svg?branch=master&service=github)](https://coveralls.io/github/skratchdot/stats-collector?branch=master)
[![Dependency Status](https://david-dm.org/skratchdot/stats-collector.svg)](https://david-dm.org/skratchdot/stats-collector)
[![devDependency Status](https://david-dm.org/skratchdot/stats-collector/dev-status.svg)](https://david-dm.org/skratchdot/stats-collector#info=devDependencies)

[![NPM](https://nodei.co/npm/stats-collector.png)](https://npmjs.org/package/stats-collector)

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=59LH5AHNQ8XZW)


## Description

Collect stats about numbers.  This library provides a few different default
collectors, but allows you to add your own "stat collectors" by exposing an
API that lets you pass in reducer-like functions that act on numbers passed
to it.

`stats-collector` comes in 2 formats: a
[node.js library](#getting-started)
and a
[command line tool](#command-line-tool).

For examples and api documentation, continue reading below.


## Node.js Library

### Getting Started

Install the module with: `npm install stats-collector`

[View Live Demo on Tonic](https://tonicdev.com/npm/stats-collector)

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
|NumberStats|{<br />&nbsp;"count": 5,<br />&nbsp;"max": 5,<br />&nbsp;"mean": 3,<br />&nbsp;"min": 1,<br />&nbsp;"powerSumAvgRunning": 11,<br />&nbsp;"product": 120,<br />&nbsp;"standardDeviationRunning": 1.5811388300841898,<br />&nbsp;"sum": 15,<br />&nbsp;"varianceRunning": 2.5<br />}|
|AdvancedNumberStats|{<br />&nbsp;"amean": 3,<br />&nbsp;"count": 5,<br />&nbsp;"count_even": 2,<br />&nbsp;"count_float": 0,<br />&nbsp;"count_integer": 5,<br />&nbsp;"count_negative": 0,<br />&nbsp;"count_nonZero": 5,<br />&nbsp;"count_odd": 3,<br />&nbsp;"count_positive": 5,<br />&nbsp;"count_prime": 3,<br />&nbsp;"count_zero": 0,<br />&nbsp;"gmean": 2.605171084697352,<br />&nbsp;"hmean": 2.18978102189781,<br />&nbsp;"max": 5,<br />&nbsp;"mean": 3,<br />&nbsp;"median": 3,<br />&nbsp;"midRange": 3,<br />&nbsp;"min": 1,<br />&nbsp;"powerSumAvgRunning": 11,<br />&nbsp;"product": 120,<br />&nbsp;"range": 4,<br />&nbsp;"standardDeviationRunning": 1.5811388300841898,<br />&nbsp;"standardDeviationStable": 1.5811388300841898,<br />&nbsp;"sum": 15,<br />&nbsp;"sumOfRecipricals": 2.283333333333333,<br />&nbsp;"sumOfSquaredDeviationsStable": 10,<br />&nbsp;"varianceRunning": 2.5,<br />&nbsp;"varianceStable": 2.5<br />}|


### API Documentation

Read the [API Docs](http://projects.skratchdot.com/stats-collector/)
by visiting the project site here:

- [http://projects.skratchdot.com/stats-collector/](http://projects.skratchdot.com/stats-collector/)


## Command Line Tool

### Installation

The command line utility can be install via `npm install -g stats-collector`.

After doing so, you will have access to `stats-collector` from the command line.

```bash
$ stats-collector -h

  Usage: stats-collector [options] <values>

  Options:

    -h, --help                     output usage information
    -v, --version                  output the version number
    -c, --collectors [collectors]  add collectors
    -f, --filters [filters]        add filters
    -t, --type [type]              type of stats [empty,basic,stats,advanced]
    -p, --pipe                     whether or not to accept piped data from stdin
```

### Examples

#### Default behavior

Here is the default behavior when passing in 5 numbers.

```bash
$ stats-collector 1,2,3,4,5
{
  "count": 5,
  "max": 5,
  "mean": 3,
  "min": 1,
  "powerSumAvgRunning": 11,
  "product": 120,
  "standardDeviationRunning": 1.5811388300841898,
  "sum": 15,
  "varianceRunning": 2.5
}
```

#### Get "advanced" stats about 10 random numbers

The example uses the `--pipe` functionality:

```bash
$ for i in {1..10}; do echo $RANDOM; done | stats-collector -t advanced --pipe
{
  "amean": 15239.3,
  "count": 10,
  "count_even": 7,
  "count_float": 0,
  "count_integer": 10,
  "count_negative": 0,
  "count_nonZero": 10,
  "count_odd": 3,
  "count_positive": 10,
  "count_prime": 1,
  "count_zero": 0,
  "gmean": 9896.019927976335,
  "hmean": 5947.676087129243,
  "max": 30937,
  "mean": 15239.3,
  "median": 26478,
  "midRange": 16430.5,
  "min": 1924,
  "powerSumAvgRunning": 360452286.7,
  "product": 9.007527812504433e+39,
  "range": 29013,
  "standardDeviationRunning": 11935.754978215662,
  "standardDeviationStable": 11935.754978215662,
  "sum": 152393,
  "sumOfRecipricals": 0.0016813289515950568,
  "sumOfSquaredDeviationsStable": 1282160222.1,
  "varianceRunning": 142462246.89999998,
  "varianceStable": 142462246.89999998
}
```


## Links

- [Source Code](https://github.com/skratchdot/stats-collector)
- [API Docs](http://projects.skratchdot.com/stats-collector/)
- [Project Page](http://projects.skratchdot.com/stats-collector/)
- [Changelog](https://github.com/skratchdot/stats-collector/blob/master/CHANGELOG.md)
- [Live example on Tonic](https://tonicdev.com/npm/stats-collector)


## See Also

- [covariance](https://www.npmjs.com/package/covariance)
- [d3-array](https://www.npmjs.com/package/d3-array)
- [diversity](https://www.npmjs.com/package/diversity)
- [ezstats](https://www.npmjs.com/package/ezstats)
- [fast-stats](https://www.npmjs.com/package/fast-stats)
- [gauss](https://www.npmjs.com/package/gauss)
- [math-statistics](https://www.npmjs.com/package/math-statistics)
- [stats-analysis](https://www.npmjs.com/package/stats-analysis)
- [stats-incremental](https://www.npmjs.com/package/stats-incremental)
- [stats-lite](https://www.npmjs.com/package/stats-lite)
- [stats-percentile](https://www.npmjs.com/package/stats-percentile)
- [statsjs](https://www.npmjs.com/package/statsjs)
- [stream-statistics](https://www.npmjs.com/package/stream-statistics)
- [summary](https://www.npmjs.com/package/summary)
- [summary-statistics](https://www.npmjs.com/package/summary-statistics)
- [very-simple-statistics](https://www.npmjs.com/package/very-simple-statistics)


## License

Copyright (c) 2015 [skratchdot](http://skratchdot.com/)  
Licensed under the MIT license.
