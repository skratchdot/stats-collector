/**
 * Returns the definition of a collector that captures `mean`
 * @return {Object} A `mean` collector object
 */
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
