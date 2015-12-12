import Collector from '../Collector';

/**
 * A collector that captures `max`
 *   - The largest value in a sample data set.
 */
export default class Max extends Collector {
  constructor() {
    super('max', Number.MIN_VALUE);
  }
  handleProcess(state, prev, val) {
    return Math.max(prev, val);
  }
}
