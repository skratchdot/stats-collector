export default function () {
  return {
    name: 'sum',
    initialValue: 0,
    onUpdate: function (prev, state, val) {
      return prev + val;
    }
  };
}
