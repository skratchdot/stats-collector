/**
 * Returns the definition of a collector that captures `standardDeviation_stable`
 * @return {Object} A `standardDeviation_stable` collector object
 */
export default function () {
  return {
    name: 'standardDeviation_stable',
    initialValue: 0,
    requirements: ['variance_stable'],
    onGet: function (prev, state) {
      return Math.sqrt(state.variance_stable);
    }
  };
}
