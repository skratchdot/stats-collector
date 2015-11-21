/*eslint strict:0 */
'use strict';

const childProcess = require('child_process');
const expect = require('chai').expect;
const packageInfo = require('../package.json');
const testHelper = function (commands, expected, fn) {
  const args = commands.split(' ');
  args.unshift(`${__dirname}/../lib/cli.js`);
  const result = childProcess.spawnSync('node', args);
  fn(result.stderr.toString(), result.stdout.toString());
};
const test = function (commands, expected) {
  testHelper(commands, expected, function (err, result) {
    expect(result).to.include(expected);
  });
};
const testError = function (commands, expected) {
  testHelper(commands, expected, function (err) {
    expect(err).to.include(expected);
  });
};

describe('command line tool', function () {
  it('should print version information', function () {
    test('--version', packageInfo.name);
    test('-v', packageInfo.version);
  });
  it('should print help information', function () {
    test('-h', 'Usage');
  });
  it(`should only work when valid types are passed`, function () {
    testError('-t fooo 1,2', 'Invalid');
    test('-t empty 1,2', '{}');
    test('-t basic 1,2', 'count');
    test('-t stats 1,2', 'variance_running');
    test('-t advanced 1,2', 'variance_stable');
  });
  it('should accept a filter list', function () {
    test('-f odd 0,1,2,3,4,5', '"count": 3');
    test('-f odd,prime 0,1,2,3,4,5', '"count": 2');
    test('-f odd,even 0,1,2,3,4,5', '"count": null');
    test('-f zero 0,1,2,0,1,0', '"count": 3');
  });
  it('should accept a collector list', function () {
    test('-t empty -c count 0,1,2,3,4,5', '"count": 6');
    test('-t empty -c min,max 0,5,2,1,4,3', '"max": 5');
  });
});
