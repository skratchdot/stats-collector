import * as collectors from '../helpers/collectors';
import BasicStatCollector from './BasicStatCollector';

export default class StatCollector extends BasicStatCollector {
  constructor() {
    super();
    this.addCollector(collectors.powerSumAvg_running());
    this.addCollector(collectors.variance_running());
    this.addCollector(collectors.standardDeviation_running());
  }
}
