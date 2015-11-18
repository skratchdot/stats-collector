/**
 * Stats Collector library
 * @example
 * const lib = require('stats-collector');
 * const statsCollector = new lib.AdvancedStatsCollector();
 * statsCollector.update([1, 2, 3, 4, 5]);
 * statsCollector.get();
 */
import * as collectors from './helpers/collectors';
import * as filters from './helpers/filters';
import AdvancedStatsCollector from './AdvancedStatsCollector';
import BaseStatsCollector from './BaseStatsCollector';
import BasicStatsCollector from './BasicStatsCollector';
import StatsCollector from './StatsCollector';

export {
  collectors,
  filters,
  AdvancedStatsCollector,
  BaseStatsCollector,
  BasicStatsCollector,
  StatsCollector
};
