/*eslint strict:0, no-console:0 */
'use strict';
import * as lib from './index';
import program from 'commander';
import packageInfo from '../package.json';
const convertToList = function (val) {
  return (val || '').replace(/,/gi, ' ').replace(/\s+/gi, ' ').split(' ');
};
const types = {
  'empty': 'BaseStatsCollector',
  'basic': 'BasicStatsCollector',
  'stats': 'StatsCollector',
  'advanced': 'AdvancedStatsCollector'
};
let collector;
let values = [];

// handle errors
process.on('uncaughtException', function (e) {
  console.error(e.toString());
});

program
  .version(`${packageInfo.name} version ${packageInfo.version}`, '-v, --version')
  .usage('[options] <values>')
  .option('-c, --collectors [collectors]', 'add collectors', convertToList, [])
  .option('-f, --filters [filters]', 'add filters', convertToList, [])
  .option('-t, --type [type]', 'type of stats [empty,basic,stats,advanced]', 'stats')
  .option('-p, --pipe', 'whether or not to accept piped data from stdin')
  .parse(process.argv);

// setup defaults and validate
program.collectors = program.collectors || [];
program.filters = program.filters || [];
program.type = program.type || '';
program.type = program.type.toLowerCase();
if (!types.hasOwnProperty(program.type)) {
  throw new Error('Invalid type passed');
}
program.type = types[program.type];
collector = new (lib[program.type])();

// validate collectors and filters
['collectors', 'filters'].forEach(function (type) {
  program[type].forEach(function (curr) {
    if (!lib[type].hasOwnProperty(curr)) {
      throw new Error(`Invalid ${type} passed`);
    } else if (type === 'collectors') {
      collector.addCollector(lib[type][curr]());
    } else {
      collector.addFilter(lib[type][curr]);
    }
  });
});

values = program.args.join(' ').replace(/,/gi, ' ').split(' ')
  .map(parseFloat)
  .filter(Number.isFinite);
collector.update(values);

const onData = function (data) {
  collector.update(convertToList(data.toString()));
};

const onFinish = function () {
  console.log(JSON.stringify(collector.get(true), null, '  '));
  process.exit(0);
};

if (program.pipe) {
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onData);
  process.stdin.on('end', onFinish);
  process.stdin.on('exit', onFinish);
} else {
  onFinish();
}
