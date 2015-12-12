/**
 * Filter integer values
 * @param  {Number} value The value to Filter
 * @return {Boolean} true if value is an integer, false otherwise
 */
export default function (value) {
  return value % 1 === 0;
}
