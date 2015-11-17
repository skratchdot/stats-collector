export default function () {
  return {
    name: 'variance_stable',
    initialValue: 0,
    requirements: ['_values', 'sumOfSquaredDeviations_stable'],
    onGet: function (prev, state) {
      const len = Math.max(1, state._values.length - 1);
      return state.sumOfSquaredDeviations_stable / len;
    }
  };
}
