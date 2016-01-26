import Collector from '../Collector';

/**
 * A collector that captures `sumOfRecipricals`
 *   - The total of all the recipricals of the data values.
 *     (1/x1 + 1/x2 + 1/x3 + ... + 1/xn)
 */
export default class SumOfRecipricals extends Collector {
  constructor() {
    super('sumOfRecipricals', 0);
  }
  handleProcess(state, prev, val) {
    return prev + (1 / val);
  }
}
