import Collector from '../Collector';

/**
 * A collector that captures `count`
 */
export default class Count extends Collector {
  constructor() {
    super('count', 0);
  }
  handleProcess(state, prev) {
    return prev + 1;
  }
}
