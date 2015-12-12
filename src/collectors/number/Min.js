import Collector from '../Collector';

/**
 * A collector that captures `min`
 *   - The smallest value in a sample data set.
 */
export default class Min extends Collector {
  constructor() {
    super('min', Number.MAX_VALUE);
  }
  handleProcess(state, prev, val) {
    return Math.min(prev, val);
  }
}
