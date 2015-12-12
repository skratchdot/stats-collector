import Collector from '../Collector';

/**
 * A collector that captures `mean`
 */
export default class Mean extends Collector {
  constructor() {
    super('mean', 0, ['count', 'sum']);
  }
  handleGet(state) {
    return state.sum / state.count;
  }
}
