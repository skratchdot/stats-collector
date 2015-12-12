/**
 * Filter even values
 * @param  {Number} value The value to Filter
 * @return {Boolean} true if value is even, false otherwise
 */
export default function (value) {
  return Math.abs(value) % 2 === 0;
}
