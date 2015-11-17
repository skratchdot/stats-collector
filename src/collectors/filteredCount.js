export default function (name, filter) {
  return {
    name: name,
    initialValue: 0,
    onUpdate: function (prev, state, val) {
      return filter(val) ? prev + 1 : prev;
    }
  };
}
