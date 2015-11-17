export default function () {
  return {
    name: 'sumOfSquaredDeviations_stable',
    initialValue: 0,
    requirements: ['_values', 'mean'],
    onGet: function (prev, state) {
      const len = state._values.length;
      let sum = 0;
      let current = 0;
      for (let i = 0; i < len; i++) {
        current = state._values[i];
        sum += Math.pow(current - state.mean, 2);
      }
      return sum;
    }
  };
}
