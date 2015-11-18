/**
 * Returns the definition of a collector that captures `count`
 * @return {Object} A `count` collector object
 */
export default function () {
  return {
    name: 'count',
    initialValue: 0,
    onUpdate: function (prev) {
      return prev + 1;
    }
  };
}
