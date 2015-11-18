/**
 * Returns the definition of a collector that captures `values`
 * @return {Object} A `values` collector object
 */
export default function () {
  return {
    name: 'values',
    initialValue: [],
    onUpdate: function (prev, state, val) {
      const result = prev.slice(0);
      result.push(val);
      return result;
    }
  };
}
