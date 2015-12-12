import Collector from '../Collector';

/**
 * A collector that captures `varianceRunning`
 *   - Modified from the following source:
 *     https://subluminal.wordpress.com/2008/07/31/running-standard-deviations/
 */
export default class VarianceRunning extends Collector {
  constructor() {
    super('varianceRunning', 0, ['count', 'mean', 'powerSumAvgRunning']);
  }
  handleGet(state) {
    return (state.powerSumAvgRunning * state.count -
      state.count * state.mean * state.mean) / (
      state.count - 1);
  }
}
