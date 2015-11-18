import * as collectors from './helpers/collectors';
import * as filters from './helpers/filters';
import StatsCollector from './StatsCollector';

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
 *   - sumOfSquaredDeviations_stable
 *   - variance_stable
 *   - standardDeviation_stable
 *   - count_* (a bunch of filtered counts)
 * @example
 * const statsCollector = new AdvancedStatsCollector();
 * statsCollector.update([1, 2, 3, 4, 5]);
 * statsCollector.get();
 */
export default class AdvancedStatsCollector extends StatsCollector {
  constructor() {
    super();
    this.addCollector(collectors.values());
    this.addCollector(collectors.sumOfSquaredDeviations_stable());
    this.addCollector(collectors.variance_stable());
    this.addCollector(collectors.standardDeviation_stable());
    const self = this;
    Object.keys(filters).forEach(function (filterName) {
      const filter = filters[filterName];
      self.addCollector(collectors.filteredCount(`count_${filterName}`, filter));
    });
    this.addIgnore('values');
  }
}
