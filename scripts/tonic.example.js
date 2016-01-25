const lib = require('stats-collector');
// try: BaseStats, BasicNumberStats, NumberStats, AdvancedNumberStats
const stats = new lib.AdvancedNumberStats();
stats.processAll([1, 2]);
stats.processAll([3, 4]);
stats.process(5);
const results = stats.get();
console.log(results);
