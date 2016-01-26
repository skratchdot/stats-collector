import Collector from '../Collector';

/**
 * A collector that captures `midRange`
 *   - The average of the minimum and maximum of the data set.
 *     (min + max) / 2
 */
export default class MidRange extends Collector {
  constructor() {
    super('midRange', 0, ['min', 'max']);
  }
  handleGet(state) {
    return (state.min + state.max) / 2;
  }
}
