import Collector from '../Collector';

/**
 * A collector that captures `powerSumAvgRunning`
 *   - Modified from the following source:
 *     https://subluminal.wordpress.com/2008/07/31/running-standard-deviations/
 */
export default class PowerSumAvgRunning extends Collector {
  constructor() {
    super('powerSumAvgRunning', 0, ['count']);
  }
  handleProcess(state, prev, val) {
    let newValue = prev;
    newValue += (val * val - prev) / state.count;
    return newValue;
  }
}
