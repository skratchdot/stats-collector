import * as filters from '../../helpers/filters';
import NumberStats from './NumberStats';
import ArithmeticMean from '../../collectors/number/ArithmeticMean';
import FilteredCount from '../../collectors/number/FilteredCount';
import GeometricMean from '../../collectors/number/GeometricMean';
import HarmonicMean from '../../collectors/number/HarmonicMean';
import Median from '../../collectors/number/Median';
import MidRange from '../../collectors/number/MidRange';
import Range from '../../collectors/number/Range';
import StandardDeviationStable from '../../collectors/number/StandardDeviationStable';
import SumOfRecipricals from '../../collectors/number/SumOfRecipricals';
import SumOfSquaredDeviationsStable from '../../collectors/number/SumOfSquaredDeviationsStable';
import Values from '../../collectors/number/Values';
import ValuesSorted from '../../collectors/number/ValuesSorted';
import VarianceStable from '../../collectors/number/VarianceStable';

/**
* A stat collector that includes the following collector functions:
 *   - amean
 *   - count
 *   - count_* (a bunch of filtered counts)
 *   - gmean
 *   - hmean
 *   - max
 *   - mean
 *   - median
 *   - midRange
 *   - min
 *   - powerSumAvgRunning
 *   - product
 *   - range
 *   - standardDeviationRunning
 *   - standardDeviationStable
 *   - sum
 *   - sumOfRecipricals
 *   - sumOfSquaredDeviationsStable
 *   - varianceRunning
 *   - varianceStable
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
    this.addCollector(new SumOfRecipricals());
    this.addCollector(new ArithmeticMean());
    this.addCollector(new GeometricMean());
    this.addCollector(new HarmonicMean());
    this.addIgnore('values');
    this.addIgnore('valuesSorted');
  }
}
