/*eslint strict:0, no-console:0 */
'use strict';
import * as lib from './index';
import program from 'commander';
import packageInfo from '../package.json';

const types = {
  'empty': 'BaseStats',
  'basic': 'BasicNumberStats',
  'stats': 'NumberStats',
  'advanced': 'AdvancedNumberStats'
};

export const convertToList = (val, map, filter) => {
  let arr = (val || '').toString()
    .replace(/,/gi, ' ')
    .replace(/\s+/gi, ' ');
  if (arr.length) {
    arr = arr.split(' ');
  } else {
    arr = [];
  }
  if (typeof map === 'function') {
    arr = arr.map(map);
  }
  if (typeof filter === 'function') {
    arr = arr.filter(filter);
  }
  return arr;
};

export const convertToNumberList = (val) => {
  return convertToList(val, parseFloat, Number.isFinite);
};

export default () => {
  // handle errors
  process.on('uncaughtException', (e) => {
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
  program.collectors = program.collectors;
  program.filters = program.filters;
  program.type = program.type.toString().toLowerCase();
  if (!types.hasOwnProperty(program.type)) {
    throw new Error('Invalid type passed');
  }
  program.type = types[program.type];
  const collector = new (lib[program.type])();

  // validate collectors and filters
  ['collectors', 'filters'].forEach((type) => {
    program[type].forEach((curr) => {
      // allow case-insensitivity on cli
      curr = curr.toLowerCase();
      const keys = Object.keys(lib[type].number);
      const lcaseKeys = Object.keys(lib[type].number)
        .map((k) => {
          return k.toLowerCase();
        });
      const keyIndex = lcaseKeys.indexOf(curr);
      if (keyIndex === -1) {
        throw new Error(`Invalid value "${curr}" for ${type}`);
      } else if (type === 'collectors') {
        collector.addCollector(new lib[type].number[keys[keyIndex]]());
      } else {
        collector.addFilter(lib[type].number[keys[keyIndex]]);
      }
    });
  });

  collector.processAll(convertToNumberList(program.args));

  const onData = (data) => {
    collector.processAll(convertToNumberList(data.toString()));
  };

  const onFinish = () => {
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
};
