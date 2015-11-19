import * as collectors from './helpers/collectors';
import BaseStatsCollector from './BaseStatsCollector';

/**
 * A stat collector that includes the following collector functions:
 *   - count
 *   - sum
 *   - min
 *   - max
 *   - mean
 * @example
 * const statsCollector = new BasicStatsCollector();
 * statsCollector.update([1, 2, 3, 4, 5]);
 * statsCollector.get();
 */
export default class BasicStatsCollector extends BaseStatsCollector {
  constructor() {
    super();
    this.addCollector(collectors.count());
    this.addCollector(collectors.sum());
    this.addCollector(collectors.min());
    this.addCollector(collectors.max());
    this.addCollector(collectors.mean());
  }
}
