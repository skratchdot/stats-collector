import BaseStats from '../BaseStats';
import Count from '../../collectors/number/Count';
import Max from '../../collectors/number/Max';
import Mean from '../../collectors/number/Mean';
import Min from '../../collectors/number/Min';
import Sum from '../../collectors/number/Sum';

/**
 * A stat collector that includes the following collector functions:
 *   - count
 *   - max
 *   - mean
 *   - min
 *   - sum
 * @example
 * const stats = new BasicNumberStats();
 * stats.processAll([1, 2, 3, 4, 5]);
 * stats.get();
 */
export default class BasicNumberStats extends BaseStats {
  constructor() {
    super();
    this.addCollector(new Count());
    this.addCollector(new Sum());
    this.addCollector(new Min());
    this.addCollector(new Max());
    this.addCollector(new Mean());
  }
}
