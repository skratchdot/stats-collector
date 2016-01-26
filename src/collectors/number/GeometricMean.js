import Collector from '../Collector';

/**
 * A collector that captures `gmean`
 */
export default class GeometricMean extends Collector {
  constructor() {
    super('gmean', 0, ['count', 'product']);
  }
  handleGet(state) {
    return Math.pow(state.product, 1 / state.count);
  }
}
