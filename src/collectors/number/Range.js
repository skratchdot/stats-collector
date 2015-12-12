import Collector from '../Collector';

/**
 * A collector that captures `range`:
 *   The range from the minimum to the maximum
 *   range = max - min
 */
export default class Range extends Collector {
  constructor() {
    super('range', 0, ['min', 'max']);
  }
  handleGet(state) {
    return state.max - state.min;
  }
}
