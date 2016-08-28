/*eslint strict:0, no-console:0 */
'use strict';
import * as lib from './index';
import program from 'commander';
import packageInfo from '../package.json';
const convertToList = function (val, map, filter) {
  let arr = (val || '').toString()
    .replace(/,/gi, ' ')
    .replace(/\s+/gi, ' ').split(' ');
  if (typeof map === 'function') {
    arr = arr.map(map);
  }
  if (typeof filter === 'function') {
    arr = arr.filter(filter);
  }
  return arr;
};
const convertToNumberList = function (val) {
  return convertToList(val, parseFloat, Number.isFinite);
};
const types = {
  'empty': 'BaseStats',
  'basic': 'BasicNumberStats',
  'stats': 'NumberStats',
  'advanced': 'AdvancedNumberStats'
};

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
const collector = new (lib[program.type])();

// validate collectors and filters
['collectors', 'filters'].forEach(function (type) {
  program[type].forEach(function (curr) {
    // allow case-insensitivity on cli
    curr = curr.toLowerCase();
    const keys = Object.keys(lib[type].number);
    const lcaseKeys = Object.keys(lib[type].number)
      .map(function (k) {
        return k.toLowerCase();
      });
    const keyIndex = lcaseKeys.indexOf(curr);
    if (keyIndex === -1) {
      throw new Error(`Invalid ${type} passed`);
    } else if (type === 'collectors') {
      collector.addCollector(new lib[type].number[keys[keyIndex]]());
    } else {
      collector.addFilter(lib[type].number[keys[keyIndex]]);
    }
  });
});

collector.processAll(convertToNumberList(program.args));

const onData = function (data) {
  collector.processAll(convertToNumberList(data.toString()));
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
