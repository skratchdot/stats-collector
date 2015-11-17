export default function () {
  return {
    name: 'min',
    initialValue: Number.MAX_VALUE,
    onUpdate: function (prev, state, val) {
      return Math.min(prev, val);
    }
  };
}
