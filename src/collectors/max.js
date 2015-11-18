/**
 * Returns the definition of a collector that captures `max`
 * @return {Object} A `max` collector object
 */
export default function () {
  return {
    name: 'max',
    initialValue: Number.MIN_VALUE,
    onUpdate: function (prev, state, val) {
      return Math.max(prev, val);
    }
  };
}
