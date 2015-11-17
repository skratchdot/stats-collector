import * as collectors from '../helpers/collectors';
import * as filters from '../helpers/filters';
import StatCollector from './StatCollector';

export default class AdvancedStatCollector extends StatCollector {
  constructor() {
    super();
    this.addCollector(collectors._values());
    this.addCollector(collectors.sumOfSquaredDeviations_stable());
    this.addCollector(collectors.variance_stable());
    this.addCollector(collectors.standardDeviation_stable());
    const self = this;
    Object.keys(filters).forEach(function (filterName) {
      const filter = filters[filterName];
      self.addCollector(collectors.filteredCount(`count_${filterName}`, filter));
    });
    this.addIgnore('_values');
  }
}
