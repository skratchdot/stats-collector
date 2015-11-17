export default function () {
  return {
    name: 'mean',
    initialValue: 0,
    requirements: ['count'],
    onUpdate: function (prev, state, val) {
      return prev + (val - prev) / state.count;
    }
  };
}
