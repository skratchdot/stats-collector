import Collector from '../Collector';

/**
 * A collector that captures `sum`
 */
export default class Sum extends Collector {
  constructor() {
    super('sum', 0);
  }
  handleProcess(state, prev, val) {
    return prev + val;
  }
}
