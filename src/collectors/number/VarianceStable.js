import Collector from '../Collector';

/**
 * A collector that captures `varianceStable`
 */
export default class VarianceStable extends Collector {
  constructor() {
    super('varianceStable', 0, ['values', 'sumOfSquaredDeviationsStable']);
  }
  handleGet(state) {
    const len = Math.max(1, state.values.length - 1);
    return state.sumOfSquaredDeviationsStable / len;
  }
}
