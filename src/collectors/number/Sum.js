import Collector from '../Collector';

/**
 * A collector that captures `sum`
 *   - The total of all data values.
 *     (x1 + x2 + x3 + ... + xn)
 */
export default class Sum extends Collector {
  constructor() {
    super('sum', 0);
  }
  handleProcess(state, prev, val) {
    return prev + val;
  }
}
