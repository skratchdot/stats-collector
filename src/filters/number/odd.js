/**
 * Filter odd values
 * @param  {Number} value The value to Filter
 * @return {Boolean} true if value is odd, false otherwise
 */
export default function (value) {
  return Math.abs(value) % 2 === 1;
}
