import Collector from '../Collector';

/**
 * A collector that captures `sumOfSquaredDeviationsStable`
 */
export default class SumOfSquaredDeviationsStable extends Collector {
  constructor() {
    super('sumOfSquaredDeviationsStable', 0, ['values', 'mean']);
  }
  handleGet(state) {
    const len = state.values.length;
    let sum = 0;
    let current = 0;
    for (let i = 0; i < len; i++) {
      current = state.values[i];
      sum += Math.pow(current - state.mean, 2);
    }
    return sum;
  }
}
