/*
 *  Modified from the following source:
 *  https://subluminal.wordpress.com/2008/07/31/running-standard-deviations/
 */
export default function () {
  return {
    name: 'standardDeviation_running',
    initialValue: 0,
    requirements: ['variance_running'],
    onGet: function (prev, state) {
      return Math.sqrt(state.variance_running);
    }
  };
}
