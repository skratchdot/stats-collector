const lib = require('stats-collector');
// try: BaseStatsCollector, BasicStatsCollector, StatsCollector, AdvancedStatsCollector
const statsCollector = new lib.AdvancedStatsCollector();
statsCollector.update([1, 2]);
statsCollector.update(3, 4);
statsCollector.update(5);
statsCollector.get();
