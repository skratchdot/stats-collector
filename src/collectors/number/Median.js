import Collector from '../Collector';

/**
 * A collector that captures `median`
 *   - The numeric value separating the higher half of the ordered
 *     sample data from the lower half. If n is odd the median is
 *     the center value.  If n is even the median is the average
 *     of the 2 center values.
 */
export default class Median extends Collector {
  constructor() {
    super('median', 0, ['valuesSorted']);
  }
  handleGet(state) {
    const len = state.valuesSorted.length;
    const center = Math.floor(len / 2);
    if (len % 2 !== 0) {
      return state.valuesSorted[center];
    } else {
      return (state.valuesSorted[center - 1] + state.valuesSorted[center]) / 2;
    }
  }
}
