export default function () {
  return {
    name: 'count',
    initialValue: 0,
    onUpdate: function (prev) {
      return prev + 1;
    }
  };
}
