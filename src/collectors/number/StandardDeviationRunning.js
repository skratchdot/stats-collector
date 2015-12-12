import Collector from '../Collector';

/**
 * A collector that captures `standardDeviationRunning`
 *   - Modified from the following source:
 *     https://subluminal.wordpress.com/2008/07/31/running-standard-deviations/
 */
export default class StandardDeviationRunning extends Collector {
  constructor() {
    super('standardDeviationRunning', 0, ['varianceRunning']);
  }
  handleGet(state) {
    return Math.sqrt(state.varianceRunning);
  }
}
