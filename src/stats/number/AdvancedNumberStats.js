import * as filters from '../../helpers/filters';
import NumberStats from './NumberStats';
import Values from '../../collectors/number/Values';
import SumOfSquaredDeviationsStable from '../../collectors/number/SumOfSquaredDeviationsStable';
import VarianceStable from '../../collectors/number/VarianceStable';
import StandardDeviationStable from '../../collectors/number/StandardDeviationStable';
import FilteredCount from '../../collectors/number/FilteredCount';
import Range from '../../collectors/number/Range';
import MidRange from '../../collectors/number/MidRange';
import ValuesSorted from '../../collectors/number/ValuesSorted';
import Median from '../../collectors/number/Median';

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
 *   - range
 *   - midRange
 *   - median
 * @example
 * const stats = new AdvancedNumberStats();
 * stats.processAll([1, 2, 3, 4, 5]);
 * stats.get();
 */
export default class AdvancedNumberStats extends NumberStats {
  constructor() {
    super();
    this.addCollector(new Values());
    this.addCollector(new SumOfSquaredDeviationsStable());
    this.addCollector(new VarianceStable());
    this.addCollector(new StandardDeviationStable());
    const self = this;
    Object.keys(filters.number).forEach(function (filterName) {
      const filter = filters.number[filterName];
      self.addCollector(new FilteredCount(`count_${filterName}`, filter));
    });
    this.addCollector(new Range());
    this.addCollector(new MidRange());
    this.addCollector(new ValuesSorted());
    this.addCollector(new Median());
    this.addIgnore('values');
    this.addIgnore('valuesSorted');
  }
}
