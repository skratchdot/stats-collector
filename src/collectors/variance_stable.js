/**
 * Returns the definition of a collector that captures `variance_stable`
 * @return {Object} A `variance_stable` collector object
 */
export default function () {
  return {
    name: 'variance_stable',
    initialValue: 0,
    requirements: ['values', 'sumOfSquaredDeviations_stable'],
    onGet: function (prev, state) {
      const len = Math.max(1, state.values.length - 1);
      return state.sumOfSquaredDeviations_stable / len;
    }
  };
}
