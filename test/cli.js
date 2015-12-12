/*eslint strict:0 */
'use strict';

const childProcess = require('child_process');
const expect = require('chai').expect;
const packageInfo = require('../package.json');
const testHelper = function (commands, expected, fn) {
  const args = commands.split(' ');
  const result = childProcess.spawnSync(
    `${__dirname}/../scripts/cli.js`,
    args,
    { encoding: 'utf-8' }
  );
  fn(result.stderr.toString(), result.stdout.toString());
};
const test = function (commands, expected) {
  testHelper(commands, expected, function (err, result) {
    expect(result).to.contain(expected);
  });
};
const testError = function (commands, expected) {
  testHelper(commands, expected, function (err) {
    expect(err).to.contain(expected);
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
    test('-t stats 1,2', 'varianceRunning');
    test('-t advanced 1,2', 'varianceStable');
  });
  it('should accept a filter list', function () {
    test('-f odd 0,1,2,3,4,5', '"count": 3');
    test('-f odd,prime 0,1,2,3,4,5', '"count": 2');
    test('-f odd,even 0,1,2,3,4,5', '"count": 0');
    test('-f zero 0,1,2,0,1,0', '"count": 3');
  });
  it('should accept a collector list', function () {
    test('-t empty -c count 0,1,2,3,4,5', '"count": 6');
    test('-t empty -c min,max 0,5,2,1,4,3', '"max": 5');
  });
  it('should work with --pipe', function () {
    expect(childProcess.execSync(
      `echo "1 2 3 4 5" | ${__dirname}/../scripts/cli.js --pipe`,
      { encoding: 'utf-8' }
    )).to.contain('"count": 5');
    expect(childProcess.execSync(
      `echo "1 2 3 4 5" | ${__dirname}/../scripts/cli.js --pipe 4,5,6`,
      { encoding: 'utf-8' }
    )).to.contain('"count": 8');
    expect(childProcess.execSync(
      `echo "1 2 3 4 5" | ${__dirname}/../scripts/cli.js`,
      { encoding: 'utf-8' }
    )).to.contain('"count": 0');
    expect(childProcess.execSync(
      `echo "1 2 3 4 5" | ${__dirname}/../scripts/cli.js 4,5,6`,
      { encoding: 'utf-8' }
    )).to.contain('"count": 3');
  });
});
