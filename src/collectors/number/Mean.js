import Collector from '../Collector';

/**
 * A collector that captures `mean`
 *   - The sum of all of the data divided by the count; the average;
 *     mean = sum / n.
 */
export default class Mean extends Collector {
  constructor() {
    super('mean', 0, ['count', 'sum']);
  }
  handleGet(state) {
    return state.sum / state.count;
  }
}
