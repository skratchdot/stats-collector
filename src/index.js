/**
 * Stats Collector library
 * @example
 * const lib = require('stats-collector');
 * const stats = new lib.AdvancedStatsCollector();
 * stats.processAll([1, 2, 3, 4, 5]);
 * stats.get();
 */
import * as collectors from './helpers/collectors';
import * as filters from './helpers/filters';
import BaseStats from './stats/BaseStats';
// number
import BasicNumberStats from './stats/number/BasicNumberStats';
import NumberStats from './stats/number/NumberStats';
import AdvancedNumberStats from './stats/number/AdvancedNumberStats';

export {
  collectors,
  filters,
  BaseStats,
  BasicNumberStats,
  NumberStats,
  AdvancedNumberStats
};
