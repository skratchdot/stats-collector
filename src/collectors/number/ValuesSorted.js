import Collector from '../Collector';

/**
 * A collector that captures `valuesSorted`
 */
export default class ValuesSorted extends Collector {
  constructor() {
    super('valuesSorted', [], ['values']);
  }
  handleGet(state) {
    return state.values.slice(0).sort();
  }
}
