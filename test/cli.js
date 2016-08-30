import childProcess from 'child_process';
import { expect } from 'chai';
import packageInfo from '../package.json';
import { convertToList } from '../src/cli';

const scriptPath = `${__dirname}/../scripts/cli-babel.js`;
let promises = [];

const testHelper = function (commands, expected, isError) {
  return new Promise((resolve) => {
    const args = commands.split(' ');
    let stdout = '';
    let stderr = '';
    const cli = childProcess.spawn(
      scriptPath,
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
  beforeEach(() => {
    promises = [];
  });
  it('should handle convertToList calls', () => {
    expect(convertToList()).to.eql([]);
    expect(convertToList()).to.eql([]);
    expect(convertToList()).to.eql([]);
    expect(convertToList()).to.eql([]);
    expect(convertToList()).to.eql([]);
    expect(convertToList()).to.eql([]);
  });
  it('should print version information', function () {
    //promises.push(test('--version', packageInfo.name));
    promises.push(test('-v', packageInfo.version));
    return Promise.all(promises);
  });
  it('should print help information', function () {
    promises.push(test('-h', 'Usage'));
    return Promise.all(promises);
  });
  it('should only work when valid types are passed', function () {
    promises.push(testError('-t fooo 1,2', 'Invalid'));
    promises.push(test('-t empty 1,2', '{}'));
    promises.push(test('-t basic 1,2', 'count'));
    promises.push(test('-t stats 1,2', 'varianceRunning'));
    promises.push(test('-t advanced 1,2', 'varianceStable'));
    return Promise.all(promises);
  });
  it('should throw when an invalid collector is passed', function () {
    promises.push(testError('-c foo', 'Invalid'));
    return Promise.all(promises);
  });
  it('should accept a filter list', function () {
    promises.push(test('-f odd 0,1,2,3,4,5', '"count": 3'));
    promises.push(test('-f odd,prime 0,1,2,3,4,5', '"count": 2'));
    promises.push(test('-f odd,even 0,1,2,3,4,5', '"count": 0'));
    promises.push(test('-f zero 0,1,2,0,1,0', '"count": 3'));
    return Promise.all(promises);
  });
  it('should accept a collector list', function () {
    promises.push(test('-t empty -c count 0,1,2,3,4,5', '"count": 6'));
    promises.push(test('-t empty -c min,max 0,5,2,1,4,3', '"max": 5'));
    return Promise.all(promises);
  });
  it('should work with --pipe', function () {
    promises.push(expect(childProcess.execSync(
      `echo "1 2 3 4 5" | ${scriptPath} --pipe`,
      { encoding: 'utf-8' }
    )).to.contain('"count": 5'));
    promises.push(expect(childProcess.execSync(
      `echo "1 2 3 4 5" | ${scriptPath} --pipe 4,5,6`,
      { encoding: 'utf-8' }
    )).to.contain('"count": 8'));
    promises.push(expect(childProcess.execSync(
      `echo "1 2 3 4 5" | ${scriptPath}`,
      { encoding: 'utf-8' }
    )).to.contain('"count": 0'));
    promises.push(expect(childProcess.execSync(
      `echo "1 2 3 4 5" | ${scriptPath} 4,5,6`,
      { encoding: 'utf-8' }
    )).to.contain('"count": 3'));
    return Promise.all(promises);
  });
});
