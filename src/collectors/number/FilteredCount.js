import Collector from '../Collector';

/**
 * A collector that captures a named `count` after a filter is applied
 */
export default class FilteredCount extends Collector {
  constructor(name, filter) {
    super(name, 0);
    this._filter = filter;
  }
  handleProcess(state, prev, val) {
    return this._filter(val) ? prev + 1 : prev;
  }
}
