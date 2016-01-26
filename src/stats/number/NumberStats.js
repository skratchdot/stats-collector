import BasicNumberStats from './BasicNumberStats';
import PowerSumAvgRunning from '../../collectors/number/PowerSumAvgRunning';
import Product from '../../collectors/number/Product';
import StandardDeviationRunning from '../../collectors/number/StandardDeviationRunning';
import VarianceRunning from '../../collectors/number/VarianceRunning';

/**
 * A stat collector that includes the following collector functions:
 *   - count
 *   - max
 *   - mean
 *   - min
 *   - powerSumAvgRunning
 *   - product
 *   - standardDeviationRunning
 *   - sum
 *   - varianceRunning
 * @example
 * const stats = new NumberStats();
 * stats.processAll([1, 2, 3, 4, 5]);
 * stats.get();
 */
export default class NumberStats extends BasicNumberStats {
  constructor() {
    super();
    this.addCollector(new Product());
    this.addCollector(new PowerSumAvgRunning());
    this.addCollector(new VarianceRunning());
    this.addCollector(new StandardDeviationRunning());
  }
}
