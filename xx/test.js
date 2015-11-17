/*eslint no-console: 0 */
const lib = require('./transpiled/index');

const statCollector = new lib.AdvancedStatCollector();
statCollector.addCollector(lib.collectors.powerSumAvg_running());
statCollector.addCollector(lib.collectors.variance_running());
statCollector.addCollector(lib.collectors.standardDeviation_running());

//console.log('default', statCollector._state, statCollector._collectors);
console.log('start', statCollector.get());
statCollector.update(1, 2);
console.log('update1', statCollector.get());
statCollector.update(3);
console.log('update2', statCollector.get());
statCollector.update([4, 5]);
console.log('update3', statCollector.get());
