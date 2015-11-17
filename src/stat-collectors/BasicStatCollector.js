import * as collectors from '../helpers/collectors';
import BaseStatCollector from './BaseStatCollector';

export default class StatCollector extends BaseStatCollector {
  constructor() {
    super();
    this.addCollector(collectors.count());
    this.addCollector(collectors.sum());
    this.addCollector(collectors.min());
    this.addCollector(collectors.max());
    this.addCollector(collectors.mean());
  }
}
