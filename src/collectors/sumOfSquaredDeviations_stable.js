/**
 * Returns the definition of a collector that captures `sumOfSquaredDeviations_stable`
 * @return {Object} A `sumOfSquaredDeviations_stable` collector object
 */
export default function () {
  return {
    name: 'sumOfSquaredDeviations_stable',
    initialValue: 0,
    requirements: ['values', 'mean'],
    onGet: function (prev, state) {
      const len = state.values.length;
      let sum = 0;
      let current = 0;
      for (let i = 0; i < len; i++) {
        current = state.values[i];
        sum += Math.pow(current - state.mean, 2);
      }
      return sum;
    }
  };
}
