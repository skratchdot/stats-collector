import leastFactor from '../helpers/leastFactor';

/**
 * Filter prime values
 * @param  {Number} value The value to Filter
 * @return {Boolean} true if value is prime, false otherwise
 */
export default function (value) {
  if (value % 1 || value < 2) {
    return false;
  }
  if (value == leastFactor(value)) {
    return true;
  }
  return false;
}
