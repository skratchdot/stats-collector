import childProcess from 'child_process';
import { expect } from 'chai';
import packageInfo from '../package.json';

const testHelper = function (commands, expected, isError) {
  return new Promise((resolve) => {
    const args = commands.split(' ');
    let stdout = '';
    let stderr = '';
    const cli = childProcess.spawn(
      `${__dirname}/../scripts/cli.js`,
      args,
      { encoding: 'utf-8' }
    );
    cli.stdout.on('data', (data) => stdout += `${data}`);
    cli.stderr.on('data', (data) => stderr += `${data}`);
    cli.on('close', () => {
      expect(isError ? stderr : stdout).to.contain(expected);
      resolve();
    });
  });
};

const test = function (commands, expected) {
  return testHelper(commands, expected, false);
};

const testError = function (commands, expected) {
  return testHelper(commands, expected, true);
};

describe('command line tool', function () {
  this.timeout(100000);
  it('should print version information', function () {
    return Promise.all([
      test('--version', packageInfo.name),
      test('-v', packageInfo.version)
    ]);
  });
  it('should print help information', function () {
    return Promise.all([
      test('-h', 'Usage')
    ]);
  });
  it('should only work when valid types are passed', function () {
    return Promise.all([
      testError('-t fooo 1,2', 'Invalid'),
      test('-t empty 1,2', '{}'),
      test('-t basic 1,2', 'count'),
      test('-t stats 1,2', 'varianceRunning'),
      test('-t advanced 1,2', 'varianceStable')
    ]);
  });
  it('should accept a filter list', function () {
    return Promise.all([
      test('-f odd 0,1,2,3,4,5', '"count": 3'),
      test('-f odd,prime 0,1,2,3,4,5', '"count": 2'),
      test('-f odd,even 0,1,2,3,4,5', '"count": 0'),
      test('-f zero 0,1,2,0,1,0', '"count": 3')
    ]);
  });
  it('should accept a collector list', function () {
    return Promise.all([
      test('-t empty -c count 0,1,2,3,4,5', '"count": 6'),
      test('-t empty -c min,max 0,5,2,1,4,3', '"max": 5')
    ]);
  });
  it('should work with --pipe', function () {
    return Promise.all([
      expect(childProcess.execSync(
        `echo "1 2 3 4 5" | ${__dirname}/../scripts/cli.js --pipe`,
        { encoding: 'utf-8' }
      )).to.contain('"count": 5'),
      expect(childProcess.execSync(
        `echo "1 2 3 4 5" | ${__dirname}/../scripts/cli.js --pipe 4,5,6`,
        { encoding: 'utf-8' }
      )).to.contain('"count": 8'),
      expect(childProcess.execSync(
        `echo "1 2 3 4 5" | ${__dirname}/../scripts/cli.js`,
        { encoding: 'utf-8' }
      )).to.contain('"count": 0'),
      expect(childProcess.execSync(
        `echo "1 2 3 4 5" | ${__dirname}/../scripts/cli.js 4,5,6`,
        { encoding: 'utf-8' }
      )).to.contain('"count": 3')
    ]);
  });
});
