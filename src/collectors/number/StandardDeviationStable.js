import Collector from '../Collector';

/**
 * A collector that captures `standardDeviationStable`
 */
export default class StandardDeviationStable extends Collector {
  constructor() {
    super('standardDeviationStable', 0, ['varianceStable']);
  }
  handleGet(state) {
    return Math.sqrt(state.varianceStable);
  }
}
