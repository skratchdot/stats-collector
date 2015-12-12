import BasicNumberStats from './BasicNumberStats';
import PowerSumAvgRunning from '../../collectors/number/PowerSumAvgRunning';
import VarianceRunning from '../../collectors/number/VarianceRunning';
import StandardDeviationRunning from '../../collectors/number/StandardDeviationRunning';

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
 * const stats = new NumberStats();
 * stats.processAll([1, 2, 3, 4, 5]);
 * stats.get();
 */
export default class NumberStats extends BasicNumberStats {
  constructor() {
    super();
    this.addCollector(new PowerSumAvgRunning());
    this.addCollector(new VarianceRunning());
    this.addCollector(new StandardDeviationRunning());
  }
}
