import leastFactor from '../helpers/leastFactor';
export default function (value) {
  if (value % 1 || value < 2) {
    return false;
  }
  if (value == leastFactor(value)) {
    return true;
  }
  return false;
}
