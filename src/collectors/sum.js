/**
 * Returns the definition of a collector that captures `sum`
 * @return {Object} A `sum` collector object
 */
export default function () {
  return {
    name: 'sum',
    initialValue: 0,
    onUpdate: function (prev, state, val) {
      return prev + val;
    }
  };
}
