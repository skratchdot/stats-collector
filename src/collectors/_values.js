export default function () {
  return {
    name: '_values',
    initialValue: [],
    onUpdate: function (prev, state, val) {
      const result = prev.slice(0);
      result.push(val);
      return result;
    }
  };
}
