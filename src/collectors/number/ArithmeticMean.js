import Collector from '../Collector';

/**
 * A collector that captures `amean`
 */
export default class ArithmeticMean extends Collector {
  constructor() {
    super('amean', 0, ['mean']);
  }
  handleGet(state) {
    return state.mean;
  }
}
