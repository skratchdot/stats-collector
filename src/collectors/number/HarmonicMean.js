import Collector from '../Collector';

/**
 * A collector that captures `hmean`
 */
export default class HarmonicMean extends Collector {
  constructor() {
    super('hmean', 0, ['count', 'sumOfRecipricals']);
  }
  handleGet(state) {
    return state.count / state.sumOfRecipricals;
  }
}
