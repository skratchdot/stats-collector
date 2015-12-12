import Collector from '../Collector';

/**
 * A collector that captures `values`
 */
export default class Values extends Collector {
  constructor() {
    super('values', []);
  }
  handleProcess(state, prev, val) {
    const result = prev.slice(0);
    result.push(val);
    return result;
  }
}
