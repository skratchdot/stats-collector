/**
 * Returns the definition of a collector that captures a filtered
 * count based off of the passed in filter.
 * @param  {String} name The name of the collector
 * @param  {Function} filter A function that is takes a value and returns true or false
 * @return {Object} A `filtered count` collector object
 */
export default function (name, filter) {
  return {
    name: name,
    initialValue: 0,
    onUpdate: function (prev, state, val) {
      return filter(val) ? prev + 1 : prev;
    }
  };
}
