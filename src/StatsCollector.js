import * as collectors from './helpers/collectors';
import BasicStatsCollector from './BasicStatsCollector';

/**
 * A stat collector that includes the following collector functions:
 *   - count
 *   - sum
 *   - min
 *   - max
 *   - mean
 *   - powerSumAvg_running
 *   - variance_running
 *   - standardDeviation_running
 * @example
 * const statsCollector = new StatsCollector();
 * statsCollector.update([1, 2, 3, 4, 5]);
 * statsCollector.get();
 */
export default class StatsCollector extends BasicStatsCollector {
  constructor() {
    super();
    this.addCollector(collectors.powerSumAvg_running());
    this.addCollector(collectors.variance_running());
    this.addCollector(collectors.standardDeviation_running());
  }
}
