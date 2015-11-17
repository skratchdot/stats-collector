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
